import { Price } from 'databases/models';
import { Request } from 'express';

const getAllPrices = async () => {
	const prices = await Price.findAll();
	return prices;
};

const getPrice = async (visionType: string, dayCode: number) => {
	const price = await Price.findOne({
		where: {
			visionType,
			dayCode
		}
	});
	return price;
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
