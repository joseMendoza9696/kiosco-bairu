// importar reducers, crearroutestate

import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({});

export const Store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
