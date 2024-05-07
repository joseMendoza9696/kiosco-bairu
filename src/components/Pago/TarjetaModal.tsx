interface ITarjetaModal {
  closeModal: any;
}
export const TarjetaModal = ({ closeModal }: ITarjetaModal) => {
  return (
    <div>
      <div className="modal-box h-[1800px] bg-[base-100] shadow-lg rounded-t-[90px]">
        <button onClick={closeModal()}>X</button>
        <img
          src="https://via.placeholder.com/150"
          alt="producto"
          className="w-1/2 h-1/2"
        />
      </div>
    </div>
  );
};
