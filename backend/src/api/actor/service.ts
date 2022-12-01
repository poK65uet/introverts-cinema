import { Request } from 'express';
import { Actor, Nationality } from 'databases/models';
import ResponeCodes from 'utils/constant/ResponeCode';
import ActorPayload from './ActorPayload';

const getActors = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		data = await Actor.findAll();
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
			const actor = await Actor.create(newActor);
			if (Nationality) await actor.setNationality(nationality);

			data = actor;
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

			const actor = await Actor.findByPk(id);
			data = await actor.update(updateActor);
			if (Nationality) await actor.setNationality(nationality);

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
