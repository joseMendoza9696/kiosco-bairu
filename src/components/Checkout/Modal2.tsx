import { Icon } from '@iconify/react/dist/iconify.js';
import { NotesProduct } from '../Menu/Productos/NotesProduct';

export const Modal2 = () => {
  // TODO: poner el tipo de moneda en base a "moneda" del perfil activo -> del local storage
  return (
    <dialog id="checkout2" className="modal modal-bottom">
      <div className="modal-box bg-base-100 rounded-t-[5.625rem] h-[87%] px-24 pt-36">
        {/* button close modal */}
        <form
          method="dialog"
          className="absolute top-0 left-[calc(50%-5.375rem)]"
        >
          <button className="btn rounded-t-none rounded-b-3xl h-28 w-48">
            <Icon
              icon="material-symbols-light:close"
              width="3rem"
              height="3rem"
            />
          </button>
        </form>
        {/* product image */}
        <div className="flex justify-center mb-5">
          <img
            src="/Imagen.png"
            alt=""
            className="w-[30rem] h-[30rem] rounded-3xl object-cover"
          />
        </div>
        {/* name product and notes */}
        <div className="flex gap-6 justify-center">
          <h2 className="font-bold text-6xl text-center">Producto 1</h2>
          <NotesProduct.Modal2></NotesProduct.Modal2>
        </div>
        {/* description */}
        <p className="py-4 text-3xl text-center">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint.
        </p>
        {/* price */}
        <span className="block text-center text-5xl font-bold mb-5">
          Bs. 23,00
        </span>
        {/* component steps */}
        <ul className="steps bg-[#F2F2F2] p-10 w-full rounded-3xl mb-5">
          <li className="step step-primary"></li>
          <li className="step"></li>
          <li className="step"></li>
          <li className="step"></li>
        </ul>
        <div>
          {/* OPTIONS PRODUCT */}
          <div>
            {/*  PRODUCT ITEMS */}
            <button
              // border-4 border-primary
              className={`flex flex-col h-[231px] w-[200px] rounded-md shadow-lg relative overflow-hidden`}
            >
              <img
                src={`/Imagen.png`}
                alt="jksdfa"
                className="w-full h-[167px] object-cover"
              />
              <div className="p-2">
                <h2 className="text-lg font-semibold text-left capitalize">{`aguacate`}</h2>
                <p className="text-left font-semibold text-lg">
                  + {`MXN`} {`56.00`}
                </p>
              </div>
              {true && (
                <div className="absolute top-0 right-0 mt-2 mr-2">
                  <Icon
                    icon="ei:check"
                    className="text-primary w-[45px] h-[45px]"
                  />
                </div>
              )}
            </button>
          </div>
        </div>
        <div className="bg-emerald-400 absolute bottom-6">
          <button className="btn btn-lg">Cancelar</button>
          <button className="btn btn-lg">
            <Icon
              width="3rem"
              height="3rem"
              icon="icomoon-free:minus"
              className=""
            />
          </button>
          <span className="text-4xl">1</span>
          <button className="btn btn-lg">
            <Icon
              width="3rem"
              height="3rem"
              icon="icomoon-free:plus"
              className=""
            />
          </button>
          <button className="btn btn-lg">Seguir</button>
        </div>
      </div>
    </dialog>
  );
};
