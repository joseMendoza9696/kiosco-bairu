import { EditarProductoInterface } from '../../interfaces/editarOrden.interface.ts';
import {
  ENTREGA,
  ProductoNuevaOrden,
} from '../../interfaces/nuevaOrden.interface.ts';

export const AGREGAR_PRODUCTO = 'AGREGAR_PRODUCTO';
export const ACTUALIZAR_CUENTA_TOTAL = 'ACTUALIZAR_CUENTA_TOTAL';
export const QUITAR_ULTIMO_PRODUCTO = 'QUITAR_ULTIMO_PRODUCTO';
export const SELECCIONAR_OPCION = 'SELECCIONAR_OPCION';
export const DESELECCIONAR_OPCION = 'DESELECCIONAR_OPCION';
export const ELIMINAR_PRODUCTO = 'ELIMINAR_PRODUCTO';
export const EDITAR_CANTIDAD_PRODUCTO = 'EDITAR_CANTIDAD_PRODUCTO';
export const EDITAR_PRODUCTO = 'EDITAR_PRODUCTO';
export const ACTUALIZAR_DATOS_FACTURA = 'ACTUALIZAR_DATOS_FACTURA';
export const ACTUALIZAR_METODO_DE_PAGO = 'ACTUALIZAR_METODO_DE_PAGO';
export const ACTUALIZAR_NOMBRE_CLIENTE = 'ACTUALIZAR_NOMBRE_CLIENTE';
export const ACTUALIZAR_TIPO_ENTREGA = 'ACTUALIZAR_TIPO_ENTREGA';
export const ACTUALIZAR_NUMERO_TELEFONO = 'ACTUALIZAR_NUMERO_TELEFONO';
export const AGREGAR_NOTA_PRODUCTO = 'AGREGAR_NOTA_PRODUCTO';
export const ACTUALIZAR_PRODUCTO_ORDEN = 'ACTUALIZAR_PRODUCTO_ORDEN';

export const agregarProducto =
  (producto: ProductoNuevaOrden) => (dispatch: any) => {
    dispatch({
      type: AGREGAR_PRODUCTO,
      payload: producto,
    });
  };

export const actualizarCuentaTotal = () => (dispatch: any) => {
  dispatch({
    type: ACTUALIZAR_CUENTA_TOTAL,
  });
};

export const quitarUltimoProducto = () => (dispatch: any) => {
  dispatch({
    type: QUITAR_ULTIMO_PRODUCTO,
  });
};

export const seleccionarOpcion =
  (opcionMenuIndex: number, opcionIndex: number) => (dispatch: any) => {
    dispatch({
      type: SELECCIONAR_OPCION,
      payload: { opcionMenuIndex, opcionIndex },
    });
  };

export const deseleccionarOpcion =
  (opcionMenuIndex: number, opcionIndex: number) => (dispatch: any) => {
    dispatch({
      type: DESELECCIONAR_OPCION,
      payload: { opcionMenuIndex, opcionIndex },
    });
  };

export const eliminarProducto = (index: number) => (dispatch: any) => {
  dispatch({
    type: ELIMINAR_PRODUCTO,
    payload: index,
  });
};

export const editarCantidadProducto =
  (index: number, agregar: number) => (dispatch: any) => {
    dispatch({
      type: EDITAR_CANTIDAD_PRODUCTO,
      payload: { index, agregar },
    });
  };

export const editarProducto =
  (nuevoProducto: EditarProductoInterface) => (dispatch: any) => {
    dispatch({
      type: EDITAR_PRODUCTO,
      payload: nuevoProducto,
    });
  };

export const actualizarDatosFactura =
  (nit: string, razonSocial: string, correo: string | undefined) =>
  (dispatch: any) => {
    dispatch({
      type: ACTUALIZAR_DATOS_FACTURA,
      payload: { nit, razonSocial, correo },
    });
  };

export const actualizarMetodoDePago = (metodo: string) => (dispatch: any) => {
  dispatch({
    type: ACTUALIZAR_METODO_DE_PAGO,
    payload: metodo,
  });
};

export const actualizarNombreCliente = (nombre: string) => (dispatch: any) => {
  dispatch({
    type: ACTUALIZAR_NOMBRE_CLIENTE,
    payload: nombre,
  });
};

export const actualizarTipoEntrega = (entrega: ENTREGA) => (dispatch: any) => {
  dispatch({
    type: ACTUALIZAR_TIPO_ENTREGA,
    payload: entrega,
  });
};

export const actualizarNumeroTelefono =
  (numeroTelefono: string) => (dispatch: any) => {
    dispatch({
      type: ACTUALIZAR_NUMERO_TELEFONO,
      payload: numeroTelefono,
    });
  };

export const agregarNotaProducto = (nota: string) => (dispatch: any) => {
  dispatch({
    type: AGREGAR_NOTA_PRODUCTO,
    payload: { nota },
  });
};
// reinsertar producto editado al array para checkout
export const actualizarProductoOrden =
  (productModified: ProductoNuevaOrden, index: number) => (dispatch: any) => {
    dispatch({
      type: ACTUALIZAR_PRODUCTO_ORDEN,
      payload: { productModified, index },
    });
  };
