const connection = require("../../backend/connection");
let tabla = "carrito_compra";
let cliente = "";

const handler = async (req, res) => {
  cliente = req.query.cedula;
  console.log("cliente: " + cliente);

  switch (req.method) {
    case "GET":
      return getShoppingCartById();
    default:
      return res.status(400).json({ message: "Error, no existe este cliente" });
  }

  function getShoppingCartById() {
    connection.query(
      "SELECT producto.nombre, producto.precio, producto.cantidad, cliente.cedula FROM `producto`, `cliente`, `carrito_compra` WHERE ((producto.codigo = carrito_compra.producto) AND (carrito_compra.cliente = cliente.cedula) AND (cliente.cedula = '" +
        cliente +
        "'))",
      (error, results) => {
        if (error) throw error;
        return res.status(200).json(results);
      }
    );
  }
};

export const config = {
  bodyParser: true,
};

export default handler;
