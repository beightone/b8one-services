import type { Context, OrderStatusChangeContext } from './context'

export type Middleware<Ctx extends Context | OrderStatusChangeContext> = (
  ctx: Ctx,
  next: NextMiddleware
) => Promise<void>

export type NextMiddleware = () => Promise<void>
