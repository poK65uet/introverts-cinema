import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import sequelize from 'databases';
import User, { UserModel } from './User';
import Seat, { SeatModel } from './Seat';

export interface BillModel extends Model<InferAttributes<BillModel>, InferCreationAttributes<BillModel>> {
	id: CreationOptional<number>;
    totalPrice: number;
    paymentStatus: string;
	User?: NonAttribute<UserModel>;
    Seat?: NonAttribute<SeatModel[]>;
    
}

const Bill = sequelize.define<BillModel>(
	'Bill',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		totalPrice: {
			type: DataTypes.BIGINT
        },
        paymentStatus: {
            type: DataTypes.STRING
        }
	},
	{
		tableName: 'bill',
		underscored: true
	}
);

User.hasOne(Bill);
Bill.belongsTo(User);

export default Bill;
