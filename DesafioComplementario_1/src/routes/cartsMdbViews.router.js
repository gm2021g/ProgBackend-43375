// va a renderizar
import { Router } from "express";
import mongoose from "mongoose";
import { cartModel } from "../dao/models/cart.model.js";
const router = Router();

// Muestra el cart
router.get("/", async (req, res) => {
  const carts = await cartModel.find().lean().exec();
  res.render("cartIndex", {
    carts,
    style: "style.css",
  });
});

/*
// agrega un producto al cart
router.get('/addcart/:id', async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const addcart = await cartModel.deleteOne({ _id: id })
    res.redirect('/carts')
})


// Lista todos los carts
router.get('/', async (req, res) => {
    const carts = await cartModel.find().lean().exec()
    res.render('index', {
        carts
    })
})

// Vista para crear carts
router.get('/create', async (req, res) => {
    res.render('create', {})
})

// Vista para crear carts
router.post('/create', async (req, res) => {
    const cartNew = req.body
    const cartGenerated = new cartModel(cartNew)
    await cartGenerated.save();

    res.redirect('/carts/' + cartGenerated.id)
})


// borra un cart
router.get('/delete/:id', async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const deleted = await cartModel.deleteOne({ _id: id })
    res.redirect('/carts')
})

*/

export default router;
