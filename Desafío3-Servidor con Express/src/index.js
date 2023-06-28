const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

const ProductManager = require("./ProductManager.js");

const productos = new ProductManager("./src/productos.json");

app.get("/products", (req, res) => {
  // Obtengo req.query
  const limit = req.query.limit;
  if (limit !== null && limit !== undefined) {
    //Si existe req.query

    const getProductsLimit = async function () {
      const products = await productos.getProducts();
      const productsLimit = products.slice(0, limit);
      res.send(productsLimit);
    };
    getProductsLimit();
  } else {
    // Trae todos los elementos del array de productos ...

    const getAllProducts = async function () {
      const products = await productos.getProducts();
      //console.log(result)
      res.send(products);
    };
    getAllProducts();
  }
});

app.get("/products/:id", (req, res) => {
  const getProductsId = async function () {
    const productsId = await productos.getProductById(req.params.id);
    res.send(productsId);
  };
  getProductsId();
});

app.listen(8080, () => {
  console.log("Servidor arriba y escuchando el puerto 8080!!");
});
