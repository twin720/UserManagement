import { IUsersStore } from './store';
import { ActionTypes, UsersActions } from '../actionTypes';
import iassign from "immutable-assign";

const initialState: IUsersStore = {
    users: [],
    usersCount: 0,
    pageNumber: null,
};

export default (state: IUsersStore = initialState, action: UsersActions) => {
    switch (action.type) {
        case ActionTypes.USERS_LOAD: {
            return state;
        }
        case ActionTypes.USERS_LOAD_DONE: {
            let newState = iassign(state, (st) => st.users, (prop) => action.users);
            newState = iassign(newState, (st) => st.pageNumber, (prop) => action.pageNumber)
            return iassign(newState, (st) => st.usersCount, (prop) => action.usersCount);
        }
        default:
            return state;
    }
}
