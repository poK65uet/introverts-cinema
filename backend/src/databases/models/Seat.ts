import { DataTypes } from 'sequelize';
import sequelize from 'databases';
import Showtime from './Showtime';

const Seat = sequelize.define(
	'Seat',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		row: {
			allowNull: false,
			type: DataTypes.STRING
		},
		column: {
			allowNull: false,
			type: DataTypes.STRING
		},
		status: {
			type: DataTypes.STRING
		}
	},
	{
		tableName: 'seat',
		underscored: true
	}
);

Showtime.hasOne(Seat);
Seat.belongsTo(Showtime);

export default Seat;
