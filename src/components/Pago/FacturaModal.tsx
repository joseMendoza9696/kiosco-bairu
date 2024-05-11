import { Icon } from '@iconify/react/dist/iconify.js';

export const FacturaModal = () => {
  return (
    <>
      <div className="modal-box h-[1800px] bg-[base-100] shadow-lg rounded-t-[90px] ">
        <div className="flex items-center flex-col  ">
          <button className="btn btn-square w-24 flex item">X</button>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <Icon icon="zondicons:receipt" className="text-[112px] mb-6" />
            <span className="text-[36px]">Factura</span>
          </div>
        </div>
      </div>
    </>
  );
};
