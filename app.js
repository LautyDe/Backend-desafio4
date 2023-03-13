import express from "express";
import ProductManager from "./src/controllers/productManager.js";
import routers from "./src/routers";
//import { dirname } from "path";
//import { fileURLToPath } from "url";

const productManager = new ProductManager("./productos.json");
const app = express();
const PORT = 8080;
//const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ok: 200
   created: 201
   no content: 204
   bad request: 400
   forbidden: 403
   not found: 404
   internal server error: 500
    */

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

app.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getAll();
    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.json(limitedProducts);
    } else {
      res.json(products);
    }
  } catch (error) {
    console.log(`Error obteniendo los productos: ${error.message}`);
    res.status(500);
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getById(parseInt(pid));
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
      throw new Error(`Producto con id ${pid} no encontrado`);
    }
  } catch (error) {
    console.log(`Error obteniendo producto por su id: ${error.message}`);
  }
});

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
  console.log(`http://localhost:${PORT}`);
});
server.on("error", error => console.log(`Error en servidor: ${error.message}`));
