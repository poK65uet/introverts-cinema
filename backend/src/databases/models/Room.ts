import { DataTypes } from 'sequelize';
import sequelize from 'databases';

const Room = sequelize.define(
	'Room',
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
		visionType: {
			type: DataTypes.STRING
		},
		columnNumber: {
			type: DataTypes.INTEGER
		},
		rowNumber: {
			type: DataTypes.INTEGER
		}
	},
	{
		tableName: 'room',
		underscored: true
	}
);

export default Room;
