import {
    ActionTypes,
    LoadingStartAction,
    LoadingDoneAction,
    ShowErrorAction,
    HideErrorAction
} from '../actionTypes';

export const startLoading: () => LoadingStartAction =
    () => ({
        type: ActionTypes.LOADING_START
    });

export const endLoading: () => LoadingDoneAction =
    () => ({
        type: ActionTypes.LOADING_DONE
    });

export const showError: (error: string) => ShowErrorAction =
    (error) => ({
        type: ActionTypes.SHOW_ERROR,
        error
    });

export const hideError: () => HideErrorAction =
    () => ({
        type: ActionTypes.HIDE_ERROR
    });

