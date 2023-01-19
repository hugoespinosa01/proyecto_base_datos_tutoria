import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { Chip } from "primereact/chip";
import { Tooltip } from "primereact/tooltip";
import { Fragment, useState } from "react";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import { useRef } from "react";
import { OverlayPanel } from 'primereact/overlaypanel';
import { DataTable } from "primereact/datatable";
//import './OverlayPanelDemo.css';
export const NavBar = () => {
  const router = useRouter();
  const op = useRef(null);
  let tipoEntidadSeleccionada;
  const [user, setUser]=useState("");
  useEffect(() => {
    if (sessionStorage.getItem('usuario') !== null || sessionStorage.getItem('usuario') !== undefined) {
      
      tipoEntidadSeleccionada=sessionStorage.getItem('usuario');
      
      setUser(tipoEntidadSeleccionada);
    }

    if (tipoEntidadSeleccionada === "Empresa") {
      console.log("EMPRESA");
      
     // setDisableCliente(true);
    } else if (tipoEntidadSeleccionada === "Cliente") {
    //  console.log("CLIENTE");
    } else {
      //console.log("SIN DATOS", tipoEntidadSeleccionada);
     // window.location.href = "http://localhost:3000";
    }
  }, [])
  console.log("tipoUser",tipoEntidadSeleccionada )
  
  const items = [
    {
      label: "Productos",
   className:"text-teal-50",
      icon: "pi pi-fw pi-box",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-plus",
          items: [
            {
              label: "Bookmark",
              icon: "pi pi-fw pi-bookmark",
            },
            {
              label: "Video",
              icon: "pi pi-fw pi-video",
            },
          ],
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-trash",
        },
        {
          separator: true,
        },
        {
          label: "Export",
          icon: "pi pi-fw pi-external-link",
        },
      ],
    },
    {
      visible:user==="Cliente"?false:true,
      label: "Clientes",
      icon: "pi pi-users",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-user-plus",
          command: () => {
            router.push( {
              pathname: '/frontend/cliente',
            //  query: { name:tipoEntidadSeleccionada?.name},
            },
            '../../frontend/cliente',
          );
          } 
          

        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-user-minus",
        },
        {
          label: "Search",
          icon: "pi pi-fw pi-users",
          items: [
            {
              label: "Filter",
              icon: "pi pi-fw pi-filter",
              items: [
                {
                  label: "Print",
                  icon: "pi pi-fw pi-print",
                },
              ],
            },
            {
              icon: "pi pi-fw pi-bars",
              label: "List",
            },
          ],
        },
      ],
    },
  ];

  //const start = <Chip label="Tienda en línea" icon="pi pi-shopping-bag" />;
  const start = <Fragment>
    <div className="p-fluid formgrid grid justify-content-center">
      <div className="field col-12 mt-2 mb-2 mr-4 ml-4">
        <h1>Tienda en línea</h1>
      </div>
    </div>
  </Fragment>;

  const end = (
    <Button
    visible={user==="Cliente"?true:false}
      icon="pi pi-shopping-cart"
      className="p-button-rounded p-button-secondary"
      tooltip="Carrito de compras"
      tooltipOptions={{ position: "left" }}
      onClick={(e) => op.current.toggle(e)}
    />
  );

  return (
    <div style={{backgroundColor: "#274C77", borderColor:"#274C77"}}>
      <Menubar
        model={items}
        start={start}
        end={end}
        className="p-4"
        style={{backgroundColor: "#274C77", borderColor:"#274C77", color:"whitesmoke"}}
      />

<OverlayPanel
          ref={op}
          breakpoints={{ '1000px': '75vw', '640px': '100vw' }}
          showCloseIcon
          id="overlay_panel"
          style={{ width: '450px' }}
          className="overlaypanel-demo"
        >
          <h3>Carrito de Compras &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h3>
          
          <DataTable
          //  // value={data}
          //   dataKey="id"
          //   responsiveLayout="scroll"
          //   paginator
          //   rows={5}
          //   filters={filtroBusqueda}
          //   globalFilterFields={['codigoEstadoSituacionActual']}
            emptyMessage="El carrito se encuentra vacío"
           >
             {/* <Column field="nemonicoProyecto" header="CUP" />
             <Column field="nombreProyecto" header=" Nombre del proyecto"></Column>
             <Column field="codigoEstadoSituacionActual" header="Tipo de Solicitud" body={tipoBodyTemplate}></Column>
             <Column field="estado" header="Estado" body={estadoBodyTemplate}></Column>
             <Column field="observacion" header="Observaciones"></Column>
             <Column header="Consultas" body={consulta}></Column> */}
           </DataTable>
           <br></br>
           <div className="flex align-items-center flex-wrap">
           <div className="col-7"></div>
           <Button icon="pi pi-shopping-cart" label="Ir al Carrito"></Button>

           </div>
           
        </OverlayPanel>
    </div>
    
  );
};
