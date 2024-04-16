export const Modal2 = ({ productoSeleccionado, closeModal }) => {
  //
  return (
    <>
      {productoSeleccionado && (
        <div className="modal-box h-[1700px] bg-[base-100]  shadow-lg rounded-3xl">
          <button className="btn btn-square w-24" onClick={closeModal}>
            X
          </button>

          <img
            src={productoSeleccionado.imagen}
            alt={productoSeleccionado.nombre}
            className="w-[490px] h-[490px] rounded-[30px] object-cover mx-auto mt-[100px] "
          />
          <p className="font-bold text-center text-[65px] pt-[20px]">
            {productoSeleccionado.nombre}
          </p>
          <p className="text-center text-[45px] text-primary font-bold">
            Bs. {productoSeleccionado.precio}
          </p>

          {/* steps section */}

          <div className="mx-24 ">
            <div className="p-6  bg-gray-200  rounded-xl ">
              <div className="container mx-auto">
                <div>
                  <ul className="steps">
                    <li className="step step-primary" data-content="✓"></li>
                    <li className="step " data-content=""></li>
                    <li className="step " data-content=""></li>
                    <li className="step " data-content=""></li>
                  </ul>
                </div>
              </div>
              <p className="text-left pt-4 font-bold ">
                {' '}
                Seleccione una opcion{' '}
              </p>
            </div>
          </div>

          {/* card sections */}

          <div className="flex flex-wrap mx-8 py-8  gap-y-8 items-center justify-between ">
            <button className="flex flex-col mr-[32px] h-[231px] w-[200px] rounded-md shadow-md">
              <img
                src={productoSeleccionado.imagen}
                alt={productoSeleccionado.nombre}
                className="w-[200px] h-[167px] rounded-xl object-cover"
              />
              <div className="ml-2">
                <h2 className="text-[20px] font-semibold text-left ">
                  {productoSeleccionado.nombre}
                </h2>
                <p className="text-left text-semibold text-lg">
                  Bs. {productoSeleccionado.precio}
                </p>
              </div>
            </button>
            <button className="flex flex-col mr-[32px] h-[231px] w-[200px] rounded-md shadow-md">
              <img
                src={productoSeleccionado.imagen}
                alt={productoSeleccionado.nombre}
                className="w-[200px] h-[167px] rounded-xl object-cover"
              />
              <div className="ml-2">
                <h2 className="text-[20px] font-semibold text-left ">
                  {productoSeleccionado.nombre}
                </h2>
                <p className="text-left text-semibold text-lg">
                  Bs. {productoSeleccionado.precio}
                </p>
              </div>
            </button>
            <button className="flex flex-col mr-[32px] h-[231px] w-[200px] rounded-md shadow-md">
              <img
                src={productoSeleccionado.imagen}
                alt={productoSeleccionado.nombre}
                className="w-[200px] h-[167px] rounded-xl object-cover"
              />
              <div className="ml-2">
                <h2 className="text-[20px] font-semibold text-left ">
                  {productoSeleccionado.nombre}
                </h2>
                <p className="text-left text-semibold text-lg">
                  Bs. {productoSeleccionado.precio}
                </p>
              </div>
            </button>
            <button className="flex flex-col mr-[32px] h-[231px] w-[200px] rounded-md shadow-md">
              <img
                src={productoSeleccionado.imagen}
                alt={productoSeleccionado.nombre}
                className="w-[200px] h-[167px] rounded-xl object-cover"
              />
              <div className="ml-2">
                <h2 className="text-[20px] font-semibold text-left ">
                  {productoSeleccionado.nombre}
                </h2>
                <p className="text-left text-semibold text-lg">
                  Bs. {productoSeleccionado.precio}
                </p>
              </div>
            </button>
          </div>

          {/* button section  */}

          <div>
            <div className="flex justify-center  mt-4 mx-[130px] space-x-[20px]  items-center ">
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
                className="btn btn-gosth w-[211px] h-[122px] text-[30px] rounded-[20px] mb-16"
                onClick={closeModal}
              >
                Atrás
              </button>
              <button className="btn btn-primary w-[211px] h-[122px] text-[30px] rounded-[20px] mb-16">
                Añadir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
