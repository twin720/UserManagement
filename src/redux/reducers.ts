import { combineReducers, Reducer } from 'redux';
import { IStore } from './store';
import application from './application/reducers';
import users from './users/reducers';
import user from './user/reducers';
import { routerReducer as routing } from "react-router-redux";

export type ReducersMapObjectType = { [P in keyof (IStore)]: Reducer<IStore[P]> };

const reducers: ReducersMapObjectType = {
	application,
	users,
	user,
	routing
};

export default combineReducers(reducers);
