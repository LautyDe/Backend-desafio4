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
  const limit = req.query.limit;
  const products = await productManager.getAll();

  if (limit) {
    const limitedProducts = products.slice(0, limit);
    res.status(200).json(limitedProducts);
  } else {
    res.status(200).json(products);
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productManager.getById(parseInt(pid));
  product ? res.status(200).json(product) : res.status(404).json(notFound);
});

router.post("/", async (req, res) => {
  const product = req.body;
  const addedProduct = await productManager.addProduct(product);
  if (!addedProduct) {
    res.status(400).json({ error: "No se pudo agregar el producto" });
  } else {
    res.status(201).json(product);
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const modification = req.body;
  const modifiedProduct = await productManager.updateProduct(
    parseInt(pid),
    modification
  );
  if (!modifiedProduct) {
    res.status(400).json({ error: `No se pudo modificar el producto` });
  } else {
    res.status(200).json(modifiedProduct);
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const removedProduct = await productManager.deleteById(parseInt(pid));
  if (!removedProduct) {
    res.status(404).json(notFound);
  } else {
    res.status(200).json(removedProduct);
  }
});

export default router;
