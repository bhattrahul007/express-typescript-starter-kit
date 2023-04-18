import winston, { createLogger, format, transports } from 'winston';
const { splat, timestamp, label, combine, colorize, printf } = format;

type LoggerOptions = {
  loggerLabel?: string;
  loggerLevel?: string;
  consoleLog?: boolean;
};

class Logger {
  public _logger: winston.Logger;

  constructor(opt?: LoggerOptions) {
    this._logger = createLogger({
      level: opt?.loggerLevel || 'info',
      format: combine(
        timestamp(),
        splat(),
        colorize(),
        label({ label: opt?.loggerLabel }),
        printf((info) => `${info.timestamp} ${info.label} ${info.level}: ${info.message}`)
      ),
      transports: Logger.getTransports(opt),
    });
  }

  static getTransports(_opts?: LoggerOptions) {
    const _t = [];
    if (_opts?.consoleLog) {
      _t.push(new transports.Console());
    }
    return _t;
  }
}

export default Logger;
