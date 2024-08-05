import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';
interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  modal2?: boolean;
}

export const NotesProduct: React.FC<TextInputProps> = ({
  value,
  onChange,
  modal2,
}) => {
  const [note, setNote] = useState<string>(value || '');
  const [isVisible, setisVisible] = useState<boolean>(false);

  //external content
  useEffect(() => {
    if (value) {
      setNote(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setNote(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleAddNote = () => {
    if (onChange) {
      onChange(note);
    }
    setisVisible(false);
  };

  const closeNote = () => {
    // setNote(''); // si se apreta al fondo oscuro elimina el contenido de nota
    setisVisible(false);
  };

  return (
    <>
      <button
        className={modal2 ? '' : 'absolute md:-right-28 lg:-right-32'}
        onClick={() => setisVisible((e) => !e)}
      >
        <Icon icon="akar-icons:edit" className="md:text-7xl lg:text-8xl" />
      </button>
      {/* window */}
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* background */}
          <div
            className="absolute inset-0 bg-gray-800 opacity-50"
            onClick={closeNote}
          ></div>
          {/* content */}
          <div className="bg-base-100 fixed p-10 mb-40 rounded-3xl flex flex-col items-center gap-12 w-[70%]">
            <h3 className="font-bold md:text-4xl lg:text-5xl mt-10">
              Notas adicionales
            </h3>
            <input
              type="text"
              onChange={handleChange}
              value={note}
              placeholder="Nota..."
              className="input input-bordered w-full max-w-md border-4 p-9 md:text-3xl lg:text-4xl"
            />
            <button
              className="btn bg-primary text-4xl btn-lg btn-wide"
              onClick={handleAddNote}
            >
              Añadir
            </button>
          </div>
        </div>
      )}
    </>
  );
};
