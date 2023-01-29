import type { EventContext, ServiceContext, IOClients } from '@vtex/api'

import type { NextMiddleware } from '../typings'

export async function withAppSettings(
  ctx: ServiceContext | EventContext<IOClients>,
  next: NextMiddleware
) {
  const {
    clients: { apps: appsClient },
  } = ctx

  const appSettings = await appsClient.getAppSettings(
    process.env.VTEX_APP_ID as string
  )

  ctx.vtex.settings = {
    ...ctx.vtex.settings,
    ...appSettings,
  }

  await next()
}
