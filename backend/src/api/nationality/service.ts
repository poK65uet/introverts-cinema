import { Request } from 'express';
import { Nationality } from 'databases/models';
import ResponeCodes from 'utils/constants/ResponeCode';
import NationalityPayload from './NationalityPayload';
import paginate from 'utils/helpers/pagination';
import { Op } from 'sequelize';

const getNationalities = async (req: Request) => {
	try {
		const { order, query } = paginate(req);

		const nationalities = await Nationality.findAll({
			where: {
				name: {
					[Op.like]: `%${query}%`
				}
			},
			order: [order]
		});

		return nationalities;
	} catch (error) {
		throw error;
	}
};

const getNationalityById = async (req: Request) => {
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
			const nationlity = await Nationality.findByPk(id);
			if (!nationlity) {
				data = null;
				message = 'Not found.';
				status = ResponeCodes.NOT_FOUND;
			} else {
				data = nationlity;
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

const addNationality = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const newNationality: NationalityPayload = req.body;

		if (!newNationality.name) {
			data = null;
			message = 'Name null.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const [nationlity, created] = await Nationality.findOrCreate({
				where: {
					name: newNationality.name
				},
				defaults: {
					...newNationality
				}
			});

			if (created) {
				data = nationlity;
				message = 'Add successfully!';
				status = ResponeCodes.CREATED;
			} else {
				data = null;
				message = 'Nationality exists.';
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

const updateNationality = async (req: Request) => {
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
			const updateNationality = req.body;
			data = await Nationality.update(updateNationality, {
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

const deleteNationality = async (req: Request) => {
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
			data = await Nationality.destroy({
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

export { getNationalities, getNationalityById, addNationality, updateNationality, deleteNationality };
