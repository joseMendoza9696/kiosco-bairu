// interface IModal1 {
//   closeModal: any;
// }

import { Link } from 'react-router-dom';

// @ts-expect-error need to fix this
export const QrModal = ({ closeModal, cuentaTotal }) => {
  const abrirPaginaAgradecimiento = () => {
    window.open('/recibo', '_blank');
  };
  return (
    <>
      <div className="modal-box h-[1800px] bg-[base-100] shadow-lg rounded-t-[90px] ">
        <div className="flex items-center flex-col  ">
          <button
            className="btn btn-square w-24 flex item"
            onClick={() => {
              closeModal();
              abrirPaginaAgradecimiento();
            }}
          >
            X
          </button>
          <h1 className="text-[60px] font-bold pt-[160px]">
            Por favor, escanea este QR
          </h1>
          <h2 className="text-center text-primary font-bold text-[50px]  py-8">
            Total Bs. {cuentaTotal}
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center pt-[140px]">
          <img
            src="https://www.marketing-movil-sms.com/wp-content/uploads/qr-marketing-codigos-qr-altiria.png"
            alt="producto"
            className="w-1/2 h-1/2"
          />
        </div>
        <div className="text-center flex justify-center mx-40 pt-[200px]">
          <button className="btn btn-gosth w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16">
            <Link
              to="/checkout"
              className="w-full h-full flex items-center justify-center"
            >
              Volver
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};
