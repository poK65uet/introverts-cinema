interface UserPayload {
	email: string;
	password: string;
	fullName?: string;
	phone?: string;
	birthDay?: Date;
}

export default UserPayload;
