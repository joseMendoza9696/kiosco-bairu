import { useDispatch } from 'react-redux';
import {
  actualizarNombreCliente,
  actualizarNumeroTelefono,
} from '../../redux/actions/nuevaOrden.action';
import 'react-phone-number-input/style.css';

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
  // TODO: el boton volver deberia cerrar el modal y volver al checkout.
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

  return (
    <>
      <div className="modal-box h-[1800px] dark:bg-white bg-[base-100] shadow-lg rounded-t-[90px] border-4">
        <div className="flex items-center flex-col">
          <div className="flex items-center flex-col py-[240px] ">
            <h1 className="text-[60px] font-bold ">Ingresa tus datos</h1>
            <form action="">
              <div className="flex flex-col pt-[160px] w-full ">
                {mostrarNombre && (
                  <>
                    <label
                      htmlFor="nombre"
                      className="text-[30px] font-bold my-10"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      id="nombre"
                      className="w-[600px] text-[40px] appearance-none bg-transparent border-b-2 border-black py-1 px-2 leading-tight focus:outline-none "
                      autoComplete="off"
                    />
                    {error && (
                      <p className="text-red-500 font-bold text-2xl mt-2">
                        {error}
                      </p>
                    )}
                  </>
                )}

                {mostrarTelefono && (
                  <>
                    <label
                      htmlFor="telefono"
                      className="text-[30px] font-bold mb-5 my-16"
                    >
                      Teléfono
                    </label>
                    <PhoneInput
                      international={false}
                      defaultCountry={paisCodigo}
                      value={value}
                      id="telefono"
                      // @ts-expect-error need to fix this
                      onChange={setValue}
                      className="text-[40px] appearance-none border-b-2 border-black py-1 px-2 leading-tight focus:outline-none"
                      autoComplete="off"
                    />
                  </>
                )}
              </div>
            </form>
          </div>
          <div className="text-center my-[127px] space-x-[100px]  flex justify-between mx-40 ">
            <button
              className="btn btn-gosth w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16"
              onClick={closeModal}
            >
              Volver{' '}
            </button>
            <button
              className="btn btn-primary w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16"
              onClick={actualizarDatosPersonales}
            >
              Seguir
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
