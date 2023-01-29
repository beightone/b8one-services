import type { Logger as VTEXLogger } from '@vtex/api'
import { LogLevel } from '@vtex/api'
import chalk from 'chalk'

export class Logger {
  private readonly logger: VTEXLogger
  private readonly logInProd: boolean

  constructor(logger: VTEXLogger, logInProd = true) {
    this.logger = logger
    this.logInProd = logInProd
  }

  public info = (message: unknown): void => this.log(message, LogLevel.Info)

  public error = (error: unknown): void => this.log(error, LogLevel.Error)

  private log = (message: unknown, type: LogLevel): void => {
    const coloredMessage =
      type === LogLevel.Info ? chalk.cyan(message) : chalk.red(message)

    // eslint-disable-next-line no-console
    console.log(coloredMessage)

    if (this.logInProd) this.logger.log(message, type)
  }
}
