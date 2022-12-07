interface TicketPayload {
    room: string;
    seatRow: number;
    seatColumn: number;
    seatCode: string;
    time: Date;
    price: number;
}

export default TicketPayload;