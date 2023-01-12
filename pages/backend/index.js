//Levantamos el servidor backend
const express = require("express");
const app = express();


//Uso del enrutador
app.use("/", require("./router"));

//Escuchamos al puerto
app.listen(3000, () => {
  console.log("Escuchando en el puerto 3000");
});
