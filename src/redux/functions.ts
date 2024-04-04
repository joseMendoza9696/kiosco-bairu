import { MenuInterface } from '../interfaces/menu.interface.ts';

export const actualizarCategoriaSeleccionada = (
  id: number,
  menu: MenuInterface
) => {
  const categorias = [];
  for (let i = 0; i < menu.categorias.length; i++) {
    const nuevaCategoria = {
      ...menu.categorias[i],
      seleccionada: i === id ? true : false,
    };
    categorias.push(nuevaCategoria);
  }
  return categorias;
};
