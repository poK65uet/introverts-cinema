import axios from 'axios';
import config from 'config';
import GetTransactionResponse, { GetTransactionData } from './GetTransactionResponse';

const ASYNC_WALLET_PATH = '/sync';
const GET_TRANSACTION_PATH = '/transactions';

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

export { getAllTransactionThisWeek };
