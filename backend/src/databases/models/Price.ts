import { DataTypes } from 'sequelize';
import sequelize from 'databases';

const Price = sequelize.define(
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
