export const Modal1 = ({ productoSeleccionado, closeModal }) => {
  //
  return (
    <>
      {productoSeleccionado && (
        <div className="modal-box h-[1700px] bg-[base-100] shadow-lg">
          <button className="btn btn-square w-24" onClick={closeModal}>
            X
          </button>

          <img
            src={productoSeleccionado.imagen}
            alt={productoSeleccionado.nombre}
            className="w-[490px] h-[490px] rounded-[30px] object-cover mx-auto mt-[294px] "
          />
          <p className="font-bold text-center text-[65px] pt-[64px]">
            {productoSeleccionado.nombre}
          </p>
          <p className="text-center text-[45px] text-primary font-bold">
            Bs. {productoSeleccionado.precio}
          </p>

          <div className="flex justify-center  mt-4 mx-[130px] space-x-[70px]  items-center ">
            <button className="btn btn-ghost btn-active w-[156px] h-[93px] text-[90px] font-bold rounded-2xl">
              -
            </button>
            <span className="text-[40px] font-bold">1</span>
            <button className="btn pb-2 rounded-2xl btn-primary w-[156px] h-[93px] text-[90px] font-bold ">
              +
            </button>
          </div>

          <div className="text-center my-[127px] space-x-[100px] ">
            <button
              className="btn btn-gosth w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16"
              onClick={closeModal}
            >
              Volver
            </button>
            <button className="btn btn-primary w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16">
              Añadir
            </button>
          </div>
        </div>
      )}
    </>
  );
};
