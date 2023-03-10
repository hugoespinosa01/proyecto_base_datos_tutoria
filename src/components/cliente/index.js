import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import { NavBar } from "../../../pages/frontend/navbar";
import { InputMask } from 'primereact/inputmask';
import { Calendar } from 'primereact/calendar';


export default function Clientes(data2) {

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState();
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [longitud, setLongitud] = useState(0)
  const [products, setProducts] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);

  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const productService = null;
  const [disableCliente, setDisableCliente] = useState(false);

  useEffect(() => {
    fetch(`/api/clientes`)
      .then((res) =>  res.json())
      .then((data) => setClientes(data));
  }, [longitud]);

  let emptyProduct = {
    id: null,
    name: "",
    image: null,
    description: "",
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: "INSTOCK",
  };
  const [product, setProduct] = useState(emptyProduct);

  const [equipos, setEquipos] = useState([]);
  const [value19, setValue19] = useState(1);
  // const [tipoEntidadSeleccionada, setTipoEntidadSeleccionada] = useState(0);
  let tipoEntidadSeleccionada;
  useEffect(() => {


    if (sessionStorage.getItem('usuario') !== null) {

      tipoEntidadSeleccionada = sessionStorage.getItem('usuario');

    }

    if (tipoEntidadSeleccionada === "Empresa") {
      //  sessionStorage.setItem('usuario', tipoEntidadSeleccionada);
      setDisableCliente(true);
    } else if (tipoEntidadSeleccionada === "Cliente") {
    } else {
      window.location.href = "http://localhost:3000";
    }
  }, []);

  useEffect(() => {
    let producto = [
      {
        id: 1,
        codigo: "23234werw",
        nombre: "Product 1",
        precio: 100,
        imagen: "product-placeholder.svg",
        categoria: "Category 1",
        cantidad: 100,
      },
    ];
    setProducts(producto);
    let cliente1 = [
      { id: 1, cedula: "3423", nombre: "Cliente 1", apellido: "Apellido 1", telefono: "123456789", direccion: "Direccion 1", email: "  email 1", tipoEntidad: "Cliente", fechaNacimiento: "2021-01-01", direccion: "Direccion 1" },
    ];
    setCliente(cliente1);
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const openNew = () => {

    setProductDialog(false);



    setNombre("")
    setCedula("")
    setApellido("")
    setFechaNacimiento("")
    setEmail("")
    setTelefono("")
    setDireccion("")

    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setCedula("");
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (cliente?.nombre?.trim()) {
      let _products = [...clientes];
      let _product = { ...cliente };
      if (cliente?.id) {
        const index = findIndexById(cliente.id);

        _products[index] = _product;
        toast.current.show({
          severity: "success",
          summary: "Exitoso",
          detail: "Producto Actualizado",
          life: 3000,
        });
      } else {
        _product.id = createId();
        _product.image = "product-placeholder.svg";
        _products.push(_product);
        toast.current.show({
          severity: "success",
          summary: "Exitoso",
          detail: "Producton Creado!",
          life: 3000,
        });
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (rowData) => {
    setCliente({ ...rowData });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setCedula(product.cedula);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    fetch(`/api/clientes/`, { 
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({cedula:cedula})
    }).then(res => {if(res.status==308){toast.current.show({
      severity: "error",
      summary: "Fallo",
      detail: "Producto No Eliminado!",
      life: 3000,
    })}else {
      console.log("res", res.status)
    }})
    .then(() => setLongitud(longitud+1)).then(()=>{setDeleteProductDialog(false)
    //setProduct(emptyProduct);
    //setCodigo(null);
    toast.current.show({
      severity: "success",
      summary: "Exitoso!",
      detail: "Cliente Eliminado",
      life: 3000,
    })});
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const importCSV = (e) => {
    const file = e.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target.result;
      const data = csv.split("\n");

      // Prepare DataTable
      const cols = data[0].replace(/['"]+/g, "").split(",");
      data.shift();

      const importedData = data.map((d) => {
        d = d.split(",");
        const processedData = cols.reduce((obj, c, i) => {
          c =
            c === "Status"
              ? "inventoryStatus"
              : c === "Reviews"
                ? "rating"
                : c.toLowerCase();
          obj[c] = d[i].replace(/['"]+/g, "");
          (c === "price" || c === "rating") && (obj[c] = parseFloat(obj[c]));
          return obj;
        }, {});

        processedData["id"] = createId();
        return processedData;
      });

      const _products = [...products, ...importedData];

      setProducts(_products);
    };

    reader.readAsText(file, "UTF-8");
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));
    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Exitoso",
      detail: "Producto Eliminado!",
      life: 3000,
    });
  };

  const onCategoryChange = (e) => {
    let _product = { ...product };
    _product["categoria"] = e.value;
    _product["category"] = e.value;
    setProduct(_product);
  };
  const onInputChange = (e, name) => {
    const val = (e?.target && e?.target?.value) || "";
    let _product = { ...cliente };
    _product[`${name}`] = val;

    setCliente(_product);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        {disableCliente ? (
          <Button
            label="Nuevo"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={openNew}
          />
        ) : (
          <></>
        )}

       
      </React.Fragment>
    );
  };



  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`images/product/${rowData.imagen}`}
        onError={(e) =>
        (e.target.src =
          "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
        alt={rowData.image}
        className="product-image"
      />
    );
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.precio);
  };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span
        className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}
      >
        {rowData.inventoryStatus}
      </span>
    );
  };

  const editar = (rowData) => {
    let fecha = new Date(rowData.fechaNacimiento)
    setNombre(rowData.nombre)
    setCedula(rowData.cedula)
    setApellido(rowData.apellido)
    setFechaNacimiento(fecha)
    setEmail(rowData.email)
    setTelefono(rowData.telefono)
    setDireccion(rowData.direccion)
    setProductDialog(true);
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {disableCliente ? (
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success mr-2"
            onClick={() => editar(rowData)}
          />
        ) : (
          <></>
        )}
        {disableCliente ? (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-warning"
            onClick={() => confirmDeleteProduct(rowData)}
          />
        ) : (
          <></>
        )}
        {disableCliente ? (
          <></>
        ) : (
          <InputNumber
            inputId="vertical"
            value={value19}
            onValueChange={(e) => setValue19(e.value)}
            mode="decimal"
            showButtons
            buttonLayout="vertical"
            style={{ width: "4rem" }}
            decrementButtonClassName="p-button-secondary"
            incrementButtonClassName="p-button-secondary"
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"
          />
        )}
        &nbsp;&nbsp;&nbsp;
        {disableCliente ? (
          <></>
        ) : (
          <Button
            label="Agregar a carrito"
            icon="pi pi-cart-plus"
            className="p-button-success mr-2"
          />
        )}
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">
        {disableCliente ? "Listado de Productos" : "Carrito de Compras"}
      </h5>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduct}
      />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );
  const onBasicUpload = () => {
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded with Basic Mode",
    });
  };
  const guardar = () => {
    if(cedula==""|| nombre=="" || apellido=="" || telefono=="" || email=="" || fechaNacimiento==null || direccion==""){
      console.log("entro aqui")
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Llene todos los campos!",
        life: 3000,
      });
      

      return;

    }

    
    if(clientes.find(element => element.cedula === cedula)===undefined){
      fetch('/api/clientes', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cedula: cedula,
          nombre: nombre,
          apellido: apellido,
          telefono: telefono,
          email: email,
          fechaNacimiento: fechaNacimiento,
          direccion: direccion
        })
      })
        .then(res => res.json())
        .then(res => {
        });


        toast.current.show({
          severity: "success",
          summary: "Exitoso!",
          detail: "Producto creado!",
          life: 3000,
        });
    }else{
      fetch('/api/clientes', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cedula: cedula,
          nombre: nombre,
          apellido: apellido,
          telefono: telefono,
          email: email,
          fechaNacimiento: fechaNacimiento,
          direccion: direccion
        })
      })
        .then(res => res.json())
        .then(res => {
        });

        toast.current.show({
          severity: "success",
          summary: "Exitoso!",
          detail: "Producto actualizado!",
          life: 3000,
        });
    }

    toast.current.show({
      severity: "success",
      summary: "Exitoso!",
      detail: "Proceso Exitoso!",
      life: 3000,
    });
    



    setLongitud(longitud + 1);
    setNombre("")
    setApellido("")
    setTelefono("")
    setDireccion("")
    setEmail("")
    setCedula("")
    setFechaNacimiento(null)
    setProductDialog(false);

  }

  return (
    <div>
      <NavBar data={data2} />

      <Card
        title={disableCliente ? "Listado de Clientes" : "Carrito de Compras"}
        className="mt-3"
      >
        <div className="datatable-crud-demo">
          <Toast ref={toast} />

          <div className="card">
            <Toolbar
              className="mb-4"
              left={leftToolbarTemplate}

            ></Toolbar>

            <DataTable
              ref={dt}
              emptyMessage="No se encontraron resultados"
              value={clientes}
              selection={selectedProducts}
              onSelectionChange={(e) => setSelectedProducts(e.value)}
              dataKey="id"
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
              globalFilter={globalFilter}
              header={header}
              responsiveLayout="scroll"
            >
              <Column
                field="cedula"
                header="C??dula"
                sortable
                style={{ minWidth: "8rem" }}
              ></Column>
              <Column
                field="nombre"
                header="Nombre"
                sortable
                style={{ minWidth: "12rem" }}
              ></Column>
              <Column
                field="apellido"
                header="Apellido"
                sortable
                style={{ minWidth: "16rem" }}
              ></Column>


              <Column
                field="telefono"
                header="Tel??fono"
                sortable
                style={{ minWidth: "10rem" }}
              ></Column>

              <Column
                field="email"
                header="Email"
                sortable
                style={{ minWidth: "10rem" }}
              ></Column>
              <Column
                field="direccion"
                header="Direcci??n"
                sortable
                style={{ minWidth: "10rem" }}
              ></Column>

              <Column
                body={actionBodyTemplate}
                exportable={false}
                style={{ minWidth: "8rem" }}
              ></Column>
            </DataTable>
          </div>

          <Dialog
            visible={productDialog}
            style={{ width: "450px" }}
            header="Perfil del Cliente"
            modal
            className="p-fluid"
            //footer={productDialogFooter}
            onHide={hideDialog}
          >

            <div className="field">
              <label htmlFor="cedula">C??dula</label>
              <InputText
                id="cedula"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                required
                autoFocus
                className={classNames({
                  "p-invalid": submitted && !cedula,
                })}
              />
              {submitted && !cedula && (
                <small className="p-error">C??dula es requerida.</small>
              )}
            </div>
            <div className="field">
              <label htmlFor="nombre">Nombre</label>
              <InputText
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                autoFocus
                className={classNames({
                  "p-invalid": submitted && !nombre,
                })}
              />
              {submitted && !nombre && (
                <small className="p-error">Nombre es requerida.</small>
              )}
            </div>
            <div className="field">
              <label htmlFor="apellido">Appelido</label>
              <InputText
                id="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
                autoFocus
                className={classNames({
                  "p-invalid": submitted && !apellido,
                })}
              />
              {submitted && !apellido && (
                <small className="p-error">Appelido es requerida.</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="telefono">Tel??fono</label>
              <InputMask id="telefono" mask="99-999999" value={telefono} placeholder="99-999999" onChange={(e) => setTelefono(e.value)}></InputMask>

              {submitted && !telefono && (
                <small className="p-error">Tel??fono es requerido.</small>
              )}

            </div>




            <div className="field">
              <label htmlFor="email">Email</label>
              <InputText
                id="emnail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                className={classNames({
                  "p-invalid": submitted && !email,
                })}
              />
              {submitted && !email && (
                <small className="p-error">Email es requerido.</small>
              )}
            </div>


            <div className="field">
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
              <Calendar id="fechaNacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.value)} className={classNames({
                "p-invalid": submitted && !fechaNacimiento,
              })} />

              {submitted && !fechaNacimiento && (
                <small className="p-error">Fecha de Nacimiento es requerido.</small>
              )}
            </div>


            <div className="field">
              <label htmlFor="direccion">Direcci??n</label>
              <InputText
                id="direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
                autoFocus
                className={classNames({
                  "p-invalid": submitted && !direccion,
                })}
              />
              {submitted && !direccion && (
                <small className="p-error">Direcci??n es requerido.</small>
              )}
            </div>

            <Button label="Guardar" className="p-button-secondary" onClick={() => guardar()} />



          </Dialog>

          <Dialog
            visible={deleteProductDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteProductDialogFooter}
            onHide={hideDeleteProductDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {cliente && (
                <span>
                  Desea eliminar el siguiente cliente
                  ?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteProductsDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteProductsDialogFooter}
            onHide={hideDeleteProductsDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {product && <span>Desea eliminar los siguientes productos?</span>}
            </div>
          </Dialog>
        </div>
      </Card>
    </div>
  );
}
