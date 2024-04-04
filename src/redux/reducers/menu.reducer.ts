import { MenuInterface } from '../../interfaces/menu.interface';
import { GUARDAR_MENU } from '../actions/menu.action';
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
