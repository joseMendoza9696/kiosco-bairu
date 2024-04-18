import { ProductoNuevaOrden } from "./nuevaOrden.interface";

export interface EditarProductoInterface extends ProductoNuevaOrden {
  nuevaOrdenProductosIndex: number;
}
