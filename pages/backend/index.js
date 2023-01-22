//Levantamos el servidor backend
const express = require("express");
const app = express();
const path = require("path");


//Uso del enrutador
app.use("/", require("./router"));

app.use(express.static(path.join(__dirname, "./dbimages")));

//Escuchamos al puerto
app.listen(3000, () => {
});
