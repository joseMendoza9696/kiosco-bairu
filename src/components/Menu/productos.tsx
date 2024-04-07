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
  console.log(productos);
  return (
    <div className="productos-container">
      {productos.map((producto) => (
        <div key={producto.id} className="producto-card">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="producto-imagen"
          />
          <div className="producto-info">
            <h3 className="producto-nombre">{producto.nombre}</h3>
            <p className="producto-precio">Bs. {producto.precio}</p>
            <p className="producto-descripcion">{producto.descripcion}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Productos;
