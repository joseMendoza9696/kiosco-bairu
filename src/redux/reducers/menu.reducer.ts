import { MenuInterface } from '../../interfaces/menu.interface';

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

export function menuReducer(state = initalMenuState, action: any) {
  switch (action.type) {
    //  case GUARDAR_MENU:
    //  const categorias = actualizarCategoriaSeleccionada(0, action.payload);
    // return { ...state, categorias: categorias };

    default:
      return state;
  }
}
