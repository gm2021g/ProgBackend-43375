// va a renderizar
import { Router } from "express";
import mongoose from "mongoose";
import { productModel } from "../dao/models/product.model.js";
const router = Router();

// Lista todos los productos
router.get("/", async (req, res) => {
  const products = await productModel.find().lean().exec();
  res.render("index", {
    products,
    style: "style.css",
  });
});

// Muestra un solo producto por el id
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const product = await productModel.findOne({ id: id }).lean().exec();

  res.render("one", { product, style: "style.css" });
});

// update product -- anda con POSTMAN
router.put("/update/:uuid", async (req, res) => {
  const { uuid } = req.params;
  const productToReplace = req.body;
  const result = await productModel.updateOne({ id: uuid }, productToReplace);

  res.send({
    result: "success",
    payload: result,
    style: "style.css",
  });
});

// borra un producto
router.get("/delete/:id", async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  const deleted = await productModel.deleteOne({ _id: id });
  res.redirect("/products");
});

// Lista productos por marca
router.get("/brand/:brand", async (req, res) => {
  const brand = req.params.brand;
  const products = await productModel.find({ brand: brand }).lean().exec();
  res.render("brand", {
    products,
    style: "style.css",
  });
});

export default router;
