import Head from "next/head";
import {Compras} from './frontend/index.js'
import Login from "../src/components/LoginComp/index"
import CatalogoProductos1 from './frontend/catalogoProductos'

export default function Home() {
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

      <div>
        <Login/>
      </div>
    </>
  );
}
