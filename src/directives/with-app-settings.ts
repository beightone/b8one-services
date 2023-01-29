import { defaultFieldResolver, GraphQLError } from 'graphql'
import { SchemaDirectiveVisitor } from 'graphql-tools'
import type { GraphQLField } from 'graphql'
import type { ServiceContext } from '@vtex/api'

export class WithAppSettings<
  Context extends ServiceContext
> extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = async (
      root: any,
      args: any,
      context: Context,
      info: any
    ) => {
      const {
        clients: { apps: appsClient },
      } = context

      try {
        const appSettings = await appsClient.getAppSettings(
          process.env.VTEX_APP_ID as string
        )

        context.vtex.settings = { ...context.vtex.settings, ...appSettings }
      } catch (error) {
        throw new GraphQLError('Could not get app settings')
      }

      return resolve(root, args, context, info)
    }
  }
}
