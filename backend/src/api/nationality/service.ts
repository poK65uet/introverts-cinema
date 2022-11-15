import { Request } from 'express';
import { Nationality } from 'databases/models';
import ResponeCodes from 'utils/constant/ResponeCode';
import NationalityPayload from './NationalityPayload';

const getNationalities = async (req: Request) => {
	let data;
	let message: string;
	let status: number;

	data = await Nationality.findAll();
	message = 'Get all successfully!';
	status = ResponeCodes.OK;

	return {
		data,
		message,
		status
	};
};

const getNationalityById = async (req: Request) => {
	let data;
	let message: string;
	let status: number;

	const id = parseInt(req.params.id);

	if (isNaN(id)) {
		data = null;
		message = 'Invalid identifier';
		status = ResponeCodes.BAD_REQUEST;
	} else {
		const nationlity = await Nationality.findByPk(id);
		if (!nationlity) {
			data = null;
			message = 'Not found';
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
};

const addNationality = async (req: Request) => {
	let data;
	let message: string;
	let status: number;

	const newNationality: NationalityPayload = req.body;

	const { name, imageUrl } = newNationality;

	if (!name) {
		data = null;
		message = 'Name null';
		status = ResponeCodes.BAD_REQUEST;
	} else {
		const [nationlity, created] = await Nationality.findOrCreate({
			where: {
				name
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
			message = 'Failed create';
			status = ResponeCodes.OK;
		}
	}

	return {
		data,
		message,
		status
	};
};

const updateNationality = async (req: Request) => {
	let data;
	let message: string;
	let status: number;

	const id = parseInt(req.params.id);

	if (isNaN(id)) {
		data = null;
		message = 'Invalid identifier';
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
};

const deleteNationality = async (req: Request) => {
	let data;
	let message: string;
	let status: number;

	const id = parseInt(req.params.id);

	if (isNaN(id)) {
		data = null;
		message = 'Invalid identifier';
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
};

export { getNationalities, getNationalityById, addNationality, updateNationality, deleteNationality };
