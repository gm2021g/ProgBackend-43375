// va a renderizar
import { Router } from "express";
import mongoose from "mongoose";
import { productModel } from "../dao/models/product.model.js";
const router = Router();

// Muestra un solo producto por el id
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const product = await productModel.findOne({ id: id }).lean().exec();
  res.render("one", { product, style: "style.css" });
});

export default router;
