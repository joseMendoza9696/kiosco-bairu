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

        const { comandaId, id } = data.KIOSCO_crearOrden;
        setComandaNum(comandaId);
        abrirPaginaAgradecimiento(comandaId);
        setTimeout(() => {
          cerrarPagina();
          window.location.href = '/';
        }, 15000);

        facturar(nuevaOrden.metodoPago, id, comandaId).then();
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
  ) => {
    const factura = facturaCheck();
    const fechaHoy: Date = new Date();
    if (metodoDePago === 'EFECTIVO') {
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
      <div className=" w-full h-[1919px] flex items-center flex-col py-80">
        <div className="text-[50px] text-center font-bold">Cargando...</div>
        <Icon icon="svg-spinners:blocks-wave" className=" text-[200px]" />
      </div>
    );
  }
  if (crearOrdenError) {
    return (
      <>
        <div className=" w-full h-[1919px] flex items-center flex-col py-80  ">
          <Icon
            icon="icon-park-solid:close-one"
            className="text-red-500 text-[100px]"
          />

          <div className="text-[30px] text-center font-bold ">
            Error al procesar la orden. Comuníquese con el administrador y
            reinicie la orden.
          </div>
        </div>
        <button
          className="btn btn-secondary ml-auto text-4xl font-bold rounded-[10px] mb-8"
          onClick={() => {
            navigate('/', { replace: true });
            window.location.reload();
          }}
        >
          Reiniciar pedido{' '}
        </button>
      </>
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
