import { Router } from "express";

export const router = Router();

router.use("/products", products);
router.use("/carts", carts);
