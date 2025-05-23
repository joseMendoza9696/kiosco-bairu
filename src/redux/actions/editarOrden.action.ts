// import { ProductoNuevaOrden } from "../../../interfaces/Restaurantes/nuevaOrden.interface";
import { ProductoNuevaOrden } from '../../interfaces/nuevaOrden.interface.ts';

export const EDITAR_PRODUCTO_ORDEN = 'EDITAR_PRODUCTO_ORDEN';
export const SELECCIONAR_OPCION_EDITAR = 'SELECCIONAR_OPCION_EDITAR';
export const DESELECCIONAR_OPCION_EDITAR = 'DESELECCIONAR_OPCION_EDITAR';
export const VACIAR_EDITAR_PRODUCTO_ORDEN = 'VACIAR_EDITAR_PRODUCTO_ORDEN';
export const RESTAR_CANTIDAD_PRODUCTO_EDITAR =
  'RESTAR_CANTIDAD_PRODUCTO_EDITAR';
export const SUMAR_CANTIDAD_PRODUCTO_EDITAR = 'SUMAR_CANTIDAD_PRODUCTO_EDITAR';
export const MODIFICAR_CANTIDAD_PRODUCTO = 'MODIFICAR_CANTIDAD_PRODUCTO';

//envio del objeto entero del producto + posicion en el carrito
export const editarProductoOrden =
  (producto: ProductoNuevaOrden, productoIndex: number) => (dispatch: any) => {
    dispatch({
      type: EDITAR_PRODUCTO_ORDEN,
      payload: { producto, productoIndex },
    });
  };

export const modificarCantidadProducto =
  (agregar: number) => (dispatch: any) => {
    dispatch({
      type: MODIFICAR_CANTIDAD_PRODUCTO,
      payload: { agregar },
    });
  };

// poner como seleccionado un producto: bool
export const seleccionarOpcionEditar =
  (opcionMenuIndex: number, opcionIndex: number) => (dispatch: any) => {
    dispatch({
      type: SELECCIONAR_OPCION_EDITAR,
      payload: { opcionMenuIndex, opcionIndex },
    });
  };

// poner como deseleccionado un producto: bool
export const deseleccionarOpcionEditar =
  (opcionMenuIndex: number, opcionIndex: number) => (dispatch: any) => {
    dispatch({
      type: DESELECCIONAR_OPCION_EDITAR,
      payload: { opcionMenuIndex, opcionIndex },
    });
  };

// restablece los valores a predeterminado
export const vaciarEditarProductoOrden = () => (dispatch: any) => {
  dispatch({ type: VACIAR_EDITAR_PRODUCTO_ORDEN });
};
