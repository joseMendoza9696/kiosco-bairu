// REACT
// import { useState } from 'react';
// UTILS
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  crearOrdenVariables,
  facturaCheck,
  imprimir,
} from '../utils/Functions';
import { CREAR_ORDEN, FACTURAR_ORDEN } from '../api/graphql/mutations';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PagoConfirmado = () => {
  const navigate = useNavigate();
  const nuevaOrden = useSelector((state: RootState) => state.nuevaOrdenReducer);

  const [comandaNum, setComandaNum] = useState<string>('0');

  // GRAPHQL FUNCTIONS
  const [crearOrden, { loading: crearOrdenLoading, error: crearOrdenError }] =
    useMutation(CREAR_ORDEN, {
      onCompleted: (data) => {
        // console.log('Orden creada:', data);

        const { comandaId, id, ticketPdf } = data.KIOSCO_crearOrden;
        setComandaNum(comandaId);
        abrirPaginaAgradecimiento(comandaId);
        setTimeout(() => {
          cerrarPagina();
          window.location.href = '/';
        }, 15000);

        if (ticketPdf !== null) {
          imprimir(
            comandaId,
            ticketPdf,
            nuevaOrden.metodoPago,
            nuevaOrden.cuentaTotal,
            nuevaOrden.nombreCliente,
          ).then();
        }

        facturar(nuevaOrden.metodoPago, id, comandaId, ticketPdf).then();
      },
      onError: (error) => {
        console.log('error', error);
      },
    });

  const [facturarOrden] = useMutation(FACTURAR_ORDEN, {
    onCompleted: async (data) => {
      // console.log('factura...', data);
      const { facturaPdf } = data.KIOSCO_facturarOrden;
      imprimir(
        '0',
        facturaPdf,
        nuevaOrden.metodoPago,
        nuevaOrden.cuentaTotal,
        nuevaOrden.nombreCliente,
      ).then();
    },
    onError: async (error) => {
      console.log('ERROR factura...', error);
      imprimir(
        comandaNum,
        'S/N',
        nuevaOrden.metodoPago,
        nuevaOrden.cuentaTotal,
        nuevaOrden.nombreCliente,
      ).then();
    },
  });

  // FUNCTIONS
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

    // console.log(ordenVariables);

    crearOrden({
      variables: {
        orden: ordenVariables,
        fecha: new Date().toISOString(),
      },
    }).then();
  };

  const facturar = async (
    metodoDePago: string,
    ordenId: string,
    comandaNumero: string,
    ticketPdf: string | null,
  ) => {
    const factura = facturaCheck();
    const fechaHoy: Date = new Date();
    if (metodoDePago === 'EFECTIVO' && ticketPdf === null) {
      // imprimir la orden
      imprimir(
        comandaNumero,
        'S/N',
        metodoDePago,
        nuevaOrden.cuentaTotal,
        nuevaOrden.nombreCliente,
      ).then();
    } else {
      if (factura) {
        // facturamos la orden
        facturarOrden({
          variables: {
            ordenFacturaInfo: {
              ordenId: ordenId,
              correoElectronicoComprador:
                nuevaOrden.correoElectronico === ''
                  ? '--'
                  : nuevaOrden.correoElectronico,
              descuentos: 0,
              nit: nuevaOrden.nit,
              razonSocial: nuevaOrden.razonSocial,
              fecha: `${fechaHoy.getFullYear()}-${
                fechaHoy.getMonth() + 1
              }-${fechaHoy.getDate()}`,
            },
          },
        }).then();
      }
    }
  };

  useEffect(() => {
    mandarOrden();
  }, []);
  if (crearOrdenLoading) {
    return (
      <div className="w-screen h-screen flex flex-col items-center md:pt-[30%] md:gap-16">
        <div className="md:text-5xl lg:text-7xl text-center font-bold">
          Cargando...
        </div>
        <Icon
          icon="svg-spinners:blocks-wave"
          className="md:h-[15%] lg:h-[20%] md:w-max"
        />
      </div>
    );
  }
  if (crearOrdenError) {
    return (
      <div className="flex flex-col items-center md:gap-7 lg:gap-16 md:pt-14">
        <Icon
          icon="icon-park-solid:close-one"
          className="text-red-500 md:h-[20%]  md:w-[20%] "
        />

        <div className="md:text-3xl lg:text-6xl text-center font-bold ">
          Error al procesar la orden. Comuníquese con el administrador y
          reinicie la orden.
        </div>
        <button
          className="box-content btn btn-secondary md:text-3xl lg:text-4xl font-bold rounded-xl md:p-[0.5em] w-fit"
          onClick={() => {
            navigate('/', { replace: true });
            window.location.reload();
          }}
        >
          Reiniciar pedido
        </button>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <Icon
        icon="lets-icons:check-fill"
        className="text-green-500 md:h-[30%] md:w-[30%] "
      />
      <h1 className="md:text-8xl lg:text-9xl text-center font-bold">
        Pago Confirmado
      </h1>
    </div>
  );
};
