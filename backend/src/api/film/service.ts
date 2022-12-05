import { Request } from 'express';
import { Actor, Category, Director, Film, Nationality } from 'databases/models';
import ResponeCodes from 'utils/constants/ResponeCode';
import FilmPayload from './FilmPayload';
import { Op } from 'sequelize';
import Status from '../../utils/constants/Status';
import paginate from 'utils/helpers/pagination';

const getFilms = async (req: Request) => {
	try {
		const { limit, offset, order, query } = paginate(req);

		const films = await Film.findAndCountAll({
			where: {
				title: {
					[Op.like]: `%${query}%`
				}
			},
			limit,
			offset,
			order: [order]
		});

		return films;
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
		const { nationality, categories, actors, directors } = newFilm;

		if (!newFilm.title) {
			data = null;
			message = 'Title null.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const film = await Film.create(newFilm);

			if (nationality) await film.setNationality(nationality);
			if (categories) await film.setCategories(categories);
			if (actors) await film.setActors(actors);
			if (directors) await film.setDirectors(directors);

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
			const updateFilm: FilmPayload = req.body;
			const { nationality, categories, actors, directors } = updateFilm;

			const film = await Film.findByPk(id);
			data = await film.update(updateFilm);

			if (Nationality) await film.setNationality(nationality);
			if (categories) await film.setCategories(categories);
			if (actors) await film.setActors(actors);
			if (directors) await film.setDirectors(directors);

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
					[Op.eq]: Status.ACTIVE
				}
			},
			include: {
				model: Category,
				through: {
					attributes: []
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
					[Op.eq]: Status.ACTIVE
				}
			},
			include: {
				model: Category,
				through: {
					attributes: []
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

export { getFilms, getFilmById, addFilm, updateFilm, deleteFilm, getOpeningFilm, getUpcomingFilm };
