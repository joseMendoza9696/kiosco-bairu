import { EditarProductoInterface } from '../../interfaces/editarOrden.interface.ts';
import {
  EDITAR_PRODUCTO_ORDEN,
  SELECCIONAR_OPCION_EDITAR,
  DESELECCIONAR_OPCION_EDITAR,
  VACIAR_EDITAR_PRODUCTO_ORDEN,
  MODIFICAR_CANTIDAD_PRODUCTO,
} from '../actions/editarOrden.action.ts';

export const editarProductoState: EditarProductoInterface = {
  nuevaOrdenProductosIndex: 0,
  id: '',
  idSistema: '',
  nota: '',
  nombre: '',
  descripcion: '',
  cantidad: 0,
  precioOriginal: 0,
  precioMasOpciones: 0,
  precioTotal: 0,
  categoriaId: '',
  subcategoriaId: '',
  imagen: '',
  subcategoriaNombre: '',
  opcionesMenu: [],
};

const calcularPrecioTotal = (producto: EditarProductoInterface) => {
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

export function editarOrdenReducer(state = editarProductoState, action: any) {
  switch (action.type) {
    case EDITAR_PRODUCTO_ORDEN:
      return {
        ...state,
        nuevaOrdenProductosIndex: action.payload.productoIndex,
        id: action.payload.producto.id,
        idSistema: action.payload.producto.idSistema,
        nota: action.payload.producto.nota,
        nombre: action.payload.producto.nombre,
        descripcion: action.payload.producto.descripcion,
        cantidad: action.payload.producto.cantidad,
        precioOriginal: action.payload.producto.precioOriginal,
        precioMasOpciones: action.payload.producto.precioMasOpciones,
        precioTotal: action.payload.producto.precioTotal,
        imagen: action.payload.producto.imagen,
        categoriaId: action.payload.producto.categoriaId,
        subcategoriaId: action.payload.producto.subcategoriaId,
        subcategoriaNombre: action.payload.producto.subcategoriaNombre,
        opcionesMenu: action.payload.producto.opcionesMenu,
      };

    case MODIFICAR_CANTIDAD_PRODUCTO:
      // tener copia del producto
      const getProduct = state;
      // guardara la cantidad + el nuevo monto
      const newAmount = Math.max(
        getProduct.cantidad + action.payload.agregar,
        1,
      );
      //hacer reasignacion de cantidad al objeto
      getProduct.cantidad = newAmount;
      //obtener calculo del precio total desde getproduct
      const totalPrice = calcularPrecioTotal(getProduct);
      return {
        ...getProduct,
        precioTotal: totalPrice,
        cantidad: newAmount,
      };

    case SELECCIONAR_OPCION_EDITAR:
      const nuevoProducto = state;
      const { opcionMenuIndex, opcionIndex } = action.payload;
      const opcionesMenu = nuevoProducto.opcionesMenu[opcionMenuIndex];
      if (
        opcionesMenu.cantidadSeleccionada === opcionesMenu.cantidadSeleccion
      ) {
        // Reemplazar la última selección
        for (let i = opcionesMenu.opciones.length - 1; i >= 0; i--) {
          if (opcionesMenu.opciones[i].seleccionado) {
            opcionesMenu.opciones[i].seleccionado = false;
            break;
          }
        }
      } else {
        // incrementar cantidad seleccionada
        opcionesMenu.cantidadSeleccionada++;
      }
      // actualizamos la opcion a seleccionado
      opcionesMenu.opciones[opcionIndex].seleccionado = true;
      // actualizamos el precio total
      nuevoProducto.precioTotal = calcularPrecioTotal(nuevoProducto);
      return {
        ...state,
        nuevaOrdenProductosIndex: nuevoProducto.nuevaOrdenProductosIndex,
        id: nuevoProducto.id,
        idSistema: nuevoProducto.idSistema,
        nombre: nuevoProducto.nombre,
        cantidad: nuevoProducto.cantidad,
        precioOriginal: nuevoProducto.precioOriginal,
        precioMasOpciones: nuevoProducto.precioMasOpciones,
        precioTotal: nuevoProducto.precioTotal,
        imagen: nuevoProducto.imagen,
        categoriaId: nuevoProducto.categoriaId,
        subcategoriaId: nuevoProducto.subcategoriaId,
        subcategoriaNombre: nuevoProducto.subcategoriaNombre,
        opcionesMenu: nuevoProducto.opcionesMenu,
      };

    case DESELECCIONAR_OPCION_EDITAR:
      const nuevoProducto2 = state;
      // actualizamos la opcion a seleccionado
      nuevoProducto2.opcionesMenu[action.payload.opcionMenuIndex].opciones[
        action.payload.opcionIndex
      ].seleccionado = false;
      // actualizamos el precio total
      nuevoProducto2.precioTotal = calcularPrecioTotal(nuevoProducto2);
      // actualizamos la cantidad seleccionada
      nuevoProducto2.opcionesMenu[action.payload.opcionMenuIndex]
        .cantidadSeleccionada--;
      return {
        ...state,
        nuevaOrdenProductosIndex: nuevoProducto2.nuevaOrdenProductosIndex,
        id: nuevoProducto2.id,
        idSistema: nuevoProducto2.idSistema,
        nombre: nuevoProducto2.nombre,
        cantidad: nuevoProducto2.cantidad,
        precioOriginal: nuevoProducto2.precioOriginal,
        precioMasOpciones: nuevoProducto2.precioMasOpciones,
        precioTotal: nuevoProducto2.precioTotal,
        imagen: nuevoProducto2.imagen,
        categoriaId: nuevoProducto2.categoriaId,
        subcategoriaId: nuevoProducto2.subcategoriaId,
        subcategoriaNombre: nuevoProducto2.subcategoriaNombre,
        opcionesMenu: nuevoProducto2.opcionesMenu,
      };

    case VACIAR_EDITAR_PRODUCTO_ORDEN:
      return {
        ...editarProductoState,
      };

    default:
      return state;
  }
}
