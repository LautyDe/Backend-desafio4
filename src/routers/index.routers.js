import { Router } from "express";
import products from "./products.router";
import carts from "./carts.router";

const router = Router();

router.use("/products", products);
router.use("/carts", carts);

export default router;
