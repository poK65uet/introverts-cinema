import { DataTypes } from 'sequelize';
import sequelize from 'databases';
import Nationality from './Nationality';

const Film = sequelize.define(
	'Film',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		title: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING
		},
		imageUrl: {
			type: DataTypes.STRING
		},
		trailerUrl: {
			type: DataTypes.STRING
		},
		duration: {
			type: DataTypes.SMALLINT
		},
		openingDay: {
			type: DataTypes.DATE
		},
		description: {
			type: DataTypes.STRING
		},
		rated: {
			type: DataTypes.STRING
		},
		status: {
			type: DataTypes.STRING
		}
	},
	{
		tableName: 'film',
		timestamps: false,
		underscored: true
	}
);

Nationality.hasOne(Film);
Film.belongsTo(Nationality);

export default Film;
