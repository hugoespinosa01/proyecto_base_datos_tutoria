import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { Chip } from "primereact/chip";
import { Tooltip } from "primereact/tooltip";

export const NavBar = () => {
  const items = [
    {
      label: "Productos",
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

  const start = <Chip label="Tienda en línea" icon="pi pi-shopping-bag" />;
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
      <Menubar model={items} start={start} end={end} />
    </div>
  );
};
