import { NextFunction, Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';
import ResponeCodes from 'utils/constants/ResponeCode';

const getCategories = async (req: Request, res: Response) => {
	try {
		const result = await service.getCategories(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get categories.", ResponeCodes.ERROR).send(res);
	}
};

const getCategory = async (req: Request, res: Response) => {
	try {
		const result = await service.getCategoryById(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get category.", ResponeCodes.ERROR).send(res);
	}
};

const addCategory = async (req: Request, res: Response) => {
	try {
		const result = await service.addCategory(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't add category.", ResponeCodes.ERROR).send(res);
	}
};

const updateCategory = async (req: Request, res: Response) => {
	try {
		const result = await service.updateCategory(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't update category.", ResponeCodes.ERROR).send(res);
	}
};

const deleteCategory = async (req: Request, res: Response) => {
	try {
		const result = await service.deleteCategory(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't delete category.", ResponeCodes.ERROR).send(res);
	}
};

export { getCategories, getCategory, addCategory, updateCategory, deleteCategory };
