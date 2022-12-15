import { Request } from 'express';
import { Category } from 'databases/models';
import ResponeCodes from 'utils/constants/ResponeCode';
import CategoryPayload from './CategoryPayload';
import paginate from 'utils/helpers/pagination';
import { Op } from 'sequelize';

const getCategories = async (req: Request) => {
	try {
		const { order, query } = paginate(req);

		const categories = await Category.findAll({
			where: {
				name: {
					[Op.like]: `%${query}%`
				}
			},
			order: [order]
		});

		return categories;
	} catch (error) {
		throw error;
	}
};

const getCategoryById = async (req: Request) => {
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
			const category = await Category.findByPk(id);
			if (!category) {
				data = null;
				message = 'Not found.';
				status = ResponeCodes.NOT_FOUND;
			} else {
				data = category;
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

const addCategory = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const newCategory: CategoryPayload = req.body;

		if (!newCategory.name) {
			data = null;
			message = 'Name null.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const category = await Category.create(newCategory);
			data = category;
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

const updateCategory = async (req: Request) => {
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
			const updateCategory = req.body;
			data = await Category.update(updateCategory, {
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

const deleteCategory = async (req: Request) => {
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
			data = await Category.destroy({
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

export { getCategories, getCategoryById, addCategory, updateCategory, deleteCategory };
