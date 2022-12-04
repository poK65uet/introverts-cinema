import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from 'databases';

export interface PriceModel extends Model<InferAttributes<PriceModel>, InferCreationAttributes<PriceModel>> {
	id: CreationOptional<number>;
	visionType: string;
	dayCode: number;
	value: number;
	updatedAt: CreationOptional<Date>;
}

const Price = sequelize.define<PriceModel>(
	'Price',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		visionType: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		dayCode: {
			allowNull: false,
			type: DataTypes.TINYINT
		},
		value: {
			type: DataTypes.BIGINT
		},
		updatedAt: {
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'price',
		timestamps: true,
		createdAt: false,
		underscored: true
	}
);

export default Price;
