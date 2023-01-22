const connection = require("../../backend/connection");
let tabla = "carrito_compra";
let codigo = null;
let cliente = "";
let producto = null;
let cantidad = null;
let subtotal = null;
let total = null;
let fecha = null;

const handler = async (req, res) => {
  codigo = req.body.codigo;
  cliente = req.body.cliente;
  producto = req.body.producto;
  cantidad = req.body.cantidad;
  subtotal = req.body.subtotal;
  total = req.body.total;
  fecha = req.body.fecha;

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

  // function getShoppingCart() {
  //   connection.query("SELECT * FROM '" + tabla + "' WHERE cliente = '" + cliente + "'", (error, results) => {
  //     if (error) throw error.message();
  //     return res.status(200).json(results);
  //   });
  // }

  function createShoppingCart() {
    const insertar =
      "INSERT INTO " +
      tabla +
      " (codigo, cliente, producto, cantidad, subtotal, total, fecha) VALUES (NULL, '" +
      cliente +
      "', " +
      producto +
      ", " +
      cantidad +
      ", " +
      subtotal +
      ", " +
      total +
      ", '" +
      fecha +
      "')'";
    connection.query(insertar, (error, results) => {
      if (error) throw error.message();
      return res.status(200).send("Carrito de compras creado");
    });
  }

  function updateShoppingCart() {
    const actualizar =
      "UPDATE " +
      tabla +
      " SET cliente = '" +
      cliente +
      "', producto = " +
      producto +
      ", cantidad = " +
      cantidad +
      ", subtotal = " +
      subtotal +
      ", total = " +
      total +
      ", fecha = '" +
      fecha +
      "' WHERE codigo = " +
      codigo +
      "";
    connection.query(actualizar, (error, results) => {
      if (error) throw error;
      return res.status(200).send("Carrito de compras actualizado");
    });
  }

  function deleteShoppingCart() {
    const eliminar = "DELETE FROM " + tabla + " WHERE codigo = " + codigo + "";
    console.log(eliminar);
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
