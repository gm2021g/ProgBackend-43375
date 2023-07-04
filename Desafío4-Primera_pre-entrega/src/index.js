import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use("/", (req, res) => res.send("HOME"));

app.listen(8080, () => {
  console.log("Servidor arriba y escuchando el puerto 8080!!");
});
