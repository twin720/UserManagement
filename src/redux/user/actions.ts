import {
    ActionTypes,
    UserLoadDoneAction,
    UserOperationsLoadDoneAction,
    UserUpdateDoneAction,
    UserBalanceUpdateDoneAction
} from '../actionTypes';
import { IUser } from "../../models/user";
import { Dispatch } from "react-redux";
import { IStore } from '../store';
import { startLoading, endLoading } from "../application/actions";
import axiosInstance from '../../helpers/axiosInstance';
import { IOperation } from '../../models/operation';

const BASE_URL: string = 'https://livedemo.xsolla.com/fe/test-task/baev';

export const userLoadDone: (user: IUser) => UserLoadDoneAction =
    (user) => ({
        type: ActionTypes.USER_LOAD_DONE,
        user
    });

export function getUser(userId: string) {
    return async (dispatch: Dispatch<any>, getState: () => IStore) => {
        try {
            dispatch(startLoading());
            const user: IUser = await getUserFromServer(userId);
            if (user.user_id != null)
                await dispatch(userLoadDone(user));
            return user;
        }
        finally {
            dispatch(endLoading());
        }
    }
}

async function getUserFromServer(userId: string): Promise<IUser> {
    return axiosInstance.get(`${BASE_URL}/users/${userId}`).then(response => {
        return response.data as IUser;
    });
}

export const userOperationsLoadDone: (operations: IOperation[], fromDate: string, toDate: string) => UserOperationsLoadDoneAction =
    (operations, fromDate, toDate) => ({
        type: ActionTypes.USER_OPERATIONS_LOAD_DONE,
        operations,
        fromDate,
        toDate
    });

export function getOperations(userId: string, fromDate?: string, toDate?: string) {
    return async (dispatch: Dispatch<any>, getState: () => IStore) => {
        try {
            let operations: IOperation[];
            dispatch(startLoading());
            if (fromDate != null && toDate != null) {
                operations = await getOperationsFromServer(userId, fromDate, toDate);
            }
            else {
                operations = [];
            }
            await dispatch(userOperationsLoadDone(operations, fromDate, toDate));
        }
        finally {
            dispatch(endLoading());
        }
    }
}

async function getOperationsFromServer(userId: string, fromDate: string, toDate: string): Promise<IOperation[]> {
    return axiosInstance.get(`${BASE_URL}/users/${userId}/transactions?datetime_from=${fromDate}&datetime_to=${toDate}`).then(response => {
        return response.data as IOperation[];
    });
}

export const userUpdateDone: () => UserUpdateDoneAction =
    () => ({
        type: ActionTypes.USER_UPDATE_DONE_ACTION,
    });

export function updateUser(user: IUser) {
    return async (dispatch: Dispatch<any>, getState: () => IStore) => {
        try {
            dispatch(startLoading());
            await updateUserOnServer(user);
            await dispatch(userUpdateDone());
            await dispatch(getUser(user.user_id));
        }
        finally {
            dispatch(endLoading());
        }
    }
}

async function updateUserOnServer(user: IUser): Promise<{}> {
    return axiosInstance.put(`${BASE_URL}/users/${user.user_id}`, user).then(response => {
        return response.data;
    });
}

export const userBalanceUpdateDone: (balance: number) => UserBalanceUpdateDoneAction =
    (balance) => ({
        type: ActionTypes.USER_BALANCE_UPDATE_DONE_ACTION,
        balance
    });

export function changeBalance(userId: string, amount: number, comment: string) {
    return async (dispatch: Dispatch<any>, getState: () => IStore) => {
        try {
            dispatch(startLoading());
            const balance: number = await changeBalanceOnServer(userId, amount, comment);
            await dispatch(userBalanceUpdateDone(balance));
            return balance;
        }
        finally {
            dispatch(endLoading());
        }
    }
}

async function changeBalanceOnServer(userId: string, amount: number, comment: string): Promise<number> {
    const obj = {
        amount,
        comment
    };
    return axiosInstance.post(`${BASE_URL}/users/${userId}/recharge`, obj).then(response => {
        return response.data.amount as number;
    });
}