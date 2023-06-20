import { NextFunction, Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from '../../utils/rest/ApiResponse';
import ResponeCodes from '../../utils/constants/ResponeCode';

const getBanners = async (req: Request, res: Response) => {
	try {
		const result = await service.getBanners(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get banners.", ResponeCodes.ERROR).send(res);
	}
};

const getBanner = async (req: Request, res: Response) => {
	try {
		const result = await service.getBannerById(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get banner.", ResponeCodes.ERROR).send(res);
	}
};

const addBanner = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await service.addBanner(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't add banner.", ResponeCodes.ERROR).send(res);
	}
};

const updateBanner = async (req: Request, res: Response) => {
	try {
		const result = await service.updateBanner(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't update banner.", ResponeCodes.ERROR).send(res);
	}
};

const deleteBanner = async (req: Request, res: Response) => {
	try {
		const result = await service.deleteBanner(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't delete banner.", ResponeCodes.ERROR).send(res);
	}
};

export { getBanners, getBanner, addBanner, updateBanner, deleteBanner };
