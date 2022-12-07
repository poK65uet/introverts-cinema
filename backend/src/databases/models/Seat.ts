import {
	BelongsToSetAssociationMixin,
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	NonAttribute
} from 'sequelize';
import sequelize from 'databases';
import Showtime, { ShowtimeModel } from './Showtime';

export interface SeatModel extends Model<InferAttributes<SeatModel>, InferCreationAttributes<SeatModel>> {
	id: CreationOptional<number>;
	row: number;
	column: number;
	code: string;
	owner: string;
	status: string;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;

	Showtime?: NonAttribute<ShowtimeModel>;
	setShowtime: BelongsToSetAssociationMixin<ShowtimeModel, ShowtimeModel['id']>;
}

const Seat = sequelize.define<SeatModel>(
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
			type: DataTypes.INTEGER
		},
		column: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		code: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		owner: {
			type: DataTypes.STRING
		},
		status: {
			type: DataTypes.TINYINT
		},
		createdAt: {
			type: DataTypes.DATE
		},
		updatedAt: {
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'seat',
		underscored: true
	}
);

Showtime.hasMany(Seat);
Seat.belongsTo(Showtime);

export default Seat;
