const connection = require("../backend/connection");
let tabla = "clientes";
let cedula = "";
let nombre = "";
let apellido = "";
let telefono = "";
let email = "";
let fechaNacimiento = "";
let direccion = "";

const handler = async (req, res) => {
  cedula = req.body.cedula;
  nombre = req.body.nombre;
  apellido = req.body.apellido;
  telefono = req.body.telefono;
  email = req.body.email;
  fechaNacimiento = req.body.fechaNacimiento;
  direccion = req.body.direccion;

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
    connection.query("SELECT * FROM clientes", (error, results) => {
      if (error) throw error;
      return res.status(200).json(results);
    });
  }

  function createProduct() {
    const insertar =
      "INSERT INTO " +
      tabla +
      " (cedula, nombre, apellido, precio, categoria) VALUES (NULL, '" +
      nombre +
      "', '" +
      imagen.objectURL +
      "', '" +
      precio +
      "', '" +
      categoria +
      "')";
    connection.query(insertar, (error, results) => {
      if (error) throw error;
      return res.status(200).send("Producto creado");
    });
  }

  function updateProduct() {
    const actualizar =
      "UPDATE " +
      tabla +
      " SET nombre = '" +
      nombre +
      "', imagen = '" +
      imagen.objectURL +
      "', precio = '" +
      precio +
      "', categoria = '" +
      categoria +
      "' WHERE cedula = " +
      cedula +
      "";
    connection.query(actualizar, (error, results) => {
      if (error) throw error;
      return res.status(200).send("Producto actualizado");
    });
  }

  function deleteProduct() {
    const eliminar = "DELETE FROM " + tabla + " WHERE cedula = " + cedula + "";
    connection.query(eliminar, (error, results) => {
      if (error) throw error;
      return res.status(200).send("Producto eliminado");
    });
  }
};

export const config = {
  bodyParser: true,
};

export default handler;
