import axios from 'axios';
import config from 'config';
import { BillModel } from 'databases/models/Bill';
import GetTransactionResponse, { GetTransactionData } from './GetTransactionResponse';
import Transaction from './Transaction';

const ASYNC_WALLET_PATH = '/sync';
const GET_TRANSACTION_PATH = '/transactions';
const DESCRIPTION_PREFIX = 'Introvert Cinema hoa don ';

const syncWalletTransaction = async () => {
	await axios.post(
		`${config.casso_base_url}${ASYNC_WALLET_PATH}`,
		{
			bank_acc_id: config.bank_acc_number
		},
		{
			headers: {
				Authorization: `Apikey ${config.casso_api_key}`
			}
		}
	);
};

const getAllTransactionThisWeek = async () => {
	await syncWalletTransaction();
	const params = {
		page: 1,
		pageSize: 1000000,
		sort: 'DESC'
	};
	const response = await axios.get(`${config.casso_base_url}${GET_TRANSACTION_PATH}`, {
		params,
		headers: {
			Authorization: `Apikey ${config.casso_api_key}`
		}
	});
	const result: GetTransactionResponse = response.data;

	return result.data.records;
};

const verifyBillTransaction = async (bill: BillModel) => {
	await syncWalletTransaction();
	const allTransactions: Transaction[] = await getAllTransactionThisWeek();
	const billTransactions: Transaction[] = allTransactions.filter(transaction =>
		transaction.description.includes(`${DESCRIPTION_PREFIX}${bill.id}`)
	);

	let totalAmount = 0;
	billTransactions.forEach(transaction => (totalAmount += transaction.amount));
	return totalAmount >= bill.totalPrice;
};

export { getAllTransactionThisWeek, verifyBillTransaction, DESCRIPTION_PREFIX };
