import { NextFunction, Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';
import ResponeCodes from 'utils/constant/ResponeCode';

const getDirectors = async (req: Request, res: Response) => {
	try {
		const result = await service.getDirectors(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get directors.", ResponeCodes.ERROR).send(res);
	}
};

const getDirector = async (req: Request, res: Response) => {
	try {
		const result = await service.getDirectorById(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get director.", ResponeCodes.ERROR).send(res);
	}
};

const addDirector = async (req: Request, res: Response) => {
	try {
		const result = await service.addDirector(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't add director.", ResponeCodes.ERROR).send(res);
	}
};

const updateDirector = async (req: Request, res: Response) => {
	try {
		const result = await service.updateDirector(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't update director.", ResponeCodes.ERROR).send(res);
	}
};

const deleteDirector = async (req: Request, res: Response) => {
	try {
		const result = await service.deleteDirector(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't delete director.", ResponeCodes.ERROR).send(res);
	}
};

export { getDirectors, getDirector, addDirector, updateDirector, deleteDirector };
