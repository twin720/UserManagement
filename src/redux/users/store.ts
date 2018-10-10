import { IUser } from "../../models/user";

export interface IUsersStore {
	users: IUser[],
	usersCount: number;
	pageNumber: number;
}
