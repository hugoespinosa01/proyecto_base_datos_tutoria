const connection = require("../../backend/connection");

let tabla = "carrito_compra";
let cliente = "";
let producto = null;
let cantidad = null;
let fecha = null;

const handler = async (req, res) => {
  cliente = req.query.cedula;
  producto = req.body.producto;
  cantidad = req.body.cantidad;
  fecha = req.body.fecha;

  switch (req.method) {
    case "GET":
      return getShoppingCartById();
    case "POST":
      return createShoppingCart();
    case "PUT":
      return updateShoppingCart();
    case "DELETE":
      return deleteShoppingCart();
    default:
      return res.status(400).json({ message: "Error, no existe este cliente" });
  }

  function getShoppingCartById() {
    connection.query(
      "SELECT producto.codigo, producto.nombre, producto.precio, carrito_compra.cantidad, cliente.cedula FROM `producto`, `carrito_compra`, `cliente`  WHERE ((producto.codigo = carrito_compra.producto) AND (carrito_compra.cliente = cliente.cedula) AND (cliente.cedula = '" +
        cliente +
        "'))",
      (error, results) => {
        if (error) throw error;
        return res.status(200).json(results);
      }
    );
  }

  function createShoppingCart() {
    const insertar =
      "INSERT INTO " +
      tabla +
      " (producto, cliente, fecha, cantidad) VALUES (" +
      producto +
      ", '" +
      cliente +
      "', '" +
      fecha +
      "', " +
      cantidad +
      ")";
    console.log(insertar);
    connection.query(insertar, (error, results) => {
      if (error) throw error;
      return res.status(200).send("Carrito de compras creado");
    });
  }

  function updateShoppingCart() {
    const actualizar =
      "UPDATE " +
      tabla +
      " SET cantidad = " +
      cantidad +
      " WHERE (carrito_compra.cliente = '" +
      cliente +
      "') AND (carrito_compra.producto = " + 
      producto + ")";
    connection.query(actualizar, (error, results) => {
      if (error) throw error;
      return res.status(200).send("Carrito de compras actualizado");
    });
  }

  function deleteShoppingCart() {
    const eliminar =
      "DELETE FROM " +
      tabla +
      " WHERE (carrito_compra.producto = " +
      producto +
      " ) AND (carrito_compra.cliente = '" +
      cliente +
      "')";
    connection.query(eliminar, (error, results) => {
      if (error) throw error;
      return res.status(200).send("Carrito de compras eliminado");
    });
  }
};

export const config = {
  bodyParser: true,
};

export default handler;
