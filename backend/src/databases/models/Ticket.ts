import { DataTypes } from 'sequelize';
import sequelize from 'databases';
import User from './User';

const Ticket = sequelize.define(
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
			type: DataTypes.STRING
		},
		seatColumn: {
			allowNull: false,
			type: DataTypes.STRING
		},
		time: {
			allowNull: false,
			type: DataTypes.TIME
		},
		price: {
			allowNull: false,
			type: DataTypes.BIGINT
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
