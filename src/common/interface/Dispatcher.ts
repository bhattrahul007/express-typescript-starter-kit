import { Router } from 'express';

export type Dispatcher = {
    getPath(): string;
    getRouter(): Router;
};
