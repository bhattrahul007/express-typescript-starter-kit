import { Request, Response, Router } from 'express';

export type TDispatcher = {
    getPath(): string;
    getRouter(): Router;
};

export type TRequest = Request<unknown, unknown, unknown>;

export type TResponse = Response<unknown>;

export type TGetRequest = {
    getRequestHandler(req: TRequest, res: TResponse): TResponse;
};

export type TPostRequest = {
    postRequestHandler(req: TRequest, res: TResponse): TResponse;
};

export type TPutRequest = {
    putRequestHandler(req: TRequest, res: TResponse): TResponse;
};

export type TDeleteRequest = {
    deleteRequestHandler(req: TRequest, res: TResponse): TResponse;
};
