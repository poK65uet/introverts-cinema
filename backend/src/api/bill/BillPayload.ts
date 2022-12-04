interface BillPayload {
	userId: number;
	showtimeId: number;
	positions: Position[];
}

export interface Position {
	row: number;
	column: number;
}

export default BillPayload;
