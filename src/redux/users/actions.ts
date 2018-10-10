import {
    ActionTypes,
    UsersLoadAction,
    UsersLoadDoneAction,
    CreateUserDoneAction,
} from '../actionTypes';
import { IUser, IUsersData } from "../../models/user";
import { Dispatch } from "react-redux";
import { IStore } from '../store';
import { startLoading, endLoading } from "../application/actions";
import axiosInstance from '../../helpers/axiosInstance';

const BASE_URL: string = 'https://livedemo.xsolla.com/fe/test-task/baev';

export const usersLoad: () => UsersLoadAction =
    () => ({
        type: ActionTypes.USERS_LOAD
    });

export const usersLoadDone: (users: IUser[], usersCount: number, pageNumber: number) => UsersLoadDoneAction =
    (users, usersCount, pageNumber) => ({
        type: ActionTypes.USERS_LOAD_DONE,
        users,
        usersCount,
        pageNumber
    });

export function loadUsers(pageNumber?: number) {
    return async (dispatch: Dispatch<any>, getState: () => IStore) => {
        try {
            dispatch(startLoading());
            await dispatch(usersLoad());
            const usersData: IUsersData = await getUsersFromServer(pageNumber);
            const users = usersData.data;
            await dispatch(usersLoadDone(users, usersData.recordsTotal, pageNumber));
        }
        finally {
            dispatch(endLoading());
        }
    }
}

async function getUsersFromServer(pageNumber?: number): Promise<IUsersData> {
    let pn = pageNumber != null && pageNumber > 0 ? pageNumber : 1;
    const limit = 10;
    let offset = (pn - 1) * limit;
    return axiosInstance.get(`${BASE_URL}/users?offset=${offset}&limit=${limit}`).then(response => {
        return response.data as IUsersData;
    });
}

export const createUserDone: () => CreateUserDoneAction =
    () => ({
        type: ActionTypes.USERS_CREATE_USER_DONE
    });


export function createUser(user: IUser) {
    return async (dispatch: Dispatch<any>, getState: () => IStore) => {
        try {
            const state = getState();
            dispatch(startLoading());
            await createUserAtServer(user);
            dispatch(createUserDone());
            await dispatch(loadUsers(state.users.pageNumber));
        }
        finally {
            dispatch(endLoading());
        }
    }
}

async function createUserAtServer(user?: IUser): Promise<IUser> {
    return axiosInstance.post(`${BASE_URL}/users`, user).then(response => {
        return response.data;
    });
}

