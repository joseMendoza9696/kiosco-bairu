import { MenuInterface } from '../../interfaces/menu.interface';
import {
  CATEGORIASELECCIONADA,
  GUARDAR_MENU,
  categoriaSeleccionada,
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
    case CATEGORIASELECCIONADA:
      const categoriaId = action.payload;
      const categoriasSeleccionadas = state.categorias.map((categoria) => ({
        ...categoria,
        seleccionada: categoria.id === categoriaId,
      }));
      return { ...state, categorias: categoriasSeleccionadas };

    default:
      return state;
  }
}
