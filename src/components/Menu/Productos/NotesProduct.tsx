import { Icon } from '@iconify/react/dist/iconify.js';
import { ReactNode, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
type Props = {
  children?: ReactNode;
  getNote?: Dispatch<SetStateAction<string>>;
};
export const NotesProduct = ({ children, getNote }: Props) => {
  const [note, setNote] = useState<string>('');

  return (
    <>
      <button
        className="absolute md:-right-28 lg:-right-32"
        onClick={() =>
          (
            document.getElementById('my_modal_notes') as HTMLDialogElement
          ).showModal()
        }
      >
        <Icon icon="akar-icons:edit" className="md:text-7xl lg:text-8xl" />
        {children}
      </button>
      {/* window */}
      <dialog id="my_modal_notes" className="modal">
        <div className="modal-box  rounded-3xl flex flex-col items-center gap-12 w-[70%]">
          <h3 className="font-bold md:text-4xl lg:text-5xl mt-10">
            Notas adicionales
          </h3>
          <input
            type="text"
            onChange={(e) => setNote(e.target.value)}
            value={note}
            placeholder="Nota..."
            className="input input-bordered w-full max-w-md border-4 p-9 md:text-3xl lg:text-4xl"
          />
          <button
            className="btn bg-primary text-4xl btn-lg btn-wide"
            onClick={() => {
              (
                document.getElementById('my_modal_notes') as HTMLDialogElement
              ).close();
              if (getNote) {
                getNote(note);
              }
            }}
          >
            Añadir
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setNote('')}></button>
        </form>
      </dialog>
    </>
  );
};
const Modal2 = ({ children, getNote }: Props) => {
  const [note, setNote] = useState<string>('');

  return (
    <>
      <button
        onClick={() =>
          (
            document.getElementById('my_modal_notes') as HTMLDialogElement
          ).showModal()
        }
      >
        <Icon icon="akar-icons:edit" className="md:text-5xl lg:text-7xl" />
        {children}
      </button>
      {/* window */}
      <dialog id="my_modal_notes" className="modal">
        <div className="modal-box  rounded-3xl flex flex-col items-center gap-12 w-[70%]">
          <h3 className="font-bold md:text-4xl lg:text-5xl mt-10">
            Notas adicionales
          </h3>
          <input
            type="text"
            onChange={(e) => setNote(e.target.value)}
            value={note}
            placeholder="Nota..."
            className="input input-bordered w-full max-w-md border-4 p-9 md:text-3xl lg:text-4xl "
          />
          <button
            className="btn h-max bg-primary text-4xl btn-lg btn-wide"
            onClick={() => {
              (
                document.getElementById('my_modal_notes') as HTMLDialogElement
              ).close();
              if (getNote) {
                getNote(note);
              }
            }}
          >
            Añadir
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setNote('')}></button>
        </form>
      </dialog>
    </>
  );
};

NotesProduct.Modal2 = Modal2;
