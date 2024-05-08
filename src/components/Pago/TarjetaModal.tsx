import imagen from '../../../public/Imagen.png';
// @ts-expect-error need to fix this
export const TarjetaModal = ({ closeModal, cuentaTotal }) => {
  return (
    <>
      <div className="modal-box h-[1800px] bg-[base-100] shadow-lg rounded-t-[90px]">
        <div className="flex items-center flex-col  ">
          <button
            className="btn btn-square w-24 flex item"
            onClick={() => {
              closeModal();
            }}
          >
            X
          </button>
          <h1 className="text-[60px] font-bold pt-[160px]">
            Pase su tarjeta por el lector{' '}
          </h1>
          <h2 className="text-center text-primary font-bold text-[50px]  py-8">
            Total Bs. {cuentaTotal}
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center pt-[140px]">
          <img src={imagen} alt="producto" className="w-1/2 h-1/2" />
        </div>
      </div>
    </>
  );
};
