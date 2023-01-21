const connection = require("../backend/connection");
let tabla = 'producto';
let codigo = null;
let nombre = '';
let precio = 0;
let categoria = '';

const handler = async (req, res) => {
  codigo = req.body.codigo;
  nombre = req.body.nombre;
  precio = req.body.precio;
  categoria = req.body.categoria;

  switch (req.method) {
    case "GET":
      return getProducts();
    case "POST":
      return createProduct();
    case "PUT":
      return updateProduct();
    case "DELETE":
      return deleteProduct();
    default:
      return res.status(400).json({ message: "Error, método no existe" });
  }

  function getProducts() {
    connection.query("SELECT * FROM producto", (error, results) => {
      if (error) throw error;
      return res.status(200).json(results);
    });
  }

 function createProduct() {
  const insertar = "INSERT INTO " + tabla + " (codigo, nombre, precio, categoria) VALUES (NULL, '" + nombre + "', '" + precio + "', '" + categoria + "')";
  connection.query(insertar, (error, results) => {
      if (error) throw error;
      return res.status(200).send("Producto creado");
  });
  }

  function updateProduct() {
    const actualizar = "UPDATE " + tabla + " SET nombre = '" + nombre + "', precio = '" + precio +  "', categoria = '" + categoria + "' WHERE codigo = " + codigo + "";
    connection.query(actualizar, (error, results) => {
      if(error) throw error;
      return res.status(200).send("Producto actualizado");
    });
    };

  function deleteProduct() {
    const eliminar = "DELETE FROM " + tabla + " WHERE codigo = " + codigo + "";
    connection.query(eliminar, (error, results) => {
      if(error) throw error;
      return res.status(200).send("Producto eliminado");
    });
  };

};

export const config = {
  bodyParser: true
};

export default handler;
