import { NextFunction, Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';
import ResponeCodes from 'utils/constant/ResponeCode';

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

// GET: /films
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
const addFilm = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await service.addFilm(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't add film.", ResponeCodes.ERROR).send(res);
	}
};

// PATCH: /films
const updateFilm = async (req: Request, res: Response) => {
	try {
		const result = await service.updateFilm(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't update film.", ResponeCodes.ERROR).send(res);
	}
};

// DELETE: /films
const deleteFilm = async (req: Request, res: Response) => {
	try {
		const result = await service.deleteFilm(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't delete film.", ResponeCodes.ERROR).send(res);
	}
};

// GET: /films/:id/actors
const getFilmActors = async (req: Request, res: Response) => {
	try {
		const filmResult = await service.getFilmById(req);
		if (filmResult.data) {
			const actorsResult = await service.getFilmActors(filmResult.data);
			return new ApiResponse(actorsResult.data, actorsResult.message, actorsResult.status).send(res);
		} else {
			return new ApiResponse(filmResult.data, filmResult.message, filmResult.status).send(res);
		}
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get actors.", ResponeCodes.ERROR).send(res);
	}
};

// POST: /films/:id/actors
const addFilmActors = async (req: Request, res: Response) => {
	try {
		const filmResult = await service.getFilmById(req);
		if (filmResult.data) {
			const actorsResult = await service.addFilmActors(filmResult.data, req.body.actors);
			return new ApiResponse(actorsResult.data, actorsResult.message, actorsResult.status).send(res);
		} else {
			return new ApiResponse(filmResult.data, filmResult.message, filmResult.status).send(res);
		}
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't add actors.", ResponeCodes.ERROR).send(res);
	}
};

// DELETE: /films/:id/actors
const deleteFilmActors = async (req: Request, res: Response) => {
	try {
		const filmResult = await service.getFilmById(req);
		if (filmResult.data) {
			const actorsResult = await service.deleteFilmActors(filmResult.data, req.body.actors);
			return new ApiResponse(actorsResult.data, actorsResult.message, actorsResult.status).send(res);
		} else {
			return new ApiResponse(filmResult.data, filmResult.message, filmResult.status).send(res);
		}
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't delete actors.", ResponeCodes.ERROR).send(res);
	}
};

// GET: /films/:id/directors
const getFilmDirectors = async (req: Request, res: Response) => {
	try {
		const filmResult = await service.getFilmById(req);
		if (filmResult.data) {
			const directorsResult = await service.getFilmDirectors(filmResult.data);
			return new ApiResponse(directorsResult.data, directorsResult.message, directorsResult.status).send(res);
		} else {
			return new ApiResponse(filmResult.data, filmResult.message, filmResult.status).send(res);
		}
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get directors.", ResponeCodes.ERROR).send(res);
	}
};

// POST: /films/:id/directors
const addFilmDirectors = async (req: Request, res: Response) => {
	try {
		const filmResult = await service.getFilmById(req);
		if (filmResult.data) {
			const directorsResult = await service.addFilmDirectors(filmResult.data, req.body.directors);
			return new ApiResponse(directorsResult.data, directorsResult.message, directorsResult.status).send(res);
		} else {
			return new ApiResponse(filmResult.data, filmResult.message, filmResult.status).send(res);
		}
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't add directors.", ResponeCodes.ERROR).send(res);
	}
};

// DELETE: /films/:id/directors
const deleteFilmDirectors = async (req: Request, res: Response) => {
	try {
		const filmResult = await service.getFilmById(req);
		if (filmResult.data) {
			const directorsResult = await service.deleteFilmDirectors(filmResult.data, req.body.directors);
			return new ApiResponse(directorsResult.data, directorsResult.message, directorsResult.status).send(res);
		} else {
			return new ApiResponse(filmResult.data, filmResult.message, filmResult.status).send(res);
		}
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't delete directors.", ResponeCodes.ERROR).send(res);
	}
};

// GET: /films/:id/categories
const getFilmCategories = async (req: Request, res: Response) => {
	try {
		const filmResult = await service.getFilmById(req);
		if (filmResult.data) {
			const categoriesResult = await service.getFilmCategories(filmResult.data);
			return new ApiResponse(categoriesResult.data, categoriesResult.message, categoriesResult.status).send(res);
		} else {
			return new ApiResponse(filmResult.data, filmResult.message, filmResult.status).send(res);
		}
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get categories.", ResponeCodes.ERROR).send(res);
	}
};

// POST: /films/:id/categories
const addFilmCategories = async (req: Request, res: Response) => {
	try {
		const filmResult = await service.getFilmById(req);
		if (filmResult.data) {
			const categoriesResult = await service.addFilmCategories(filmResult.data, req.body.categories);
			return new ApiResponse(categoriesResult.data, categoriesResult.message, categoriesResult.status).send(res);
		} else {
			return new ApiResponse(filmResult.data, filmResult.message, filmResult.status).send(res);
		}
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't add categories.", ResponeCodes.ERROR).send(res);
	}
};

// DELETE: /films/:id/directors
const deleteFilmCategories = async (req: Request, res: Response) => {
	try {
		const filmResult = await service.getFilmById(req);
		if (filmResult.data) {
			const categoriesResult = await service.deleteFilmCategories(filmResult.data, req.body.categories);
			return new ApiResponse(categoriesResult.data, categoriesResult.message, categoriesResult.status).send(res);
		} else {
			return new ApiResponse(filmResult.data, filmResult.message, filmResult.status).send(res);
		}
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't delete categories.", ResponeCodes.ERROR).send(res);
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

export {
	getFilms,
	getFilm,
	addFilm,
	updateFilm,
	deleteFilm,
	getFilmActors,
	addFilmActors,
	deleteFilmActors,
	getFilmDirectors,
	addFilmDirectors,
	deleteFilmDirectors,
	getFilmCategories,
	addFilmCategories,
	deleteFilmCategories,
	getOpeningFilm,
	getUpcomingFilm
};
