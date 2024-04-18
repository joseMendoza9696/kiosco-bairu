// importar reducers, crearroutestate

import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { thunk } from 'redux-thunk';
import { menuReducer, menuSeleccionReducer } from './reducers/menu.reducer';
import { nuevaOrdenReducer } from './reducers/nuevaOrden.reducer.ts';

const rootReducer = combineReducers({
  menuReducer,
  menuSeleccionReducer,
  nuevaOrdenReducer
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
