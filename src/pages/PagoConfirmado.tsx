// REACT
// import { useState } from 'react';
// UTILS
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { crearOrdenVariables } from '../utils/Functions';
import { CREAR_ORDEN } from '../api/graphql/mutations';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import printJS from 'print-js';

export const PagoConfirmado = () => {
  // TODO: mandar a imprimir la comanda y luego mostrar la pagina de agradecimiento
  // check
  // TODO: si la orden ha sido enviada correctamente: mostrar pago confirmado
  // check
  // TODO: si la orden NO ha sido enviada correctamente: mensaje de error. "orden no procesada correctamente, comuniquese con el administrador". Colocar un boton para reiniciar la orden. Este boton ira a la bienvenida y recargara la pagina.
  // check

  const [error, setError] = useState(false);

  const nuevaOrden = useSelector((state: RootState) => state.nuevaOrdenReducer);
  const [crearOrden] = useMutation(CREAR_ORDEN, {
    onCompleted: (data) => {
      console.log('Orden creada:', data);

      setTimeout(() => {
        abrirPaginaAgradecimiento(comandaId);
        setTimeout(() => {
          cerrarPagina();

          window.location.href = '/';
        }, 15000);
      }, 0);

      // TODO: IMPRIMIR UNA COMANDA
      const { comandaId, nombreCliente } = data.KIOSCO_crearOrden;

      printJS({
        printable: [{ Monto: `Bs.${nuevaOrden.cuentaTotal}` }],
        type: 'json',
        properties: ['Monto'],
        header: `
                  <h1>Orden: #${comandaId} ${
                    nombreCliente !== '' ? ` - ${nombreCliente}` : ''
                  }</h1>
                    <h2>Método de pago: ${nuevaOrden.metodoPago}</h2>
                  `,
      });
    },
    onError: (error) => {
      console.log(error);
      setError(true);
    },
  });

  const abrirPaginaAgradecimiento = (comandaId: any) => {
    const url = `/agradecimiento/?comandaId=${comandaId}`;
    window.open(url, '_blank');
  };

  const cerrarPagina = () => {
    window.close();
  };

  const mandarOrden = () => {
    const ordenVariables = crearOrdenVariables(nuevaOrden);
    // cuentaTotal: nuevaOrden.cuentaTotal;

    console.log('orden variables...', ordenVariables);

    crearOrden({
      variables: {
        orden: ordenVariables,
        fecha: new Date().toISOString(),
      },
    }).then(
      () => {
        console.log('Orden enviada');
      },
      (error) => {
        console.log(error);
      },
    );
  };
  if (error) {
    return (
      <div className="text-[0px] text-center font-bold">
        <Icon
          icon="icon-park-solid:close-one"
          className="text-red-500 text-[200px]"
        />
        Error al procesar la orden. Comuníquese con el administrador y reinicie
        la orden.
        <button>Reiniciar Orden</button>
      </div>
    );
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    mandarOrden();
  }, []);
  return (
    <>
      <div className=" w-full h-[1919px] flex items-center flex-col py-80">
        <Icon
          icon="lets-icons:check-fill"
          className="text-green-500 text-[200px]"
        />
        <div className="text-[100px] text-center font-bold">
          Pago Confirmado
        </div>
      </div>
    </>
  );
};
