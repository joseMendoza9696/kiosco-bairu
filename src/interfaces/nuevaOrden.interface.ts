export enum SELECCION {
  MULTIPLE = "MULTIPLE",
  UNICO = "UNICO",
}

export enum ENTREGA {
  LLEVAR = "LLEVAR",
  AQUI = "AQUI",
}

export interface Opcion {
  id: string;
  idSistema?: string;
  nombre: string;
  precio: number;
  imagen: string;
  seleccionado: boolean;
}

export interface OpcionMenuNuevaOrden {
  id: string;
  idSistema?: string;
  nombre: string;
  seleccion: SELECCION;
  cantidadSeleccion: number;
  cantidadSeleccionada: number;
  opciones: Opcion[];
  obligatorio: boolean | null;
}

export interface ProductoNuevaOrden {
  id: string;
  idSistema?: string;
  nombre: string;
  cantidad: number;
  precioOriginal: number;
  precioMasOpciones: number;
  precioTotal: number;
  imagen: string;
  categoriaId: string;
  subcategoriaId: string;
  subcategoriaNombre: string;
  opcionesMenu: OpcionMenuNuevaOrden[];
}

export interface NuevaOrdenInterface {
  cuentaTotal: number;
  tipoEntrega: ENTREGA;
  nombreCliente: string;
  numeroTelefono: string;
  metodoPago: string;
  nit: string;
  razonSocial: string;
  correoElectronico: string;
  productos: ProductoNuevaOrden[];
}

// VARIABLES DE CREAR ORDEN
export interface OpcionOrden {
  id: string;
  idSistema?: string;
  nombre: string;
  precioUnitario: number;
}

export interface OpcionMenuOrden {
  id: string;
  idSistema?: string;
  nombre: string;
  opcionesSeleccionadas: OpcionOrden[];
}

export interface ProductoOrden {
  id: string;
  idSistema?: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  opcionesMenuSeleccionados: OpcionMenuOrden[];
}
interface MenuOrden {
  productosSeleccionados: ProductoOrden[];
}

export interface OrdenInput {
  cuentaTotal: number;
  tipoDeOrden: string;
  metodoDePago: string;
  menu: MenuOrden;
  telefono?: string;
  nombre?: string;
  nit?: string;
  razonSocial?: string;
}
