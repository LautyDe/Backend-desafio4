import { Router } from "express";
import ProductManager from "../controllers/productManager.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();
const productManager = new ProductManager("../db/products.json");
const notFound = { error: "Product not found" };

/* ok: 200
   created: 201
   no content: 204
   bad request: 400
   forbidden: 403
   not found: 404
   internal server error: 500
    */

router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getAll();
    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.status(200).json(limitedProducts);
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    console.log(`Error obteniendo los productos: ${error.message}`);
    res.status(500);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getById(parseInt(pid));
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json(notFound);
      throw new Error(`Producto con id ${pid} no encontrado`);
    }
  } catch (error) {
    console.log(`Error obteniendo producto por su id: ${error.message}`);
  }
});

router.get("/", async (req, res) => {});

router.get("/", async (req, res) => {});

export default router;
