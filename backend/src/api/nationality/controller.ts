import { Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';

const getNationalities = async (req: Request, res: Response) => {
	const result = await service.getNationalities(req);
	const { data, message, status } = result;
	return new ApiResponse(data, message, status).send(res);
};

const getNationality = async (req: Request, res: Response) => {
	const result = await service.getNationalityById(req);
	const { data, message, status } = result;
	return new ApiResponse(data, message, status).send(res);
};

const addNationality = async (req: Request, res: Response) => {
    const result = await service.addNationality(req);
	const { data, message, status } = result;
	return new ApiResponse(data, message, status).send(res);
};

const updateNationality = async (req: Request, res: Response) => {
    const result = await service.updateNationality(req);
	const { data, message, status } = result;
	return new ApiResponse(data, message, status).send(res);
};

const deleteNationality = async (req: Request, res: Response) => {
    const result = await service.deleteNationality(req);
	const { data, message, status } = result;
	return new ApiResponse(data, message, status).send(res);
};

export { getNationalities, getNationality, addNationality, updateNationality, deleteNationality };
