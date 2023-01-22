const connection = require("../../backend/connection");

let tabla = "carrito_compra";
let cliente = "";
let producto = null;
let cantidad = null;

const handler = async (req, res) => {
  cliente = req.query.cedula;
  producto = req.body.producto;
  cantidad = req.body.cantidad;

  switch (req.method) {
    case "GET":
      return getShoppingCartById();
    case "PUT":
      return updateShoppingCart();
    case "DELETE":
      return deleteShoppingCart();
    default:
      return res.status(400).json({ message: "Error, no existe este cliente" });
  }

  function getShoppingCartById() {
    connection.query(
      "SELECT producto.nombre, producto.precio, carrito_compra.cantidad, cliente.cedula FROM `producto`, `carrito_compra`, `cliente`  WHERE ((producto.codigo = carrito_compra.producto) AND (carrito_compra.cliente = cliente.cedula) AND (cliente.cedula = '" +
        cliente +
        "'))",
      (error, results) => {
        if (error) throw error;
        return res.status(200).json(results);
      }
    );
  }

  function updateShoppingCart() {
    const actualizar =
      "UPDATE " +
      tabla +
      " SET cantidad = " +
      cantidad +
      " WHERE cliente = '" +
      cliente +
      "'";
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
