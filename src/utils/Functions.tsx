import {
  NuevaOrdenInterface,
  OpcionMenuOrden,
  OpcionOrden,
  OrdenInput,
  ProductoOrden,
} from '../interfaces/nuevaOrden.interface.ts';
import printJS from 'print-js';

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

export const facturaCheck = (): boolean => {
  let perfil: any = localStorage.getItem('Perfil');
  perfil = perfil !== null ? JSON.parse(perfil) : null;
  let factura: boolean = false;
  if (perfil !== null) {
    factura = perfil.screens.factura;
  }
  return factura;
};

export const imprimir = async (
  comandaNumero: string = '0',
  pdfUrl: string,
  metodoPago: string = 'EFECTIVO',
  montoPago: number,
  nombreCliente: string = '',
) => {
  // verificamos si hay factura
  if (pdfUrl === 'S/N') {
    // no existe la factura
    // imprimimos una comanda comun
    printJS({
      printable: [{ Monto: `Bs.${montoPago}` }],
      type: 'json',
      properties: ['Monto'],
      header: `
                <h1>Orden: #${comandaNumero} ${
                  nombreCliente !== '' ? ` - ${nombreCliente}` : ''
                }</h1>
                <h2>Método de pago: ${metodoPago}</h2>
              `,
    });
  } else {
    // hay factura
    // verificamos si la factura viene en url o base64
    if (pdfUrl.includes('data:application/pdf;base64,')) {
      // factura en base64
      printJS({
        printable: pdfUrl.slice(28),
        type: 'pdf',
        base64: true,
      });
    } else {
      // factura en URL
      printJS({
        printable: pdfUrl,
        type: 'pdf',
        showModal: false,
      });
    }
  }
};
