import { Router, Request, Response } from 'express';

export interface RequestDispatcher {
    getPath(): string;
    getRouter(): Router;
}

export interface PostRequest {
    postRequestHandler(
        req: Request<unknown, unknown, unknown>,
        res: Response<unknown>
    ): Response<unknown>;
}

export interface GetRequest {
    getRequestHandler(
        req: Request<unknown, unknown, unknown>,
        res: Response<unknown>
    ): Response<unknown>;
}

export interface PutRequest {
    putRequestHandler(
        req: Request<unknown, unknown, unknown>,
        res: Response<unknown>
    ): Response<unknown>;
}

export interface DeleteRequest {
    deleteRequestHandler(
        req: Request<unknown, unknown, unknown>,
        res: Response<unknown>
    ): Response<unknown>;
}
