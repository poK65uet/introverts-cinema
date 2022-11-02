import { Request, Response } from 'express';
import { ApiResponse } from 'utils/rest/ApiResponse';
import * as service from './service';

const register = async (req: Request, res: Response) => {
    const result = await service.register(req.body);
    return new ApiResponse(result.data, result.message, result.status).send(res);
}

export {
    register
}