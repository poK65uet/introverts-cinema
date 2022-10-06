import { DataTypes } from 'sequelize';
import sequelize from 'databases';
import Price from './Price';

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
		},
		visionType: {
			allowNull: false,
			type: DataTypes.STRING
        },
        price: {
            allowNull: false,
            type: DataTypes.BIGINT
        }
	},
	{
		tableName: 'showtime',
		underscored: true
	}
);


export default Showtime;
