import { Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';
import ResponeCodes from 'utils/constants/ResponeCode';

const getNationalities = async (req: Request, res: Response) => {
	try {
		const result = await service.getNationalities(req);
		return new ApiResponse(result).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get nationalities.", ResponeCodes.ERROR).send(res);
	}
};

const getNationality = async (req: Request, res: Response) => {
	try {
		const result = await service.getNationalityById(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get nationality.", ResponeCodes.ERROR).send(res);
	}
};

const addNationality = async (req: Request, res: Response) => {
	try {
		const result = await service.addNationality(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't add nationality.", ResponeCodes.ERROR).send(res);
	}
};

const updateNationality = async (req: Request, res: Response) => {
	try {
		const result = await service.updateNationality(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't update nationality.", ResponeCodes.ERROR).send(res);
	}
};

const deleteNationality = async (req: Request, res: Response) => {
	try {
		const result = await service.deleteNationality(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't delete nationality.", ResponeCodes.ERROR).send(res);
	}
};

export { getNationalities, getNationality, addNationality, updateNationality, deleteNationality };
