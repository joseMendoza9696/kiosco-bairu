// REACT
// import { useState } from 'react';
// UTILS
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { crearOrdenVariables } from '../utils/Functions';
import { CREAR_ORDEN } from '../api/graphql/mutations';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
// import printJS  'print-js';

export const PagoConfirmado = () => {
  // TODO: hacer un loading de crear orden
  // TODO: mandar a imprimir la comanda y luego mostrar la pagina de agradecimiento
  // TODO: si la orden ha sido enviada correctamente: mostrar pago confirmado
  // TODO: si la orden NO ha sido enviada correctamente: mensaje de error. "orden no procesada correctamente, comuniquese con el administrador". Colocar un boton para reiniciar la orden. Este boton ira a la bienvenida y recargara la pagina.

  const nuevaOrden = useSelector((state: RootState) => state.nuevaOrdenReducer);
  const [crearOrden, { loading: crearOrdenLoading }] = useMutation(
    CREAR_ORDEN,
    {
      onCompleted: (data) => {
        console.log('Orden creada:', data);

        // setTimeout(() => {
        //   setTimeout(() => {
        //     window.location.href = '/';
        //   }, 15000);
        // }, 0);

        // TODO: IMPRIMIR UNA COMANDA
        //  const { comandaId, nombreCliente } = data.KIOSCO_crearOrden;

        // printJS({
        //   printable: [{ Monto: `Bs.${nuevaOrden.cuentaTotal}` }],
        //   type: 'json',
        //   properties: ['Monto'],
        //   header: `
        //          <h1>Orden: #${comandaId} ${
        //            nombreCliente !== '' ? ` - ${nombreCliente}` : ''
        //          }</h1>
        //            <h2>Método de pago: ${nuevaOrden.metodoPago}</h2>
        //          `,
        // });
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
  const mandarOrden = () => {
    const odenVariables = crearOrdenVariables(nuevaOrden);
    // cuentaTotal: nuevaOrden.cuentaTotal;

    console.log('orden variables...', odenVariables);

    crearOrden({
      variables: {
        orden: odenVariables,
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
