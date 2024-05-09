import {
  NuevaOrdenInterface,
  OpcionMenuOrden,
  OpcionOrden,
  OrdenInput,
  ProductoOrden,
} from '../interfaces/nuevaOrden.interface.ts';

export const crearOrdenVariables = (nuevaOrden: NuevaOrdenInterface) => {
  const productos: ProductoOrden[] = [];
  nuevaOrden.productos.forEach((prod) => {
    if (prod.opcionesMenu !== undefined) {
      const opcionesMenu: OpcionMenuOrden[] = [];
      prod.opcionesMenu.forEach((opMen) => {
        const opciones: OpcionOrden[] = [];
        opMen.opciones.forEach((op) => {
          if (op.seleccionado) {
            opciones.push({
              id: op.id,
              idSistema: op.idSistema,
              nombre: op.nombre,
              precioUnitario: op.precio,
            });
          }
        });
        opcionesMenu.push({
          id: opMen.id,
          idSistema: opMen.idSistema,
          nombre: opMen.nombre,
          opcionesSeleccionadas: opciones,
        });
      });
      productos.push({
        id: prod.id,
        idSistema: prod.idSistema,
        nombre: prod.nombre,
        cantidad: prod.cantidad,
        precioUnitario: prod.precioOriginal,
        opcionesMenuSeleccionados: opcionesMenu,
      });
    }
  });
  const nuevasVariables: OrdenInput = {
    cuentaTotal: nuevaOrden.cuentaTotal,
    tipoDeOrden: nuevaOrden.tipoEntrega,
    metodoDePago: nuevaOrden.metodoPago,
    telefono: nuevaOrden.numeroTelefono,
    nombre: nuevaOrden.nombreCliente,
    menu: {
      productosSeleccionados: productos,
    },
    nit: nuevaOrden.nit,
    razonSocial: nuevaOrden.razonSocial,
  };

  return nuevasVariables;
};
