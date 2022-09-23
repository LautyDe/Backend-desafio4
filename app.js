const express = require("express");
const bp = require("body-parser");
const routers = require("./routers");
const handlebars = require("express-handlebars");
const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use("/api", routers);

const PORT = process.env.NODE_PORT;
const ENV = process.env.NODE_ENV;

/* Middleware incorporado */

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
  console.log(`http://localhost:${server.address().port}`);
  console.log(`Environment:${ENV}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
