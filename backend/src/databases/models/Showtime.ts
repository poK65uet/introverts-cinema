import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from 'databases';
import Room from './Room';
import Film from './Film';

export interface ShowtimeModel extends Model<InferAttributes<ShowtimeModel>, InferCreationAttributes<ShowtimeModel>> {
	id: CreationOptional<number>;
	startTime: Date;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;
}

const Showtime = sequelize.define<ShowtimeModel>(
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
		},
		createdAt: {
			type: DataTypes.DATE
		},
		updatedAt: {
			type: DataTypes.DATE
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
