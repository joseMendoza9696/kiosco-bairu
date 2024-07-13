import { Icon } from '@iconify/react/dist/iconify.js';
import { NotesProduct } from '../Menu/Productos/NotesProduct';

export const Modal2 = () => {
  // TODO: poner el tipo de moneda en base a "moneda" del perfil activo -> del local storage
  const options = Array.from({ length: 3 }, (_, i) => i);
  console.log(options);

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
            className="w-[25rem] h-[25rem] rounded-3xl object-cover"
          />
        </div>
        {/* name product and notes */}
        <div className="flex gap-6 justify-center">
          <h2 className="font-bold text-6xl text-center">Producto 1</h2>
          <NotesProduct.Modal2></NotesProduct.Modal2>
        </div>
        {/* description */}
        <p className="py-4 text-3xl text-center text-[#A6A6AA]">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint.
        </p>
        {/* price */}
        <span className="block text-center text-5xl font-bold mb-5">
          Bs. 23,00
        </span>
        {/* component steps */}
        <div className="bg-[#F2F2F2] p-8 rounded-3xl mb-5">
          <ul className="steps w-full mb-3">
            <li className={`step step-primary`} data-content={'✓'}></li>
            <li className={`step step-primary`} data-content={'✓'}></li>
            <li className={`step`} data-content={''}></li>
            <li className={`step`} data-content={''}></li>
          </ul>
          <p className="text-2xl font-semibold">
            Paso {`1`} {`temperatura`}:{' '}
            <span className="pl-8 text-primary">
              Seleccione al menos una opción.
            </span>
          </p>
        </div>
        <div>
          {/* OPTIONS PRODUCT */}
          <div className="grid grid-cols-4 justify-items-center gap-3 h-[520px] overflow-y-auto mb-2">
            {/*  PRODUCT ITEMS */}
            {options.map(() => (
              <button
                // border-4 border-primary
                className={`flex flex-col h-[231px] w-[200px] rounded-md shadow-lg relative overflow-hidden`}
              >
                <img
                  src={`/src/assets/imagepromo.png`}
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
            ))}
          </div>
        </div>
        {/* BUTTONS cancel minus number plus procedd */}
        <div className=" bottom-6 w-full flex justify-between items-center">
          {/* BACK, CANCEL */}
          <button className="btn text-5xl w-56 rounded-3xl h-28 font-semibold">{`Cancelar`}</button>
          {/* MINUS */}
          <button className="btn w-36 h-20 rounded-3xl">
            <Icon
              width="3rem"
              height="3rem"
              icon="icomoon-free:minus"
              className=""
            />
          </button>
          {/* AMOUNT */}
          <span className="text-5xl font-bold">{`10`}</span>
          {/* PLUS */}
          <button className="btn w-36 h-20 rounded-3xl text-white btn-primary">
            <Icon
              width="3rem"
              height="3rem"
              icon="icomoon-free:plus"
              className=""
            />
          </button>
          {/* ADD, CONTINUE */}
          <button className="btn text-5xl w-56 rounded-3xl h-28 text-white font-semibold btn-primary">{`Siguente`}</button>
        </div>
      </div>
    </dialog>
  );
};
