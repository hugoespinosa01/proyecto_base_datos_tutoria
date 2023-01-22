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

};

export const config = {
  bodyParser: true,
};

export default handler;
