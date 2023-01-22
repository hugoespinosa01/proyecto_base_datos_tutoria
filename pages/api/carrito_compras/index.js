const connection = require("../../backend/connection");
let tabla = "carrito_compra";
let cliente = "";
let producto = null;
let fecha = null;
let cantidad = null;

const handler = async (req, res) => {
  cliente = req.body.cliente;
  producto = req.body.producto;
  fecha = req.body.fecha;
  cantidad = req.body.cantidad;

  switch (req.method) {
    case "POST":
      return createShoppingCart();
    case "PUT":
      return updateShoppingCart();
    case "DELETE":
      return deleteShoppingCart();
    default:
      return res.status(400).json({ message: "Error, método no existe" });
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
      " SET producto = " +
      producto +
      ", fecha = '" +
      fecha +
      "', cantidad = " +
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
    const eliminar = "DELETE FROM " + tabla + " WHERE cliente = '" + cliente + "'";
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
