type UserPayload = {
	email: string;
	password: string;
	fullNname: string;
	birthDay: Date | null;
	roles: string[];
};
export default UserPayload;
