import CreateUserAccountRequest from './controller/CreateUserAccountRequest';
import { TDispatcher } from './../common';
import { Router } from 'express';

class AccountDispatcher implements TDispatcher {
    path: string;
    router: Router;

    constructor() {
        this.path = 'accounts';
        this.router = Router();
        this.__init__();
    }

    private __init__() {
        this.router.use('', new CreateUserAccountRequest(this.router).postRequestHandler);
    }

    getPath(): string {
        return this.path;
    }

    getRouter(): Router {
        return this.router;
    }
}

export default AccountDispatcher;
