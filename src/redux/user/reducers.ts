import { IUserStore } from './store';
import { ActionTypes, UserActions } from '../actionTypes';
import iassign from "immutable-assign";
import { IUser } from "../../models/user";

const initialState: IUserStore = {
    user: { user_id: "" },
    operations: []
};

export default (state: IUserStore = initialState, action: UserActions) => {
    switch (action.type) {
        case ActionTypes.USER_LOAD_DONE: {
            return iassign(state, (st) => st.user, (prop) => action.user);
        }
        case ActionTypes.USER_OPERATIONS_LOAD_DONE: {
            return iassign(state, (st) => st.operations, (prop) => action.operations);
        }
        case ActionTypes.USER_UPDATE_DONE_ACTION: {
            return { ...state };
        }
        case ActionTypes.USER_BALANCE_UPDATE_DONE_ACTION: {
            return iassign(state, (st) => st.user.balance, (prop) => action.balance);
        }
        default:
            return state;
    }
}
