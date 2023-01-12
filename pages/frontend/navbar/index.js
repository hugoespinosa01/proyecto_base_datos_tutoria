import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { Chip } from "primereact/chip";
import { Tooltip } from "primereact/tooltip";
import { Fragment } from "react";
import { useRouter } from 'next/router';
import { useEffect } from "react";
export const NavBar = () => {
  const router = useRouter();
  let tipoEntidadSeleccionada;
  useEffect(() => {
    if (sessionStorage.getItem('usuario') !== null) {
      
      tipoEntidadSeleccionada=sessionStorage.getItem('usuario');
      
    }

    if (tipoEntidadSeleccionada === "Empresa") {
      console.log("EMPRESA");
    //  sessionStorage.setItem('usuario', tipoEntidadSeleccionada);
     // setDisableCliente(true);
    } else if (tipoEntidadSeleccionada === "Cliente") {
    //  console.log("CLIENTE");
    } else {
      //console.log("SIN DATOS", tipoEntidadSeleccionada);
     // window.location.href = "http://localhost:3000";
    }
  }, [])
  
  const items = [
    {
      label: "Productos",
      className: "text-white",
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
      icon="pi pi-shopping-cart"
      className="p-button-primary p-button-text"
      tooltip="Carrito de compras"
      tooltipOptions={{ position: "left" }}
    />
  );

  return (
    <div>
      <Menubar
        model={items}
        start={start}
        end={end}
        className="p-4"
      />
    </div>
  );
};
