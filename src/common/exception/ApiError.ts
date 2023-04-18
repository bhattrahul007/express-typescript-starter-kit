import httpStatus from 'http-status';

export interface ApiErrorOptions {
  code?: number;
  status?: string;
  message?: string;
  operational?: boolean;
  stack?: any;
}

class ApiError extends Error {
  code: number;
  status: string;
  message: string;
  operational: boolean;
  path: string = undefined as any;

  constructor(opt?: ApiErrorOptions) {
    super();
    this.code = opt?.code || httpStatus.INTERNAL_SERVER_ERROR;
    this.status = opt?.status || httpStatus['500_NAME'];
    this.message = opt?.message || httpStatus['500_MESSAGE'];
    this.operational = opt?.operational || false;
    if (opt?.stack) {
      this.stack = opt.stack;
    }
  }

  toJson(enableStack: boolean = true) {
    return {
      code: this.code,
      status: this.status,
      message: this.message,
      ...(enableStack && { stack: this.stack }),
    };
  }
}

export default ApiError;
