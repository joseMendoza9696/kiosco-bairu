import {
  ENTREGA,
  NuevaOrdenInterface,
  ProductoNuevaOrden,
} from '../../interfaces/nuevaOrden.interface.ts';
import {
  AGREGAR_PRODUCTO,
  QUITAR_ULTIMO_PRODUCTO,
  SELECCIONAR_OPCION,
  DESELECCIONAR_OPCION,
  ELIMINAR_PRODUCTO,
  ACTUALIZAR_CUENTA_TOTAL,
  EDITAR_CANTIDAD_PRODUCTO,
  EDITAR_PRODUCTO,
  ACTUALIZAR_DATOS_FACTURA,
  ACTUALIZAR_METODO_DE_PAGO,
  ACTUALIZAR_NOMBRE_CLIENTE,
  ACTUALIZAR_TIPO_ENTREGA,
  ACTUALIZAR_NUMERO_TELEFONO,
} from '../actions/nuevaOrden.action.ts';

export const initialNuevaOrdenState: NuevaOrdenInterface = {
  cuentaTotal: 0,
  tipoEntrega: ENTREGA.AQUI,
  nombreCliente: '',
  numeroTelefono: '',
  metodoPago: '',
  nit: '',
  razonSocial: '',
  correoElectronico: '',
  productos: [],
};

export function nuevaOrdenReducer(state = initialNuevaOrdenState, action: any) {
  switch (action.type) {
    case AGREGAR_PRODUCTO:
      const nuevosProductos = state.productos;
      nuevosProductos.push(action.payload);

      return {
        ...state,
        productos: nuevosProductos,
      };

    case ACTUALIZAR_CUENTA_TOTAL:
      const nuevaCuentaTotal1 = state.productos.reduce(
        (a, b) => a + b.precioTotal,
        0,
      );
      return { ...state, cuentaTotal: nuevaCuentaTotal1 };

    case QUITAR_ULTIMO_PRODUCTO:
      const nuevosProductos2 = state.productos;
      nuevosProductos2.splice(nuevosProductos2.length - 1, 1);
      return {
        ...state,
        productos: nuevosProductos2,
      };

    case SELECCIONAR_OPCION:
      const nuevosProductos3 = state.productos;
      const index = nuevosProductos3.length - 1;
      // seleccionamos la opcion del opcionMenu correspondiente
      nuevosProductos3[index].opcionesMenu[
        action.payload.opcionMenuIndex
      ].opciones[action.payload.opcionIndex].seleccionado = true;
      // // actualizamos el precio total
      nuevosProductos3[index].precioTotal = calcularPrecioTotal(
        nuevosProductos3[index],
      );
      // actualizamos la cantidad seleccionada
      nuevosProductos3[index].opcionesMenu[action.payload.opcionMenuIndex]
        .cantidadSeleccionada++;

      return { ...state, productos: nuevosProductos3 };

    case DESELECCIONAR_OPCION:
      const nuevosProductos7 = state.productos;
      const index1 = nuevosProductos7.length - 1;
      // seleccionamos la opcion del opcionMenu correspondiente
      nuevosProductos7[index1].opcionesMenu[
        action.payload.opcionMenuIndex
      ].opciones[action.payload.opcionIndex].seleccionado = false;
      // actualizamos el precio total
      nuevosProductos7[index1].precioTotal = calcularPrecioTotal(
        nuevosProductos7[index1],
      );
      // actualizamos la cantidad seleccionada
      nuevosProductos7[index1].opcionesMenu[action.payload.opcionMenuIndex]
        .cantidadSeleccionada--;

      return { ...state, productos: nuevosProductos7 };

    case ELIMINAR_PRODUCTO:
      const nuevosProductos4 = state.productos;
      let nuevaCuentaTotal4 = state.cuentaTotal;
      if (action.payload > -1) {
        nuevaCuentaTotal4 -= nuevosProductos4[action.payload].precioTotal;
        nuevosProductos4.splice(action.payload, 1);
      }
      return {
        ...state,
        productos: nuevosProductos4,
        cuentaTotal: nuevaCuentaTotal4,
      };

    case EDITAR_CANTIDAD_PRODUCTO:
      const nuevosProductos5 = state.productos;
      let nuevaCantidad =
        nuevosProductos5[action.payload.index].cantidad +
        action.payload.agregar;
      if (nuevaCantidad <= 0) {
        nuevaCantidad = nuevosProductos5[action.payload.index].cantidad;
      }
      // actualizamos la cantidad
      nuevosProductos5[action.payload.index].cantidad = nuevaCantidad;
      // actualizamos el precio total del producto
      nuevosProductos5[action.payload.index].precioTotal = calcularPrecioTotal(
        nuevosProductos5[action.payload.index],
      );

      return {
        ...state,
        productos: nuevosProductos5,
      };

    case EDITAR_PRODUCTO:
      const nuevosProductos6 = state.productos;
      nuevosProductos6[action.payload.nuevaOrdenProductosIndex] = {
        id: action.payload.id,
        idSistema: action.payload.idSistema,
        nombre: action.payload.nombre,
        descripcion: action.payload.producto.descripcion,
        cantidad: action.payload.cantidad,
        precioOriginal: action.payload.precioOriginal,
        precioMasOpciones: action.payload.precioMasOpciones,
        precioTotal: action.payload.precioTotal,
        categoriaId: action.payload.categoriaId,
        subcategoriaId: action.payload.subcategoriaId,
        imagen: action.payload.imagen,
        subcategoriaNombre: action.payload.subcategoriaNombre,
        opcionesMenu: action.payload.opcionesMenu,
      };
      return { ...state, productos: nuevosProductos6 };

    case ACTUALIZAR_DATOS_FACTURA:
      return {
        ...state,
        nit: action.payload.nit,
        razonSocial: action.payload.razonSocial,
        correoElectronico: action.payload.correo,
      };

    case ACTUALIZAR_METODO_DE_PAGO:
      return { ...state, metodoPago: action.payload };

    case ACTUALIZAR_NOMBRE_CLIENTE:
      console.log(action.payload);
      return { ...state, nombreCliente: action.payload };

    case ACTUALIZAR_TIPO_ENTREGA:
      return { ...state, tipoEntrega: action.payload };

    case ACTUALIZAR_NUMERO_TELEFONO:
      return { ...state, numeroTelefono: action.payload };

    default:
      return state;
  }
}

const calcularPrecioTotal = (producto: ProductoNuevaOrden) => {
  let precioOpcionesTotal = 0;
  producto.opcionesMenu.forEach((opMen) => {
    const prec = opMen.opciones.reduce((a, b) => {
      if (b.seleccionado) {
        return b.precio + a;
      }
      return a;
    }, 0);
    precioOpcionesTotal += prec;
  });
  return (precioOpcionesTotal + producto.precioOriginal) * producto.cantidad;
};
