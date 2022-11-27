import { Request } from 'express';
import { Banner } from 'databases/models';
import ResponeCodes from 'utils/constant/ResponeCode';
import BannerPayload from './BannerPayload';
import Status from 'utils/constant/Status';

const getBanners = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		data = await Banner.findAll({
			where: {
				status: Status.ACTIVE
			}
		});
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

const getBannerById = async (req: Request) => {
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
			const banner = await Banner.findByPk(id);
			if (!banner) {
				data = null;
				message = 'Not found.';
				status = ResponeCodes.NOT_FOUND;
			} else {
				data = banner;
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

const addBanner = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const newBanner: BannerPayload = req.body;
		const banner = await Banner.create(newBanner);
		data = banner;
		message = 'Add successfully!';
		status = ResponeCodes.CREATED;

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const updateBanner = async (req: Request) => {
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
			const updateBanner = req.body;
			data = await Banner.update(updateBanner, {
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

const deleteBanner = async (req: Request) => {
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
			data = await Banner.destroy({
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

export { getBanners, getBannerById, addBanner, updateBanner, deleteBanner };
