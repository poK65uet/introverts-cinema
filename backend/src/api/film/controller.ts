import { Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';
import ResponeCodes from 'utils/constants/ResponeCode';

// GET: /films/pagination
const getFilms = async (req: Request, res: Response) => {
	try {
		const result = await service.getFilms(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get films.", ResponeCodes.ERROR).send(res);
	}
};

// GET: /films/:id
const getFilm = async (req: Request, res: Response) => {
	try {
		const result = await service.getFilmById(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get film.", ResponeCodes.ERROR).send(res);
	}
};

// POST: /films
const addFilm = async (req: Request, res: Response) => {
	try {
		const result = await service.addFilm(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't add film.", ResponeCodes.ERROR).send(res);
	}
};

// PATCH: /films/:id
const updateFilm = async (req: Request, res: Response) => {
	try {
		const result = await service.updateFilm(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't update film.", ResponeCodes.ERROR).send(res);
	}
};

// DELETE: /films/:id
const deleteFilm = async (req: Request, res: Response) => {
	try {
		const result = await service.deleteFilm(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't delete film.", ResponeCodes.ERROR).send(res);
	}
};

// GET: /films/opening
const getOpeningFilm = async (req: Request, res: Response) => {
	try {
		const result = await service.getOpeningFilm();
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get opening film.", ResponeCodes.ERROR).send(res);
	}
};

// GET: /films/opening
const getUpcomingFilm = async (req: Request, res: Response) => {
	try {
		const result = await service.getUpcomingFilm();
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get upcoming film.", ResponeCodes.ERROR).send(res);
	}
};

export { getFilms, getFilm, addFilm, updateFilm, deleteFilm, getOpeningFilm, getUpcomingFilm };
