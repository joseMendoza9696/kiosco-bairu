import { useDispatch } from 'react-redux';
import { actualizarDatosFactura } from '../../redux/actions/nuevaOrden.action';
import { useState } from 'react';

export const FacturaModal = ({ closeModal }: { closeModal: () => void }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const seguirConDatos = () => {
    const nit = (document.getElementById('nombre') as HTMLInputElement)?.value;
    const razon = (document.getElementById('razon') as HTMLInputElement)?.value;
    if (!nit || !razon) {
      setError('NIT y Razón Social son obligatorios');
      return;
    }
    // @ts-expect-error need to fix this
    dispatch(actualizarDatosFactura(nit, razon, undefined));
    closeModal();
  };

  const seguirSinDatos = () => {
    // @ts-expect-error need to fix this
    dispatch(actualizarDatosFactura('0', '0', undefined));
    closeModal();
  };

  return (
    <>
      <div className="modal-box flex flex-col  items-center dark:bg-white bg-base-100 rounded-t-[5rem] md:h-[93%] md:pt-[20%] md:gap-48 lg:gap-56 ">
        <h1 className="font-bold md:text-4xl lg:text-5xl">
          ¿Necesitas Factura?
        </h1>
        <form className="w-[60%]">
          <label
            htmlFor="nombre"
            className="font-bold flex flex-col md:text-2xl lg:text-3xl md:mb-[5%] md:gap-5 "
          >
            NIT
            <input
              className="appearance-none bg-transparent border-b-2 border-black leading-tight focus:outline-none md:font-normal "
              type="text"
              name="nit"
              id="nombre"
              autoComplete="off"
            />
            {error && (
              <p className="text-red-500 mt-2 md:text-xl lg:text-2xl">
                {error}
              </p>
            )}
          </label>
          <label
            htmlFor="razon"
            className="font-bold flex flex-col md:text-2xl lg:text-3xl md:gap-5 "
          >
            Razón Social
            <input
              className="appearance-none bg-transparent border-b-2 border-black leading-tight focus:outline-none md:font-normal "
              type="text"
              name="razon"
              id="razon"
              autoComplete="off"
            />
            {error && (
              <p className="text-red-500 mt-2 md:text-xl lg:text-2xl">
                {error}
              </p>
            )}
          </label>
        </form>
        <div className="flex items-center md:gap-20 ">
          <button
            className="btn rounded-[1em] box-content h-max md:py-[2em] md:w-[8em] md:text-2xl lg:text-4xl "
            onClick={seguirSinDatos}
          >
            Seguir sin datos
          </button>
          <button
            className="btn btn-primary rounded-[1em] box-content h-max md:py-[2.35em] md:w-[8em] md:text-2xl lg:text-4xl "
            onClick={seguirConDatos}
          >
            Seguir
          </button>
        </div>
      </div>
    </>
  );
};
