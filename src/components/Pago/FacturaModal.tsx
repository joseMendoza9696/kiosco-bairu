// @ts-expect-error need to fix this
export const FacturaModal = ({ closeModal }) => {
  return (
    <>
      <div className="modal-box h-[1800px] bg-white shadow-lg rounded-t-[90px] border-2">
        <div className="flex items-center flex-col">
          <div className="flex items-center flex-col py-[332px] ">
            <h1 className="text-[60px] font-bold ">¿Datos de factura?</h1>
            <form action="" className="">
              <div className="flex flex-col pt-[170px] w-full ">
                <label htmlFor="nombre" className="text-[24px] font-bold my-10">
                  NIT
                </label>
                <input
                  type="text"
                  name="nit"
                  id="nombre"
                  className="w-[600px] text-xl appearance-none bg-transparent border-b-2 border-black py-1 px-2 leading-tight focus:outline-none "
                />
                <label
                  htmlFor="razon"
                  className="text-[24px] font-bold mb-5 my-16"
                >
                  Razón Social
                </label>
                <input
                  type="text"
                  name="razon"
                  id="razon"
                  className="w-[600px] text-xl appearance-none bg-transparent border-b-2 border-black py-1 px-2 leading-tight focus:outline-none"
                />
              </div>
            </form>
          </div>
          <div className="text-center my-[127px] space-x-[100px]  flex justify-between mx-40 ">
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
