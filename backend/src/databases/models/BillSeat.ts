import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from 'databases';
import Bill from './Bill';
import Seat from './Seat';

export interface BillSeatModel extends Model<InferAttributes<BillSeatModel>, InferCreationAttributes<BillSeatModel>> {
	id: CreationOptional<number>;
}

const BillSeat = sequelize.define<BillSeatModel>(
	'BillSeat',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		}
	},
	{
		tableName: 'bill_seat',
		underscored: true
	}
);

Bill.belongsToMany(Seat, { through: BillSeat });
Seat.belongsToMany(Bill, { through: BillSeat });

export default BillSeat;
