import { Request, Response } from 'express';
import { ApiResponse } from 'utils/rest/ApiResponse';
import * as service from './service';

const login = async (req: Request, res: Response) => {
    const result = await service.login(req.body);
    return new ApiResponse(result.data, result.message, result.status).send(res);
}

export {
    login
}