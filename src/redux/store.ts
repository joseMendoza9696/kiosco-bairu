// importar reducers, crearroutestate

import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { thunk } from 'redux-thunk';
import { menuReducer } from './reducers/menu.reducer';

const rootReducer = combineReducers({
  menuReducer,
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
