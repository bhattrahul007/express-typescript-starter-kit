import { Request, Response, NextFunction } from 'express';
import ApiError from '../common/exception/ApiError';
import Logger from '../common/logger';
import httpStatus from 'http-status';
import config from 'config';

const env = config.get('app.server.env');

const logger = new Logger({ loggerLabel: 'ErrorHandler: ', loggerLevel: 'error', consoleLog: true })._logger;

export function errorHandler(err: ApiError, req: Request, res: Response, next: NextFunction) {
  let { code, status, message } = err;
  if (env === 'production' && !err.operational) {
    code = httpStatus.INTERNAL_SERVER_ERROR;
    status = httpStatus['500_NAME'];
    message = httpStatus['500_MESSAGE'];
  }
  res.locals.message = message;

  const response = {
    code,
    status,
    message,
    path: err.path,
    ...(env !== 'production' && { stack: err.stack }),
  };

  if (env !== 'production') {
    logger.error(err);
  }
  res.send(response.code).send(response);
}
