import {
  MenuInterface,
  MenuSeleccionInterface,
} from '../../interfaces/menu.interface';
import {
  GUARDAR_MENU,
  SELECCIONAR_CATEGORIA,
  SELECCIONAR_SUBCATEGORIA,
} from '../actions/menu.action';
// FUNCTIONS
import { actualizarCategoriaSeleccionada } from '../functions.ts';

const initalMenuState: MenuInterface = {
  categorias: [
    {
      id: '',
      nombre: '',
      imagen: '',
      seleccionada: false,
      subcategorias: [],
    },
  ],
};
// cuando cargue el menu actualizar el intial menu state
// crear guardad menu

export function menuReducer(state = initalMenuState, action: any) {
  switch (action.type) {
    case GUARDAR_MENU:
      const categorias = actualizarCategoriaSeleccionada(0, action.payload);
      return { ...state, categorias: categorias };
    default:
      return state;
  }
}
const initialMenuSeleccionState: MenuSeleccionInterface = {
  categoriaSeleccionada: 0,
  subcategoriaSeleccionada: 0,
  productoSeleccionado: null,
};

export function menuSeleccionReducer(
  state = initialMenuSeleccionState,
  action: any,
) {
  switch (action.type) {
    case SELECCIONAR_CATEGORIA:
      return { ...state, categoriaSeleccionada: action.payload };
    case SELECCIONAR_SUBCATEGORIA:
      return { ...state, subcategoriaSeleccionada: action.payload };
    default:
      return state;
  }
}
