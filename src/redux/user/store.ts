import { IUser } from "../../models/user";
import { IOperation } from '../../models/operation';

export interface IUserStore {
	user: IUser,
	operations: IOperation[],
}
