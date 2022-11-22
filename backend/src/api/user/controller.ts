import { Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';
import ResponeCodes from 'utils/constant/ResponeCode';

// GET: /users/pagination
const getUsers = async (req: Request, res: Response) => {
	try {
		const result = await service.getUsers(req);
		return new ApiResponse(result).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get users.", ResponeCodes.ERROR).send(res);
	}
};

// GET: /users/:id
const getUser = async (req: Request, res: Response) => {
	try {
		const result = await service.getUserById(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get user.", ResponeCodes.ERROR).send(res);
	}
};

// POST: /users
const addUser = async (req: Request, res: Response) => {
	try {
		const result = await service.addUser(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't add user.", ResponeCodes.ERROR).send(res);
	}
};

// PATCH: /users/:id
const updateUser = async (req: Request, res: Response) => {
	try {
		const result = await service.updateUser(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't update user.", ResponeCodes.ERROR).send(res);
	}
};

// PATCH: /users/:id/changePassword
const changePassword = async (req: Request, res: Response) => {
	try {
		const result = await service.changePassword(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't change password.", ResponeCodes.ERROR).send(res);
	}
};

// DELETE: /users/:id
const deleteUser = async (req: Request, res: Response) => {
	try {
		const result = await service.deleteUser(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't delete user.", ResponeCodes.ERROR).send(res);
	}
};

export { getUsers, getUser, addUser, updateUser, deleteUser, changePassword };
