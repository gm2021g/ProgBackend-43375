// devuelve json
import { Router } from "express";
import { productModel } from "../dao/models/product.model.js";
const router = Router();

router.get("/", async (req, res) => {
  const products = await productModel.find();
  res.json(products);
});

router.post("/", async (req, res) => {
  const result = await productModel.create(req.body);
  console.log("productsMdbApi");
  res.json(result);
});

export default router;
