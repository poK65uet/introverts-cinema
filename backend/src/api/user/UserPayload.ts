interface UserPayload {
	email: string;
	password: string;
	fullName?: string;
	birthDay?: Date;
}

export default UserPayload;
