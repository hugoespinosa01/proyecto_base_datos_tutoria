import { useRouter } from 'next/router';
import Head from "next/head";
import  CatalogoProductos from '../../../src/components/ListaProductos/index';

//import { connection } from '../../backend/connection';
//import Layout from '@components/layouts/';
//import { FormCreacionProvider } from '@hooks/formCreacionContext';

/** @function
 * @name CatalogoProductos1
 * @description Pagina que contiene el componente de Consulta general de arrastre
 **/
export default function CatalogoProductos1 () {
  const router = useRouter();
  const data = router.query;

  return (
    <>
    <Head>
        <title>Proyecto de Tutoría Base de Datos</title>
        <meta name="description" content="Proyecto de tutoría del segundo parcial" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/primeicons/primeicons.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/primereact/resources/themes/lara-light-indigo/theme.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/primereact/resources/primereact.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/primeflex@3.2.1/primeflex.min.css"
        />
      </Head>

        <div className="text-base text-color surface-overlay border-1 border-solid surface-border appearance-none outline-none focus:border-primary w-full">
          <CatalogoProductos data={data}/>
        </div></>
    
  );
}
