import { useDispatch } from 'react-redux';
import { actualizarDatosFactura } from '../../redux/actions/nuevaOrden.action';

export const FacturaModal = ({ closeModal }: { closeModal: () => void }) => {
  const dispatch = useDispatch();

  const seguirConDatos = () => {
    const nit = (document.getElementById('nombre') as HTMLInputElement)?.value;
    const razon = (document.getElementById('razon') as HTMLInputElement)?.value;
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
      <div className="modal-box h-[1800px] dark:bg-white bg-[base-100] shadow-lg rounded-t-[90px] border-4">
        <div className="flex items-center flex-col">
          <div className="flex items-center flex-col py-[300px] ">
            <h1 className="text-[60px] font-bold ">¿Necesitas Factura?</h1>
            <form action="">
              <div className="flex flex-col pt-[170px] w-full ">
                <label htmlFor="nombre" className="text-[30px] font-bold my-10">
                  NIT
                </label>
                <input
                  type="text"
                  name="nit"
                  id="nombre"
                  className="w-[600px] text-[40px] appearance-none bg-transparent border-b-2 border-black py-1 px-2 leading-tight focus:outline-none "
                  autoComplete="off"
                />
                <label
                  htmlFor="razon"
                  className="text-[30px] font-bold mb-5 my-16"
                >
                  Razón Social
                </label>
                <input
                  type="text"
                  name="razon"
                  id="razon"
                  className="w-[600px] text-[40px]  appearance-none bg-transparent border-b-2 border-black py-1 px-2 leading-tight focus:outline-none"
                  autoComplete="off"
                />
              </div>
            </form>
          </div>
          <div className="text-center my-[127px] space-x-[100px]  flex justify-between mx-40 ">
            <button
              className="btn btn-gosth w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16"
              onClick={seguirSinDatos}
            >
              Seguir sin datos
            </button>
            <button
              className="btn btn-primary w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16"
              onClick={seguirConDatos}
            >
              Seguir
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
