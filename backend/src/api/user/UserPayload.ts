import { RoleModel } from "databases/models/Role";

type UserPayload = {
	email: string;
	password: string;
	fullNname: string;
	birthDay: Date | null;
};
export default UserPayload;
