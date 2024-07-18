// import { ProductoNuevaOrden } from "../../../interfaces/Restaurantes/nuevaOrden.interface";
import { ProductoNuevaOrden } from '../../interfaces/nuevaOrden.interface.ts';

export const EDITAR_PRODUCTO_ORDEN = 'EDITAR_PRODUCTO_ORDEN';
export const SELECCIONAR_OPCION_EDITAR = 'SELECCIONAR_OPCION_EDITAR';
export const DESELECCIONAR_OPCION_EDITAR = 'DESELECCIONAR_OPCION_EDITAR';

//envio de la informacion de la orden a modificar
export const editarProductoOrden =
  (producto: ProductoNuevaOrden, productoIndex: number) => (dispatch: any) => {
    dispatch({
      type: EDITAR_PRODUCTO_ORDEN,
      payload: { producto, productoIndex },
    });
  };
// editar cantidad de una orden
// export const editarCantidadOrden = (produ)

export const seleccionarOpcionEditar =
  (opcionMenuIndex: number, opcionIndex: number) => (dispatch: any) => {
    dispatch({
      type: SELECCIONAR_OPCION_EDITAR,
      payload: { opcionMenuIndex, opcionIndex },
    });
  };

export const deseleccionarOpcionEditar =
  (opcionMenuIndex: number, opcionIndex: number) => (dispatch: any) => {
    dispatch({
      type: DESELECCIONAR_OPCION_EDITAR,
      payload: { opcionMenuIndex, opcionIndex },
    });
  };
