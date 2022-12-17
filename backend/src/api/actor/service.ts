import { Request } from 'express';
import { Actor, Nationality } from 'databases/models';
import ResponeCodes from 'utils/constants/ResponeCode';
import ActorPayload from './ActorPayload';
import paginate from 'utils/helpers/pagination';
import { Op } from 'sequelize';
import sequelize from 'databases';

const getActors = async (req: Request) => {
	try {
		const { order, query } = paginate(req);

		const actors = await Actor.findAll({
			where: {
				fullName: {
					[Op.like]: `%${query}%`
				}
			},
			order: [order]
		});

		return actors;
	} catch (error) {
		throw error;
	}
};

const getActorById = async (req: Request) => {
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
			const actor = await Actor.findByPk(id, {
				include: Nationality
			});
			if (!actor) {
				data = null;
				message = 'Not found.';
				status = ResponeCodes.NOT_FOUND;
			} else {
				data = actor;
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

const addActor = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const newActor: ActorPayload = req.body;
		const { nationality } = newActor;

		if (!newActor.fullName) {
			data = null;
			message = 'Name null.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const transaction = await sequelize.transaction(async t => {
				const actor = await Actor.create(newActor, { transaction: t });
				if (nationality) await actor.setNationality(nationality, { transaction: t });

				data = actor;
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

const updateActor = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			data = null;
			message = 'Invalid identifier';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const updateActor: ActorPayload = req.body;
			const { nationality } = updateActor;

			const transaction = await sequelize.transaction(async t => {
				const actor = await Actor.findByPk(id, {
					transaction: t
				});
				await actor.update(updateActor, { transaction: t });
				if (nationality) await actor.setNationality(nationality, { transaction: t });

				data = actor;
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

const deleteActor = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			data = null;
			message = 'Invalid identifier';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			data = await Actor.destroy({
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

export { getActors, getActorById, addActor, updateActor, deleteActor };
