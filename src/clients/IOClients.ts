import { IOClients as VTEXIOCLients } from '@vtex/api'

export class IOClients extends VTEXIOCLients {
  protected resetClient(clientKey: string) {
    /* eslint-disable dot-notation */
    const manipulatedClientsSet = new Map(Object.entries(this['clients']))

    manipulatedClientsSet.delete(clientKey)
    this['clients'] = manipulatedClientsSet
  }
}
