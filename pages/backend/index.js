//Levantamos el servidor backend
const express = require("express");
const app = express();

app.set({
  "Access-Control-Allow-Origin": "https:/localhost:3001",
});

//Uso del enrutador
app.use("/", require("./router"));

//Escuchamos al puerto
app.listen(3001, () => {
  console.log("Escuchando en el puerto 3001");
});
