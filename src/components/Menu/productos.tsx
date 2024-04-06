import React from 'react';

interface Producto {
  id: string;
  idSistema: string;
  nombre: string;
  imagen: string;
  precio: number;
  descripcion: string;
}
interface ProductosProps {
  productos: Producto[];
}

const Productos: React.FC<ProductosProps> = ({ productos }) => {
  return (
    <div className="flex flex-wrap mx-[64px]">
      {productos.map((producto) => (
        <div
          key={producto.id}
          className="flex flex-col mr-[32px] py-8 rounded-md shadow-md"
        >
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-[285px] h-[285px] rounded-xl object-cover"
          />
          <div className="ml-2">
            <h2 className="text-[20px] font-semibold text-left ">
              {producto.nombre}
            </h2>
            <p className="text-left text-semibold text-lg">
              Bs. {producto.precio}
            </p>
            <p className="text-left">{producto.descripcion}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Productos;
