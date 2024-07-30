import { useDispatch } from 'react-redux';
import {
  actualizarNombreCliente,
  actualizarNumeroTelefono,
} from '../../redux/actions/nuevaOrden.action';
import 'react-phone-number-input/style.css';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';

import { useState } from 'react';

export const DatosPersonalesModal = ({
  closeModal,
  mostrarNombre,
  mostrarTelefono,
}: {
  closeModal: () => void;
  mostrarNombre: boolean;
  mostrarTelefono: boolean;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const actualizarDatosPersonales = () => {
    const nombre = (document.getElementById('nombre') as HTMLInputElement)
      ?.value;
    const telefono = (document.getElementById('telefono') as HTMLInputElement)
      ?.value;

    if (!nombre) {
      setError('El nombre es obligatorio');
      return;
    }

    // @ts-expect-error need to fix this
    dispatch(actualizarNombreCliente(nombre));
    if (mostrarTelefono) {
      // @ts-expect-error need to fix this
      dispatch(actualizarNumeroTelefono(telefono));
    }
    closeModal();
  };
  const PerfilLocalStorage = JSON.parse(localStorage.getItem('Perfil') || '{}');
  const paisPerfil = PerfilLocalStorage?.pais;
  const paisCodigo = paisPerfil ? paisPerfil.split('-')[0] : null;

  const botonVolver = () => {
    navigate('/checkout', { replace: true });
    closeModal();
  };

  return (
    <div className="modal-box flex items-center flex-col rounded-t-[5.7rem] md:h-[90%] lg:h-[85%] md:pt-[10rem] md:gap-52 lg:gap-72">
      <h1 className="md:text-4xl lg:text-5xl font-bold ">Ingresa tus datos</h1>
      <form className="min-w-[70%]">
        {mostrarNombre && (
          <label
            htmlFor="nombre"
            className="md:text-2xl lg:text-4xl font-bold flex flex-col md:gap-3 md:mb-[4rem] "
          >
            Nombre
            <input
              className="bg-transparent border-b-2 border-black leading-tight focus:outline-none font-medium md:text-3xl lg:text-4xl "
              type="text"
              name="nombre"
              id="nombre"
              autoComplete="off"
            />
            {error && (
              <p className="text-red-500 font-bold md:text-2xl lg:text-3xl mt-2">
                {error}
              </p>
            )}
          </label>
        )}

        {mostrarTelefono && (
          <label
            htmlFor="telefono"
            className="md:text-2xl lg:text-4xl font-bold flex flex-col md:gap-3"
          >
            Teléfono
            <PhoneInput
              className="border-b-2 border-black leading-tight focus:outline-none font-medium md:text-3xl lg:text-4xl overflow-hidden"
              // @ts-expect-error need to fix this
              onChange={setValue}
              international={false}
              defaultCountry={paisCodigo}
              value={value}
              id="telefono"
              autoComplete="off"
            />
          </label>
        )}
      </form>
      <div className="flex md:gap-24 lg:gap-48">
        <button
          className="btn box-content rounded-2xl h-max md:text-2xl lg:text-4xl md:py-[2em] md:w-[7.5em] "
          onClick={botonVolver}
        >
          Volver
        </button>
        <button
          className="btn btn-primary box-content rounded-2xl h-max md:text-2xl lg:text-4xl md:py-[2em] md:w-[7.5em] "
          onClick={actualizarDatosPersonales}
        >
          Seguir
        </button>
      </div>
    </div>
  );
};
