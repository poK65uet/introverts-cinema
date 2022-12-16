import { Request } from 'express';
import { Room } from 'databases/models';
import ResponeCodes from 'utils/constants/ResponeCode';
import RoomPayload from './RoomPayload';
import paginate from 'utils/helpers/pagination';
import { Op } from 'sequelize';

const getRooms = async (req: Request) => {
	try {
		const { order, query } = paginate(req);
		const rooms = await Room.findAndCountAll({
			where: {
				[Op.or]: [
					{
						name: {
							[Op.like]: `%${query}%`
						}
					},
					{
						visionType: {
							[Op.like]: `%${query}%`
						}
					}
				]
			},
			order: [order]
		});

		return rooms;
	} catch (error) {
		throw error;
	}
};

const getRoomById = async (req: Request) => {
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
			const room = await Room.findByPk(id);
			if (!room) {
				data = null;
				message = 'Not found.';
				status = ResponeCodes.NOT_FOUND;
			} else {
				data = room;
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

const addRoom = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const newRoom: RoomPayload = req.body;

		if (!newRoom.name) {
			data = null;
			message = 'Name null.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const room = await Room.create(newRoom);

			data = room;
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

const updateRoom = async (req: Request) => {
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
			const updateRoom: RoomPayload = req.body;

			data = await Room.update(updateRoom, {
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

const deleteRoom = async (req: Request) => {
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
			data = await Room.destroy({
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

export { getRooms, getRoomById, addRoom, updateRoom, deleteRoom };
