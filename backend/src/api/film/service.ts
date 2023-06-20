import { Request } from 'express';
import { Actor, Category, Director, Film, Nationality } from '../../databases/models';
import ResponeCodes from '../../utils/constants/ResponeCode';
import FilmPayload from './FilmPayload';
import { Op } from 'sequelize';
import Status from '../../utils/constants/Status';
import paginate from '../../utils/helpers/pagination';
import sequelize from '../../databases';

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

const getActiveFilms = async (req: Request) => {
	try {
		const films = await Film.findAll({
			where: {
				status: Status.ACTIVE
			},
			order: [['title', 'ASC']]
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
			const transaction = await sequelize.transaction(async t => {
				const film = await Film.create(newFilm, {
					transaction: t
				});
				if (nationality) await film.setNationality(nationality, { transaction: t });
				if (categories) await film.setCategories(categories, { transaction: t });
				if (actors) await film.setActors(actors, { transaction: t });
				if (directors) await film.setDirectors(directors, { transaction: t });

				data = film;
				message = 'Add successfully!';
				status = ResponeCodes.CREATED;
			});
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

			const transaction = await sequelize.transaction(async t => {
				const film = await Film.findByPk(id, { transaction: t });
				await film.update(updateFilm, { transaction: t })
				if (nationality) await film.setNationality(nationality, { transaction: t });
				if (categories) await film.setCategories(categories, { transaction: t });
				if (actors) await film.setActors(actors, { transaction: t });
				if (directors) await film.setDirectors(directors, { transaction: t });

				data = film;
				message = 'Updated successfully!';
				status = ResponeCodes.OK;
			});
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
			},
			order: [['openingDay', 'DESC']]
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
			},
			order: [['openingDay', 'ASC']]
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

export { getFilms, getFilmById, addFilm, updateFilm, deleteFilm, getOpeningFilm, getUpcomingFilm, getActiveFilms };
