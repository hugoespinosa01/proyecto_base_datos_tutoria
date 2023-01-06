import { useRouter } from 'next/router';

import  CatalogoProductos from '../../../src/components/index';
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
   
        <div className="text-base text-color surface-overlay border-1 border-solid surface-border appearance-none outline-none focus:border-primary w-full">
          <CatalogoProductos/>
        </div>
    
  );
}
