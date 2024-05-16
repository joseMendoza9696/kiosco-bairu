// import { MenuInterface, SELECCION } from '../../interfaces/menu.interface';

export const GUARDAR_MENU = 'GUARDAR_MENU';
export const SELECCIONAR_CATEGORIA = 'SELECCIONAR_CATEGORIA';
export const SELECCIONAR_SUBCATEGORIA = 'SELECCION_SUBCATEGORIA';

// SOLO RECIBE VALORES T MANDA AL REDUCER

export const guardarMenu = (nuevoMenu: any) => (dispatch: any) => {
  dispatch({
    type: GUARDAR_MENU,
    payload: nuevoMenu,
  });
};

export const seleccionarCategoria =
  (categoriaIndex: number) => (dispatch: any) => {
    dispatch({
      type: SELECCIONAR_CATEGORIA,
      payload: categoriaIndex,
    });
  };

export const seleccionarSubcategoria =
  (subcategoriaIndex: number) => (dispatch: any) => {
    dispatch({
      type: SELECCIONAR_SUBCATEGORIA,
      payload: subcategoriaIndex,
    });
  };
