import { NextFunction, Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from '../../utils/rest/ApiResponse';
import ResponeCodes from '../../utils/constants/ResponeCode';

const getRooms = async (req: Request, res: Response) => {
	try {
		const result = await service.getRooms(req);
		return new ApiResponse(result).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get rooms.", ResponeCodes.ERROR).send(res);
	}
};

const getRoom = async (req: Request, res: Response) => {
	try {
		const result = await service.getRoomById(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get room.", ResponeCodes.ERROR).send(res);
	}
};

const addRoom = async (req: Request, res: Response) => {
	try {
		const result = await service.addRoom(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't add room.", ResponeCodes.ERROR).send(res);
	}
};

const updateRoom = async (req: Request, res: Response) => {
	try {
		const result = await service.updateRoom(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't update room.", ResponeCodes.ERROR).send(res);
	}
};

const deleteRoom = async (req: Request, res: Response) => {
	try {
		const result = await service.deleteRoom(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't delete room.", ResponeCodes.ERROR).send(res);
	}
};

export { getRooms, getRoom, addRoom, updateRoom, deleteRoom };
