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
import { Dropdown } from "primereact/dropdown";
import { Menubar } from "primereact/menubar";
import { NavBar } from "../../../pages/frontend/navbar";
import { AutoComplete } from "primereact/autocomplete";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

export default function CarritoCompra(data2) {
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

  const [productos, setProductos] = useState([]);
  const [value19, setValue19] = useState(1);
  const [longitud, setLongitud] = useState(0);
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState(null);
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [cliente, setCliente] = useState(null);
  const [clienteLista, setClienteLista] = useState([]);
  const [nombreCliente, setNombreCliente] = useState("");
  const [apellidoCliente, setApellidoCliente] = useState("");
  const [carritoData, setCarritoData] = useState([]);
  useEffect(() => {
    fetch(`/api/clientes`)
      .then((res) => res.json())
      .then((data) => setClienteLista(data));
  }, []);
  // const [tipoEntidadSeleccionada, setTipoEntidadSeleccionada] = useState(0);
  let tipoEntidadSeleccionada;

  //Obtener los productos
  useEffect(() => {
    fetch(`/api/carrito_compras/${cliente?.cedula}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setCarritoData(data));
  }, [cliente, longitud]);

  useEffect(() => {
    if (
      sessionStorage.getItem("usuario") !== null ||
      sessionStorage.getItem("usuario") !== undefined
    ) {
      tipoEntidadSeleccionada = sessionStorage.getItem("usuario");
    }

    if (tipoEntidadSeleccionada === "Empresa") {
      console.log("EMPRESA");
      //  sessionStorage.setItem('usuario', tipoEntidadSeleccionada);
      setDisableCliente(true);
    } else if (tipoEntidadSeleccionada === "Cliente") {
      console.log("CLIENTE");
    } else {
      console.log("SIN DATOS", tipoEntidadSeleccionada);
      window.location.href = "http://localhost:3000";
    }
  }, []);

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const productService = null;
  const [disableCliente, setDisableCliente] = useState(false);

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
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setCodigo(null);
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  let imagen;

  const manejadorImagen = ({ files }) => {
    const [archivo] = files;
    imagen = archivo;
  };

  const saveProduct = () => {
    if (nombre == null || precio == null || categoria == null) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Llene todos los campos!",
        life: 3000,
      });

      return;
    }
    setSubmitted(true);

    const formData = {
      codigo: codigo == null ? null : codigo,
      nombre: nombre,
      imagen: imagen,
      precio: precio,
      categoria: categoria,
      cantidad: 0,
    };
    if (codigo == null) {
      fetch("/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      toast.current.show({
        severity: "success",
        summary: "Exitoso!",
        detail: "Producto creado!",
        life: 3000,
      });
    } else {
      fetch("/api/productos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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

    setProductDialog(false);
    setNombre("");
    setPrecio(null);
    setCategoria(null);

    setCodigo(null);
  };

  const editarCarrito = (data) => {
    const fecha = new Date();
    console.log("data", data);
    fetch(`/api/carrito_compras/${cliente?.cedula}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        producto: data.codigo,
        cantidad: data.cantidad,
        fecha: fecha,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
      });
    setLongitud(longitud + 1);
  };

  const confirmDeleteProduct = (product) => {
    setCodigo(product.codigo);
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    fetch(`/api/carrito_compras/${cliente.cedula}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ producto: codigo }),
    })
      .then(() => setLongitud(longitud + 1))
      .then(() => {
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        setCodigo(null);
        toast.current.show({
          severity: "success",
          summary: "Exitoso",
          detail: "Producto Eliminado!",
          life: 3000,
        });
      });
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
    setCategoria(e.value);
  };
  console.log({ product });
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };
  const selecionarCliente = (e) => {
    setCliente(e.value);
    let cliente2 = e.value;
    setNombreCliente(cliente2?.nombre);
    setApellidoCliente(cliente2?.apellido);
  };

  const completarPAGO=()=>{
    toast.current.show({
      severity: "success",
      detail: "Pago realizado con ??xito!",
      life: 3000,
    });
  }

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
          <div className="flex align-items-center justify-content-center">
            <div className="col-3"></div>
            <h3 className="" htmlFor="name">
              Cliente:{" "}
            </h3>
            <div className="col-1"></div>
            <div className="col-2">
              <Dropdown
                options={clienteLista}
                optionLabel="cedula"
                value={cliente}
                filterBy="cedula"
                onChange={selecionarCliente}
                filter
                showClear
                placeholder="Seleccione c??dula de cliente"
              />
            </div>

            <div className="col-2"></div>

            <div className="flex align-items-center justify-content-center">
              <h3 className="" htmlFor="name">
                Nombre:{" "}
              </h3>
              <AutoComplete disabled value={nombreCliente}></AutoComplete>
            </div>
            <div className="col-1"></div>
            <div className="flex align-items-center justify-content-center">
              <h3 className="" htmlFor="name">
                Apellido:{" "}
              </h3>

              <AutoComplete disabled value={apellidoCliente}></AutoComplete>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  };

  const imageBodyTemplate = (rowData) => {
    console.log(rowData);
    return (
      <img
        src={`${rowData.imagen}`}
        onError={(e) =>
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
        alt={rowData.image}
        className="product-image"
        height={100}
      />
    );
  };
  const onCellEditComplete = (e) => {
    let { rowData, newValue, field, originalEvent: event } = e;

    switch (field) {
      case "cantidad":
        rowData[field] = newValue;
        break;

      default:
        event.preventDefault();
        break;
    }
  };

  const cellEditor1 = (options) => {
    return (
      <span>
        <InputNumber
          inputId="vertical"
          value={options.value}
          onValueChange={(e) => options.editorCallback(e.value)}
          mode="decimal"
          showButtons
          buttonLayout="vertical"
          style={{ width: "4rem" }}
          decrementButtonClassName="p-button-secondary"
          incrementButtonClassName="p-button-secondary"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
        />
      </span>
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
  const enviarAlCarrito = (data) => {
    const subtotal = data.precio * 100;
    const total = subtotal * 1.12;
    console.log("data carrito", data);
    console.log("cliente", cliente);
    const fecha = new Date();
    console.log("date", fecha);
    fetch("/api/carrito_compras", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codigo: null,
        cliente: cliente.cedula,
        producto: data.codigo,
        cantidad: 10,
        subtotal: subtotal,
        total: total,
        fecha: fecha,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
      });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {disableCliente ? (
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success mr-2"
            onClick={() => editProduct(rowData)}
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
        &nbsp;&nbsp;&nbsp;
        {disableCliente ? (
          <></>
        ) : (
          <>
            <Button
              label="Editar Cantidad"
              icon="pi pi-cart-plus"
              className="p-button-success mr-2"
              onClick={() => editarCarrito(rowData)}
            />
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-warning"
              onClick={() => confirmDeleteProduct(rowData)}
            />
          </>
        )}
      </React.Fragment>
    );
  };

  const actionBodyTemplate2 = (rowData) => {
    return (
      <React.Fragment>
        {formatCurrency(rowData.cantidad * rowData.precio)}
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">
        {disableCliente ? "Listado de Productos" : "Carrito de Compra"}
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

  let modifiedArr = carritoData.map(function (element) {
    return element?.cantidad * element?.precio;
  });
  console.log("total", modifiedArr);
  const total = modifiedArr.reduce((a, b) => a + b, 0);

  console.log("total2", total);
  const footer = (
    <ColumnGroup>
      <Row>
        <Column
          footer="Subtotal:"
          colSpan={3}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={formatCurrency(total)}></Column>
        <Column footer=""></Column>
      </Row>
      <Row>
        <Column
          footer="IVA: 12% "
          colSpan={3}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={formatCurrency(total * 0.12)}></Column>
        <Column footer=""></Column>
      </Row>
      <Row>
        <Column
          footer="TOTAL:"
          colSpan={3}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={formatCurrency(total * 1.12)}></Column>
        <Column footer=""></Column>
      </Row>
    </ColumnGroup>
  );
  return (
    <div className="card">
      <NavBar data={data2} />

      <Card
        title={disableCliente ? "Listado de Productos" : "Carrito de Compra"}
        className="mt-3"
      >
        <div className="datatable-crud-demo">
          <Toast ref={toast} />

          <div className="card">
            <Toolbar className="col-12" left={leftToolbarTemplate}></Toolbar>
            <br />
            {(cliente === null || cliente === undefined) &&
            disableCliente == false ? (
              <>
                <br></br>
                <h2 style={{ color: "red" }}>
                  Debe Seleccionar un cliente para proceder a pagar sus
                  productos*
                </h2>
                <br></br>
                <br></br>
                <br></br>
                <DataTable
                  ref={dt}
                  emptyMessage="No se encontraron resultados"
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
                    field="codigo"
                    header="C??digo"
                    sortable
                    style={{ minWidth: "12rem" }}
                  ></Column>
                  <Column
                    field="nombre"
                    header="Nombre"
                    sortable
                    style={{ minWidth: "16rem" }}
                  ></Column>

                  <Column
                    field="precio"
                    header="Precio"
                    body={priceBodyTemplate}
                    sortable
                    style={{ minWidth: "8rem" }}
                  ></Column>
                  <Column
                    field="categoria"
                    header="Categor??a"
                    sortable
                    style={{ minWidth: "10rem" }}
                  ></Column>

                  <Column
                    body={actionBodyTemplate}
                    exportable={false}
                    style={{ minWidth: "8rem" }}
                  ></Column>
                </DataTable>
              </>
            ) : (
              <DataTable
                ref={dt}
                emptyMessage="No se encontraron resultados"
                value={carritoData}
                selection={selectedProducts}
                footerColumnGroup={footer}
                onSelectionChange={(e) => setSelectedProducts(e.value)}
                dataKey="id"
                paginator
                editMode="cell"
                className="editable-cells-table"
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                globalFilter={globalFilter}
                header={header}
                responsiveLayout="scroll"
              >
                <Column
                  field="nombre"
                  header="Nombre"
                  sortable
                  style={{ minWidth: "16rem" }}
                ></Column>

                <Column
                  field="precio"
                  header="Precio"
                  prefix="$"
                  body={priceBodyTemplate}
                  sortable
                  style={{ minWidth: "8rem" }}
                ></Column>

                <Column
                  header="Cantidad"
                  field="cantidad"
                  editor={(options) => cellEditor1(options)}
                  onCellEditComplete={onCellEditComplete}
                  exportable={false}
                  style={{ minWidth: "8rem" }}
                ></Column>
                <Column
      header="Total"
      prefix="$"
                body={actionBodyTemplate2}
                exportable={false}
                style={{ minWidth: "8rem" }}
              ></Column>

          <Button
            label="Completar Pago"
            icon="pi pi-cart-plus"
            className="p-button-success mr-4"
            onClick={()=>enviarAlCarrito()}
          />

                <Column
                  body={actionBodyTemplate}
                  exportable={false}
                  style={{ minWidth: "8rem" }}
                ></Column>
              </DataTable>
            )}
            <br></br>
            <div>
              <Button
                label="Completar Pago"
                icon="pi pi-cart-plus"
                className="p-button-success mr-4"
                onClick={() => completarPAGO()}
              />
            </div>
          </div>

          <Dialog
            visible={productDialog}
            style={{ width: "450px" }}
            header="Detalles del Producto"
            modal
            className="p-fluid"
            footer={productDialogFooter}
            onHide={hideDialog}
          >
            {product.image && (
              <img
                src={`images/product/${product.image}`}
                onError={(e) =>
                  (e.target.src =
                    "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                }
                alt={product.image}
                className="product-image block m-auto pb-3"
              />
            )}
            <div className="field">
              <label htmlFor="name">Nombre</label>
              <InputText
                id="name"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                autoFocus
                className={classNames({
                  "p-invalid": submitted && !nombre,
                })}
              />
              {submitted && !nombre && (
                <small className="p-error">Nombre es requerido.</small>
              )}
            </div>

            <div className="field">
              <label className="mb-3">Categor??a</label>
              <div className="formgrid grid">
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId="category1"
                    name="category"
                    value="Accessorios"
                    onChange={onCategoryChange}
                    checked={categoria === "Accessorios"}
                  />
                  <label htmlFor="category1">Accessorios</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId="category2"
                    name="category"
                    value="Ropa"
                    onChange={onCategoryChange}
                    checked={categoria === "Ropa"}
                  />
                  <label htmlFor="category2">Ropa</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId="category3"
                    name="category"
                    value="Electr??nicos"
                    onChange={onCategoryChange}
                    checked={categoria === "Electr??nicos"}
                  />
                  <label htmlFor="category3">Electr??nicos</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId="category4"
                    name="category"
                    value="Fitness"
                    onChange={onCategoryChange}
                    checked={categoria === "Fitness"}
                  />
                  <label htmlFor="category4">Fitness</label>
                </div>
              </div>
            </div>

            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="price">Precio</label>
                <InputNumber
                  id="price"
                  value={precio}
                  onValueChange={(e) => setPrecio(e.value)}
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                />
              </div>

              <div className="field col"></div>
            </div>
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
              {product && (
                <span>
                  Desea eliminar el siguiente producto : <b>{product.nombre}</b>
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
