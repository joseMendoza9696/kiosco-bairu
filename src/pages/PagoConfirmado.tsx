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
import printJS from 'print-js';
import { Link } from 'react-router-dom';

export const PagoConfirmado = () => {
  // TODO: si la orden ha sido enviada correctamente: mostrar pago confirmado, si la orden esta cargando mostrar un loading
  // CHECK
  // TODO: si la orden NO ha sido enviada correctamente: mensaje de error. "orden no procesada correctamente, comuniquese con el administrador". Colocar un boton para reiniciar la orden. Este boton ira a la bienvenida y recargara la pagina.
  // CHECK

  const nuevaOrden = useSelector((state: RootState) => state.nuevaOrdenReducer);
  const [crearOrden, { loading: crearOrdenLoading, error: crearOrdenError }] =
    useMutation(CREAR_ORDEN, {
      onCompleted: (data) => {
        console.log('Orden creada:', data);

        setTimeout(() => {
          abrirPaginaAgradecimiento(comandaId);
          setTimeout(() => {
            cerrarPagina();

            window.location.href = '/';
          }, 15000);
        }, 0);

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
        console.log('error', error);
      },
    });
  let nuevaVentana: any = null;
  const abrirPaginaAgradecimiento = (comandaId: any) => {
    const url = `/agradecimiento/?comandaId=${comandaId}`;
    nuevaVentana = window.open(url, '_blank');
  };

  const cerrarPagina = () => {
    nuevaVentana.close();
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
  useEffect(() => {
    mandarOrden();
  }, []);
  if (crearOrdenLoading) {
    return (
      <div className=" w-full h-[1919px] flex items-center flex-col py-80">
        <div className="text-[50px] text-center font-bold">Cargando...</div>
        <Icon icon="svg-spinners:blocks-wave" className=" text-[200px]" />
      </div>
    );
  }
  if (crearOrdenError) {
    return (
      <div className=" w-full h-[1919px] flex items-center flex-col py-80">
        <Icon
          icon="icon-park-solid:close-one"
          className="text-red-500 text-[200px]"
        />
        <div className="text-[50px] text-center font-bold">
          Error al procesar la orden. Comuníquese con el administrador y
          reinicie la orden.
        </div>
        <button className="btn btn-gosth w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16">
          <Link
            to="/"
            className="w-full h-full flex items-center justify-center"
          >
            Reiniciar Orden
          </Link>
        </button>
      </div>
    );
  }

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
