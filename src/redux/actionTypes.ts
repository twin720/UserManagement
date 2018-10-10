import { IUser } from '../models/user';
import { IOperation } from '../models/operation';

export enum ActionTypes {
	LOADING_START = 1,
	LOADING_DONE = 2,
	SHOW_ERROR = 3,
	HIDE_ERROR = 4,
	USERS_LOAD = 5,
	USERS_LOAD_DONE = 6,
	USERS_CREATE_USER_DONE = 7,
	USER_LOAD_DONE = 8,
	USER_OPERATIONS_LOAD_DONE = 9,
	USER_UPDATE_DONE_ACTION = 10,
	USER_BALANCE_UPDATE_DONE_ACTION = 11
}

export type ApplicationActions =
	LoadingStartAction
	| LoadingDoneAction
	| ShowErrorAction
	| HideErrorAction;

export interface LoadingStartAction {
	type: ActionTypes.LOADING_START;
}

export interface LoadingDoneAction {
	type: ActionTypes.LOADING_DONE;
}

export interface ShowErrorAction {
	type: ActionTypes.SHOW_ERROR;
	error: string;
}

export interface HideErrorAction {
	type: ActionTypes.HIDE_ERROR;
}

export type UsersActions =
	UsersLoadAction
	| UsersLoadDoneAction
	| CreateUserDoneAction;

export interface UsersLoadAction {
	type: ActionTypes.USERS_LOAD;
}

export interface UsersLoadDoneAction {
	type: ActionTypes.USERS_LOAD_DONE;
	users: IUser[];
	usersCount: number;
	pageNumber: number;
}

export interface CreateUserDoneAction {
	type: ActionTypes.USERS_CREATE_USER_DONE;
}

export type UserActions =
	UserLoadDoneAction
	| UserOperationsLoadDoneAction
	| UserUpdateDoneAction
	| UserBalanceUpdateDoneAction;

export interface UserLoadDoneAction {
	type: ActionTypes.USER_LOAD_DONE;
	user: IUser;
}

export interface UserOperationsLoadDoneAction {
	type: ActionTypes.USER_OPERATIONS_LOAD_DONE;
	operations: IOperation[];
	fromDate: string;
	toDate: string;
}

export interface UserUpdateDoneAction {
	type: ActionTypes.USER_UPDATE_DONE_ACTION;
}


export interface UserBalanceUpdateDoneAction {
	type: ActionTypes.USER_BALANCE_UPDATE_DONE_ACTION;
	balance: number;
}

