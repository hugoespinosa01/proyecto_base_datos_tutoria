const connection = require("../backend/connection");
let tabla = "cliente";
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
      return getCustomers();
    case "POST":
      return createCustomer();
    case "PUT":
      return updateCustomer();
    case "DELETE":
      return deleteCustomer();
    default:
      return res.status(400).json({ message: "Error, método no existe" });
  }

  function getCustomers() {
    connection.query("SELECT * FROM " + tabla, (error, results) => {
      if (error) throw error;
      return res.status(200).json(results);
    });
  }

  function createCustomer() {
    const insertar =
      "INSERT INTO " +
      tabla +
      " (cedula, nombre, apellido, telefono, email, fechaNacimiento, direccion) VALUES ('" +
      cedula +
      "', '" +
      nombre +
      "', '" +
      apellido +
      "', '" +
      telefono +
      "', '" +
      email +
      "', '" +
      fechaNacimiento +
      "', '" +
      direccion +
      "')";
      
    connection.query(insertar, (error, results) => {
      if (error) throw error;
      return res.status(200).send("Cliente creado");
    });
  }

  function updateCustomer() {
    const actualizar =
      "UPDATE " +
      tabla +
      " SET nombre = '" +
      nombre +
      "', apellido = '" +
      apellido +
      "', telefono = '" +
      telefono +
      "', email = '" +
      email +
      "', fechaNacimiento = '" +
      fechaNacimiento +
      "', direccion = '" +
      direccion +
      "' WHERE cedula = '" +
      cedula +
      "'";
    connection.query(actualizar, (error, results) => {
      if (error) throw error;
      return res.status(200).send("Cliente actualizado");
    });
  }

  function deleteCustomer() {
    const eliminar = "DELETE FROM " + tabla + " WHERE cedula = '" + cedula + "'";
    console.log(eliminar);
    connection.query(eliminar, (error, results) => {
      if (error) throw error;
      return res.status(200).send("Cliente eliminado");
    });
  }
};

export const config = {
  bodyParser: true,
};

export default handler;
