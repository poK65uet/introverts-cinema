import { DataTypes } from 'sequelize';
import sequelize from 'databases';

const Price = sequelize.define(
	'Price',
	{
		visionType: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		dayCode: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.STRING
		},
		value: {
			type: DataTypes.BIGINT
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
