import { Request } from 'express';
import { Actor, Category, Director, Film, Nationality } from 'databases/models';
import ResponeCodes from 'utils/constant/ResponeCode';
import FilmPayload from './FilmPayload';
import { FilmModel } from 'databases/models/IModel';
import { Op } from 'sequelize';

const getFilms = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		data = await Film.findAll();
		message = 'Get all successfully!';
		status = ResponeCodes.OK;

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const getFilmById = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			data = null;
			message = 'Invalid identifier.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const film = await Film.findByPk(id, {
				include: [
					{
						model: Nationality
					},
					{
						model: Category,
						through: {
							attributes: []
						}
					},
					{
						model: Actor,
						through: {
							attributes: []
						}
					},
					{
						model: Director,
						through: {
							attributes: []
						}
					}
				]
			});
			if (!film) {
				data = null;
				message = 'Not found.';
				status = ResponeCodes.NOT_FOUND;
			} else {
				data = film;
				message = 'Get film successfully!';
				status = ResponeCodes.OK;
			}
		}

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const addFilm = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const newFilm: FilmPayload = req.body;

		if (!newFilm.title) {
			data = null;
			message = 'Title null.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const film = await Film.create(newFilm);
			data = film;
			message = 'Add successfully!';
			status = ResponeCodes.CREATED;
		}

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const updateFilm = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			data = null;
			message = 'Invalid identifier.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const updateFilm = req.body;
			data = await Film.update(updateFilm, {
				where: {
					id
				}
			});
			message = 'Updated successfully!';
			status = ResponeCodes.OK;
		}

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const deleteFilm = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			data = null;
			message = 'Invalid identifier.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			data = await Film.destroy({
				where: {
					id
				}
			});
			message = 'Deleted successfully!';
			status = ResponeCodes.OK;
		}

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const getFilmActors = async (film: FilmModel) => {
	try {
		let data;
		let message: string;
		let status: number;
		data = await film.getActors();
		message = 'Get actors successfully!';
		status = ResponeCodes.OK;
		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const addFilmActors = async (film: FilmModel, actors: number[]) => {
	try {
		let data;
		let message: string;
		let status: number;
		data = await film.addActors(actors);
		message = 'Add actors successfully!';
		status = ResponeCodes.OK;
		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const deleteFilmActors = async (film: FilmModel, actors: number[]) => {
	try {
		let data;
		let message: string;
		let status: number;
		data = await film.removeActors(actors);
		message = 'Delete actors successfully!';
		status = ResponeCodes.OK;
		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const getFilmDirectors = async (film: FilmModel) => {
	try {
		let data;
		let message: string;
		let status: number;
		data = await film.getDirectors();
		message = 'Get directors successfully!';
		status = ResponeCodes.OK;
		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const addFilmDirectors = async (film: FilmModel, directors: number[]) => {
	try {
		let data;
		let message: string;
		let status: number;
		data = await film.addDirectors(directors);
		message = 'Add directors successfully!';
		status = ResponeCodes.OK;
		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const deleteFilmDirectors = async (film: FilmModel, directors: number[]) => {
	try {
		let data;
		let message: string;
		let status: number;
		data = await film.removeDirectors(directors);
		message = 'Delete directors successfully!';
		status = ResponeCodes.OK;
		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const getFilmCategories = async (film: FilmModel) => {
	try {
		let data;
		let message: string;
		let status: number;
		data = await film.getCategories();
		message = 'Get categories successfully!';
		status = ResponeCodes.OK;
		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const addFilmCategories = async (film: FilmModel, categories: number[]) => {
	try {
		console.log(categories);
		let data;
		let message: string;
		let status: number;
		data = await film.addCategories(categories);
		message = 'Add categories successfully!';
		status = ResponeCodes.OK;
		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const deleteFilmCategories = async (film: FilmModel, categories: number[]) => {
	try {
		let data;
		let message: string;
		let status: number;
		data = await film.removeCategories(categories);
		message = 'Delete categories successfully!';
		status = ResponeCodes.OK;
		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const getOpeningFilm = async () => {
	try {
		let data;
		let message: string;
		let status: number;

		data = await Film.findAll({
			where: {
				openingDay: {
					[Op.lte]: new Date(Date.now())
				},
				status: {
					[Op.eq]: 'active'
				}
			}
		});
		message = 'Get opening film successfully!';
		status = ResponeCodes.OK;

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const getUpcomingFilm = async () => {
	try {
		let data;
		let message: string;
		let status: number;

		data = await Film.findAll({
			where: {
				openingDay: {
					[Op.gt]: new Date(Date.now())
				},
				status: {
					[Op.eq]: 'active'
				}
			}
		});
		message = 'Get upcoming film successfully!';
		status = ResponeCodes.OK;

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

export {
	getFilms,
	getFilmById,
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
