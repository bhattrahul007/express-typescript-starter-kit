import { Router } from 'express';
import { TPostRequest, TRequest, TResponse } from './../../common';

class CreateUserAccountRequest implements TPostRequest {
    constructor(router: Router) {
        router.use('/', this.postRequestHandler);
    }

    postRequestHandler(req: TRequest, res: TResponse): TResponse {
        return res.status(200).send({
            msg: 'success',
        });
    }
}

export default CreateUserAccountRequest;
