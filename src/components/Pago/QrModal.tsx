interface IModal1 {
  closeModal: any;
}
export const QrModal = ({ closeModal }: IModal1) => {
  return (
    <div>
      <div className="modal-box h-[1800px] bg-[base-100] shadow-lg rounded-t-[90px]">
        <button
          className="btn btn-square w-24"
          onClick={() => {
            closeModal();
          }}
        >
          X
        </button>
        <img
          src="https://via.placeholder.com/150"
          alt="producto"
          className="w-1/2 h-1/2"
        />
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl">Escanea el código QR</p>
          <p className="text-3xl">para pagar</p>
        </div>
      </div>
    </div>
  );
};
