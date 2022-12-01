import { Request } from 'express';
import { Actor, Category, Director, Film, Nationality } from 'databases/models';
import ResponeCodes from 'utils/constant/ResponeCode';
import FilmPayload from './FilmPayload';
import { Op } from 'sequelize';
import Status from '../../utils/constant/Status';

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
		const { Nationality, Categories, Actors, Directors } = newFilm;

		if (!newFilm.title) {
			data = null;
			message = 'Title null.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const film = await Film.create(newFilm);

			if (Nationality) await film.setNationality(Nationality);
			if (Categories) await film.setCategories(Categories);
			if (Actors) await film.setActors(Actors);
			if (Directors) await film.setDirectors(Directors);

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
			const { Nationality, Categories, Actors, Directors } = updateFilm;

			const film = await Film.findByPk(id);
			data = await film.update(updateFilm);

			if (Nationality) await film.setNationality(Nationality);
			if (Categories) await film.setCategories(Categories);
			if (Actors) await film.setActors(Actors);
			if (Directors) await film.setDirectors(Directors);

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
