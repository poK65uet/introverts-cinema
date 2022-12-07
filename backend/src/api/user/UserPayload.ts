interface UserPayload {
	email: string;
	password: string;
	fullName?: string;
	phone?: string;
	birthDay?: Date;
	roles?: number[];
}

export default UserPayload;
