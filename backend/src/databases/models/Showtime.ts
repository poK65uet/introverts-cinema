import { DataTypes } from 'sequelize';
import sequelize from 'databases';
import Room from './Room';
import Film from './Film';

const Showtime = sequelize.define(
	'Showtime',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		startTime: {
			allowNull: false,
			type: DataTypes.TIME
		}
	},
	{
		tableName: 'showtime',
		underscored: true
	}
);

Room.hasOne(Showtime);
Showtime.belongsTo(Room);

Film.hasOne(Showtime);
Showtime.belongsTo(Film);

export default Showtime;
