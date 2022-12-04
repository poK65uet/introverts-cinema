import { Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';
import ResponeCodes from 'utils/constants/ResponeCode';

const getActors = async (req: Request, res: Response) => {
	try {
		const result = await service.getActors(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get actors.", ResponeCodes.ERROR).send(res);
	}
};

const getActor = async (req: Request, res: Response) => {
	try {
		const result = await service.getActorById(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get actor.", ResponeCodes.ERROR).send(res);
	}
};

const addActor = async (req: Request, res: Response) => {
	try {
		const result = await service.addActor(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't add actor.", ResponeCodes.ERROR).send(res);
	}
};

const updateActor = async (req: Request, res: Response) => {
	try {
		const result = await service.updateActor(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't update actor.", ResponeCodes.ERROR).send(res);
	}
};

const deleteActor = async (req: Request, res: Response) => {
	try {
		const result = await service.deleteActor(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't delete actor.", ResponeCodes.ERROR).send(res);
	}
};

export { getActors, getActor, addActor, updateActor, deleteActor };
