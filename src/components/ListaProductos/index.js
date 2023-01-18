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

export default function CatalogoProductos(data2) {
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

  // const [tipoEntidadSeleccionada, setTipoEntidadSeleccionada] = useState(0);
  let tipoEntidadSeleccionada;
  useEffect(() => {
    fetch("/api/productos", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setProductos(data));

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

  console.log("equipos", productos);

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

  const enviarProducto = async() => {
    const response = await fetch("/api/productos", {
      method: "GET",
      //body: JSON.stringify(formData),
    });
    return response;
  }

  const saveProduct = () => {
    setSubmitted(true);

    let formData = new FormData();

    formData.append("codigo", null);
    formData.append("nombre", "PRODUCTO X");
    //formData.append("imagen", imagen);
    formData.append("precio", 34.5);
    formData.append("categoria", "Categoria X");

    enviarProducto()
    .then((res) => res.json(formData))
    .then((data) => console.log(data))
    .catch((err) => console.log(err));


    // if (product.nombre.trim()) {
    // let _products = [...products];
    // let _product = { ...product };
    // if (product.id) {
    //   const index = findIndexById(product.id);

    //   _products[index] = _product;
    //   toast.current.show({
    //     severity: "success",
    //     summary: "Successful",
    //     detail: "Product Updated",
    //     life: 3000,
    //   });
    // } else {
    //   _product.id = createId();
    //   _product.image = "product-placeholder.svg";
    //   _products.push(_product);
    //   toast.current.show({
    //     severity: "success",
    //     summary: "Successful",
    //     detail: "Product Created",
    //     life: 3000,
    //   });
    // }

    //setProducts(_products);
    //   setProductDialog(false);
    //   setProduct(emptyProduct);
    // }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id);
    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
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
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const onCategoryChange = (e) => {
    let _product = { ...product };
    _product["categoria"] = e.value;
    _product["category"] = e.value;
    setProduct(_product);
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

        <Button
          label="Eliminar"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
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

  return (
    <div>
      <NavBar data={data2} />

      <Card
        title={disableCliente ? "Listado de Productos" : "Carrito de Compras"}
        className="mt-3"
      >
        <div className="datatable-crud-demo">
          <Toast ref={toast} />

          <div className="card">
            <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

            <DataTable
              ref={dt}
              emptyMessage="No se encontraron resultados"
              value={productos}
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
                selectionMode="multiple"
                headerStyle={{ width: "3rem" }}
                exportable={false}
              ></Column>
              <Column
                field="codigo"
                header="Código"
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
                field="imagen"
                header="Imagen"
                body={imageBodyTemplate}
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
                header="Categoría"
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
                value={product.nombre}
                onChange={(e) => onInputChange(e, "nombre")}
                required
                autoFocus
                className={classNames({
                  "p-invalid": submitted && !product.nombre,
                })}
              />
              {submitted && !product.nombre && (
                <small className="p-error">Nombre es requerido.</small>
              )}
            </div>

            <div className="field">
              <label className="mb-3">Categoría</label>
              <div className="formgrid grid">
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId="category1"
                    name="category"
                    value="Accessorios"
                    onChange={onCategoryChange}
                    checked={product.category === "Accessorios"}
                  />
                  <label htmlFor="category1">Accessorios</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId="category2"
                    name="category"
                    value="Ropa"
                    onChange={onCategoryChange}
                    checked={product.category === "Ropa"}
                  />
                  <label htmlFor="category2">Ropa</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId="category3"
                    name="category"
                    value="Electrónicos"
                    onChange={onCategoryChange}
                    checked={product.category === "Electrónicos"}
                  />
                  <label htmlFor="category3">Electrónicos</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId="category4"
                    name="category"
                    value="Fitness"
                    onChange={onCategoryChange}
                    checked={product.category === "Fitness"}
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
                  value={product.precio}
                  onValueChange={(e) => onInputNumberChange(e, "precio")}
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                />
              </div>
              <div className="field col">
                <label htmlFor="quantity">cantidad</label>
                <InputNumber
                  id="quantity"
                  value={product.cantidad}
                  onValueChange={(e) => onInputNumberChange(e, "cantidad")}
                  integeronly
                />
              </div>
              <div className="field col">
                <label htmlFor="image">Imagen</label>
                <FileUpload
                  chooseLabel="Seleccione"
                  mode="basic"
                  onSelect={manejadorImagen}
                  //url="https://primefaces.org/primereact/showcase/upload.php"
                  accept="image/*"
                  maxFileSize={1000000}
                  customUpload
                  //onUpload={onBasicUpload}
                />
              </div>
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
