interface Subcategorias {
  id: string;
  nombre: string;
  imagen: string;
}
export interface SubcategoriasProps {
  subcategorias: Subcategorias[];
}
export const Subcategorias: React.FC<SubcategoriasProps> = ({
  subcategorias,
}) => {
  return (
    <>
      <div role="tablist" className="tabs">
        {subcategorias.map((subcategoria: Subcategorias) => (
          <a role="tab" className="tab" key={subcategoria.id}>
            {subcategoria.nombre}
          </a>
        ))}
      </div>
    </>
  );
};
