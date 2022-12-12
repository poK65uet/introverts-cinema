import Transaction from './Transaction';

interface GetTransactionResponse {
	error: number;
	message: string;
	data: GetTransactionData;
}

interface GetTransactionData {
	totalRecords: number;
	records: Transaction[];
}

export default GetTransactionResponse;

export { GetTransactionData };
