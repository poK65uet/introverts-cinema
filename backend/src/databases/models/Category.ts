import { DataTypes } from 'sequelize';
import sequelize from 'databases';

const Category = sequelize.define(
	'Category',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING
		}
	},
	{
		tableName: 'category',
		timestamps: false,
		underscored: true
	}
);

export default Category;
