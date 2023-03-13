import { Router } from "express";
import ProductManager from "../controllers/productManager.js";

const router = Router();
const productManager = new ProductManager("src/db/products.json");
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
    if (!products) {
      throw new Error("No se consiguio info de la database");
    } else {
      if (limit) {
        const limitedProducts = products.slice(0, limit);
        res.status(200).json(limitedProducts);
      } else {
        res.status(200).json(products);
      }
    }
  } catch (error) {
    console.log(`Error obteniendo los productos: ${error.message}`);
    res.status(500).json(notFound);
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

router.post("/", async (req, res) => {});

router.get("/", async (req, res) => {});

export default router;
