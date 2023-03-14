import { Router } from "express";
import CartManager from "../controllers/cartManager.js";
import ProductManager from "../controllers/productManager.js";

const router = Router();
const productManager = new ProductManager("src/db/products.json");
const cartManager = new CartManager("src/db/carts.json");
const notFound = { error: "Product not found" };

/* ok: 200
   created: 201
   no content: 204
   bad request: 400
   forbidden: 403
   not found: 404
   internal server error: 500
    */

router.post("/", async (req, res) => {
  await cartManager.addCart();
  res.status(201).json({ mensaje: "Carrito creado con exito" });
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getById(parseInt(cid));
  !cart ? res.status(404).json(notFound) : res.status(200).json(cart);
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
});

export default router;
