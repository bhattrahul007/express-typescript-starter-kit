import { Request, Response, NextFunction } from 'express';
import { MongooseError } from 'mongoose';
import { ApiError } from '../common';
import httpStatus from 'http-status';

export function errorConvertor(err: any, req: Request, res: Response, next: NextFunction) {
  let error = err;
  if (!(error instanceof ApiError)) {
    const code =
      error.code || error instanceof MongooseError
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const status =
      error.status || error instanceof MongooseError ? httpStatus['400_NAME'] : httpStatus['500_NAME'];
    const message =
      error.message || error instanceof MongooseError ? httpStatus['400_MESSAGE'] : httpStatus['500_MESSAGE'];

    error = new ApiError({
      code,
      status,
      message,
      operational: false,
      stack: err.stack,
    });
  }
  error.path = req.url;
  next(error);
}
