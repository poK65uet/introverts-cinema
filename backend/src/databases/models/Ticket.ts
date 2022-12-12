import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	BelongsToSetAssociationMixin
} from 'sequelize';
import sequelize from 'databases';
import User, { UserModel } from './User';

export interface TicketModel extends Model<InferAttributes<TicketModel>, InferCreationAttributes<TicketModel>> {
	id: CreationOptional<number>;
	room: string;
	seatRow: number;
	seatColumn: number;
	seatCode: string;
	time: Date;
	price: number;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;
	setUser: BelongsToSetAssociationMixin<UserModel, UserModel['id']>;
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

export default Ticket;
