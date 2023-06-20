import { Price } from '../../databases/models';
import { ShowtimeModel } from '../../databases/models/Showtime';
import { Request } from 'express';

const getAllPrices = async () => {
	const prices = await Price.findAll();
	return prices;
};

const getPrice = async (showtime: ShowtimeModel) => {
	const price = await Price.findOne({
		where: {
			visionType: showtime.Room.visionType,
			dayCode: showtime.startTime.getDay()
		}
	});

	return price.value;
};

const updatePriceById = async (req: Request) => {
	const id = req.params.id;
	const newValue = req.body.value;
	const newPrice = await Price.update(
		{ value: newValue },
		{
			where: {
				id
			}
		}
	);
	return newPrice;
};

export { getAllPrices, updatePriceById, getPrice };
