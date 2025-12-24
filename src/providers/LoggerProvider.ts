import { ILogger } from '../lib/ILogger';
import { WinstonLogger } from '../lib/winstonLogger';

class LoggerProvider {
  private static instance: ILogger;

  static getLogger(): ILogger {
    if (!LoggerProvider.instance) {
      LoggerProvider.instance = new WinstonLogger();
    }
    return LoggerProvider.instance;
  }
}

export { LoggerProvider };
