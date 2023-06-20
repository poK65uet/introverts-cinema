import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	BelongsToSetAssociationMixin,
	NonAttribute
} from 'sequelize';
import sequelize from '../../databases';
import User, { UserModel } from './User';
import Film, { FilmModel } from './Film';

export interface TicketModel extends Model<InferAttributes<TicketModel>, InferCreationAttributes<TicketModel>> {
	id: CreationOptional<number>;
	room: string;
	seatRow: number;
	seatColumn: number;
	seatCode: string;
	time: Date;
	price: number;
	status: string;
	Film?: NonAttribute<FilmModel>;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;
	setUser: BelongsToSetAssociationMixin<UserModel, UserModel['id']>;
	setFilm: BelongsToSetAssociationMixin<FilmModel, FilmModel['id']>;
}

const Ticket = sequelize.define<TicketModel>(
	'Ticket',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		room: {
			allowNull: false,
			type: DataTypes.STRING
		},
		seatRow: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		seatColumn: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		seatCode: {
			allowNull: false,
			type: DataTypes.STRING
		},
		time: {
			allowNull: false,
			type: DataTypes.DATE
		},
		price: {
			allowNull: false,
			type: DataTypes.BIGINT
		},
		status: {
			allowNull: false,
			type: DataTypes.STRING
		},

		createdAt: {
			type: DataTypes.DATE
		},
		updatedAt: {
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'ticket',
		underscored: true
	}
);

User.hasOne(Ticket);
Ticket.belongsTo(User);

Film.hasOne(Ticket);
Ticket.belongsTo(Film);

export default Ticket;
