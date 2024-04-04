// import { MenuInterface } from '../../interfaces/menu.interface';

export const GUARDAR_MENU = 'GUARDAR_MENU';

// SOLO RECIBE VALORES T MANDA AL REDUCER

export const guardarMenu = (nuevoMenu: any) => (dispatch: any) => {
  dispatch({
    type: GUARDAR_MENU,
    payload: nuevoMenu,
  });
};
