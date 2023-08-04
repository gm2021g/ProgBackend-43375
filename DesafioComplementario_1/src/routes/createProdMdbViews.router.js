// va a renderizar
import { Router } from "express";
import mongoose from "mongoose";
import { productModel } from "../dao/models/product.model.js";
const router = Router();

// crear productos, llama al formulario
router.get("/", async (req, res) => {
  try {
    res.render("create", {
      style: "style.css",
    });
  } catch (error) {
    console.log(error);

    res.send({
      succes: false,
      error,
    });
  }
});

// Vista para crear productos
router.post("/", async (req, res) => {
  const productNew = req.body;
  const productGenerated = new productModel(productNew);
  await productGenerated.save();
  // res.redirect("/products/" + productGenerated.id);

  res.render("one", {
    product: productNew,
    style: "style.css",
  });
});

export default router;
