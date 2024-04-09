import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Productos = () => {
  const categoriaSeleccionada = useSelector(
    (state: RootState) => state.menuSeleccionReducer.categoriaSeleccionada,
  );
  const productos = useSelector(
    (state: RootState) =>
      state.menuReducer.categorias[categoriaSeleccionada].subcategorias[0]
        .productos,
  );
  // TODO:

  return (
    <div className="flex flex-wrap mx-[64px]">
      {productos.map((producto) => (
        <div
          key={producto.id}
          className="flex flex-col mr-[32px] py-8 rounded-md shadow-md  "
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
