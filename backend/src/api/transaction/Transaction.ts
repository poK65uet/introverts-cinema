interface Transaction {
	id: number;
	description: string;
	amount: number;
	when: Date;
}

export default Transaction;
