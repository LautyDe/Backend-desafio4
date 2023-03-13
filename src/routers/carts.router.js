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

router.post("/", (req, res) => {});

router.get("/:cid", (req, res) => {});

router.post("/:cid/product/:pid", (req, res) => {});

export default router;
