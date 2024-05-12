// @ts-expect-error need to fix this
export const FacturaModal = ({ closeModal }) => {
  console.log(closeModal);

  return (
    <>
      <div className="modal-box h-[1800px] bg-white shadow-lg rounded-t-[90px] border-2 ">
        <div className="flex items-center flex-col  ">
          <div className="flex items-center flex-col pt-[132px] ">
            <h1 className="text-[60px] font-bold ">¿Datos de factura?</h1>
            <form action="">
              <div className="mb-4">
                <label htmlFor="nombre" className="text-xl">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  className="input input-bordered w-[300px] h-[50px] text-xl"
                />
              </div>
            </form>
          </div>
          <div className="text-center my-[127px] space-x-[100px] ">
            <button
              className="btn btn-gosth w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16"
              onClick={closeModal}
            >
              Seguir sin datos
            </button>
            <button className="btn btn-primary w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16">
              Seguir
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
