interface Atributos {
  id: string;
  idSistema?: string;
  nombre: string;
  imagen: string;
  precio: number;
}

export enum SELECCION {
  MULTIPLE = 'MULTIPLE',
  UNICO = 'UNICO',
}

// MENU
type Opcion = Atributos;

export interface OpcionMenu
  extends Pick<Atributos, 'id' | 'nombre' | 'idSistema'> {
  seleccion: SELECCION;
  cantidadSeleccion: number;
  opciones: Opcion[];
  obligatorio: boolean | null;
}

export interface Producto extends Atributos {
  opcionesMenu: OpcionMenu[];
  descripcion: string;
}

interface Subcategoria extends Pick<Atributos, 'id' | 'nombre' | 'imagen'> {
  productos: Producto[];
}

interface Categoria extends Pick<Atributos, 'id' | 'nombre' | 'imagen'> {
  seleccionada?: boolean;
  subcategorias: Subcategoria[];
}

export interface MenuInterface {
  categorias: Categoria[];
}

// COMPONENTS-PROPS TYPES
export interface CategoriaProp {
  categorias: Categoria[];
}

export interface MenuProp {
  nextPage: string;
}

// MENU SELECCIONADO
export interface MenuSeleccionInterface {
  categoriaSeleccionada: number;
  subcategoriaSeleccionada: number;
  productoSeleccionado: number | null;
}
