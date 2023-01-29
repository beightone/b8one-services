import type {
  EventContext,
  IOClients,
  RecorderState,
  ServiceContext,
} from '@vtex/api'

export type Context<
  Clients extends IOClients = IOClients,
  State extends RecorderState = RecorderState
> = ServiceContext<Clients, State>

export type OrderStatusChangeContext<
  Clients extends IOClients = IOClients,
  State extends RecorderState = RecorderState
> = EventContext<Clients, State> & {
  body: {
    domain: string
    orderId: string
    currentState: string
    lastState: string
    currentChangeDate: string
    lastChangeDate: string
  }
}
