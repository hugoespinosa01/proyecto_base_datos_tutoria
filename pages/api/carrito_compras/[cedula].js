const connection = require("../../backend/connection");
let tabla = "carrito_compra";
let cliente = "";

const handler = async (req, res) => {
  cliente = req.query.cedula;

  switch (req.method) {
    case "GET":
      return getShoppingCartById();
    default:
      return res.status(400).json({ message: "Error, método no existe" });
  }

  function getShoppingCartById() {
    connection.query("SELECT * FROM '" + tabla + "' WHERE cliente = '" + cliente + "'", (error, results) => {
      if (error) throw error.message();
      return res.status(200).json(results);
    });
  }
};

export const config = {
  bodyParser: true,
};

export default handler;
