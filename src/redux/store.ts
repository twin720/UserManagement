import { createStore, applyMiddleware, Store } from 'redux';
import { RouterState } from "react-router-redux";
import { logger } from './middleware';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import { IApplicationStore } from './application/store';
import { IUsersStore } from './users/store';
import { IUserStore } from './user/store';

export interface IStore {
	application: IApplicationStore;
	users: IUsersStore;
	user: IUserStore;
	routing: RouterState;
}

export function configureStore(initialState?: IStore): Store<IStore> {
	const create = createStore;
	const createStoreWithMiddleware = applyMiddleware(logger, thunkMiddleware)(create);

	const store = createStoreWithMiddleware(rootReducer, initialState) as Store<IStore>;
	(window as any).store = store;
	return store;
}

const store = configureStore();

export default store;
