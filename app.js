import express from "express";
import routers from "./src/routers/index.routers.js";
//import { dirname } from "path";
//import { fileURLToPath } from "url";

const app = express();
const PORT = 8080;
//const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  try {
    res.send(
      `<h1 style="text-align: center">Bienvenido a mi nueva entrega! 😎</h1>`
    );
  } catch (error) {
    console.log(`Error cargando el proyecto: ${error.message}`);
  }
});

app.use("/api", routers);

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
  console.log(`http://localhost:${PORT}`);
});
server.on("error", error => console.log(`Error en servidor: ${error.message}`));
