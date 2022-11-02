import { DataTypes } from 'sequelize';
import sequelize from 'databases';

const Rated = sequelize.define(
	'Rated',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		code: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING
		}
	},
	{
		tableName: 'rated',
		timestamps: false,
		underscored: true
	}
);

export default Rated;
