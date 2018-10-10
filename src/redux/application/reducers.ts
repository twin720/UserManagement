import { IApplicationStore } from './store';
import { ActionTypes, ApplicationActions } from '../actionTypes';
import iassign from "immutable-assign";

const initialState: IApplicationStore = {
    loading: false,
    loadingCount: 0,
    error: "",
};

export default (state: IApplicationStore = initialState, action: ApplicationActions) => {
    switch (action.type) {
        case ActionTypes.LOADING_START: {
            const newState = { ...state };
            newState.loadingCount++;
            newState.loading = newState.loadingCount > 0;
            return newState;
        }
        case ActionTypes.LOADING_DONE: {
            const newState = { ...state };
            newState.loadingCount--;
            newState.loading = newState.loadingCount > 0;
            return newState;
        }
        case ActionTypes.SHOW_ERROR: {
            return iassign(state, (st) => st.error, (prop) => action.error);
        }
        case ActionTypes.HIDE_ERROR: {
            return iassign(state, (st) => st.error, (prop) => "");
        }
        default:
            return state;
    }
}
