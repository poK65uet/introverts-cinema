import { DataTypes } from 'sequelize';
import sequelize from 'databases';

const Nationality = sequelize.define(
	'Nationality',
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
		},
		imageUrl: {
			type: DataTypes.STRING
		}
	},
	{
		tableName: 'nationality',
		timestamps: false,
		underscored: true
	}
);

export default Nationality;
