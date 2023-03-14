import { Router } from "express";
import ProductManager from "../controllers/productManager.js";

const router = Router();
const productManager = new ProductManager("src/db/products.json");
const cartManager = new ProductManager("src/db/carts.json");
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
  const cart = {
    products: [],
  };
  const newCart = await cartManager.addProduct(cart);
});

router.get("/:cid", async (req, res) => {});

router.post("/:cid/product/:pid", async (req, res) => {});

export default router;
