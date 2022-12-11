import { Request } from 'express';
import { Showtime, Room, Film } from 'databases/models';
import ResponeCodes from 'utils/constants/ResponeCode';
import ShowtimePayload from './ShowtimePayload';
import { ShowtimeModel } from 'databases/models/Showtime';
import { Op } from 'sequelize';
import { getPrice } from 'api/price/service';
import paginate from 'utils/helpers/pagination';
import sequelize from 'databases';
import { addTimeByMinute } from 'utils/helpers/timeService';

const NEXT_SHOWTIME = 30; // minutes;

const getShowtimes = async (req: Request) => {
	try {
		const { limit, offset, order, query } = paginate(req);

		const showtimes = await Showtime.findAndCountAll({
			limit,
			offset,
			order: [order]
		});

		return showtimes;
	} catch (error) {
		throw error;
	}
};

const getAllShowtimes = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const showtime = await Showtime.findAll();

		data = showtime;
		message = 'Get successfully!';
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

const getShowtimesByFilm = async (filmId: number) => {
	try {
		let data;
		let message: string;
		let status: number;
		const now = new Date(Date.now());

		const showtime = await Showtime.findAll({
			where: {
				startTime: {
					[Op.gt]: now
				}
			},
			include: [
				{
					model: Film,
					attributes: [],
					where: {
						id: filmId
					}
				}
			],
			order: [['start_time', 'ASC']]
		});

		data = groupShowtimeByDate(showtime);
		message = 'Get successfully!';
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

const getShowtimeById = async (req: Request) => {
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
			const showtime = await Showtime.findByPk(id, {
				include: [
					{
						model: Film
					},
					{
						model: Room
					}
				]
			});
			if (!showtime) {
				data = null;
				message = 'Not found.';
				status = ResponeCodes.NOT_FOUND;
			} else {
				const price = await getPrice(showtime);
				data = {
					showtime,
					price
				};
				message = 'Get successfully!';
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

const addShowtime = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const newShowtime: ShowtimePayload = req.body;
		const newSt = {
			startTime: new Date(newShowtime.startTime),
			film: await Film.findByPk(newShowtime.film),
			roomId: newShowtime.room
		};
		const now = new Date(Date.now());

		if (!newSt.startTime || newSt.startTime < now || !newSt.film || !newSt.roomId) {
			data = null;
			message = 'Null.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const checkShowtimes = await Showtime.findAll({
				where: {
					startTime: {
						[Op.gt]: now
					}
				},
				include: [
					{
						model: Room,
						attributes: [],
						where: {
							id: newSt.roomId
						}
					},
					{
						model: Film,
						attributes: ['duration']
					}
				]
			});

			const checkResult = checkShowtimes.filter(checkSt => {
				if (checkSt.startTime <= newSt.startTime) {
					const checkTime = addTimeByMinute(checkSt.startTime, checkSt.Film.duration + NEXT_SHOWTIME);
					return checkTime > newSt.startTime;
				} else {
					const checkTime = addTimeByMinute(newSt.startTime, newSt.film.duration + NEXT_SHOWTIME);
					return checkTime > checkSt.startTime;
				}
			});

			if (checkResult.length === 0) {
				const transaction = await sequelize.transaction(async t => {
					const showtime = await Showtime.create(newShowtime, { transaction: t });
					await showtime.setFilm(newSt.film, { transaction: t });
					await showtime.setRoom(newSt.roomId, { transaction: t });

					data = showtime;
					message = 'Add successfully!';
					status = ResponeCodes.CREATED;
				});
			} else {
				data = null;
				message = 'Conflict showtime';
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

const updateShowtime = async (req: Request) => {
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
			const updateShowtime: ShowtimePayload = req.body;

			data = await Showtime.update(updateShowtime, {
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

const deleteShowtime = async (req: Request) => {
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
			data = await Showtime.destroy({
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

const isInOneDay = (d1: Date, d2: Date) => {
	return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
};

const groupShowtimeByDate = (showtimes: ShowtimeModel[]) => {
	var newShowtimes = [];
	for (let i = 0; i < showtimes.length; i++) {
		const originDate = showtimes[i].startTime;
		var listShowtime: ShowtimeModel[] = [];
		listShowtime.push(showtimes[i]);
		while (i + 1 < showtimes.length && isInOneDay(showtimes[i].startTime, showtimes[i + 1].startTime)) {
			i++;
			listShowtime.push(showtimes[i]);
		}

		const group = {
			date: originDate,
			showtimes: listShowtime
		};
		newShowtimes.push(group);
	}
	return newShowtimes;
};

export {
	getShowtimes,
	getShowtimeById,
	getShowtimesByFilm,
	getAllShowtimes,
	addShowtime,
	updateShowtime,
	deleteShowtime
};
