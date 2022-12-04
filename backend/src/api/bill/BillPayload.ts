interface BillPayload {
	showtimeId: number;
	seats: SeatPayload[];
}

export interface SeatPayload {
	row: number;
	column: number;
	code: string;
}

export default BillPayload;
