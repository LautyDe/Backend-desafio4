import { Router } from "express";
import ProductManager from "../controllers/productManager";

const router = Router();
const productManager = new ProductManager("../db/productos.json");
const notFound = { error: "Product not found" };

router.get("/", async (req, res) => {
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

router.get("/", async (req, res) => {});

router.get("/", async (req, res) => {});

router.get("/", async (req, res) => {});

export default router;
