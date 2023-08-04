import express from "express";
//import productsRouter from './routes/products.router.js'  // con fileSystem
import cartsRouter from "./routes/carts.router.js"; // con fileSystem

import productsRouterMdbApi from "./routes/productsMdbApi.router.js";
import productsRouterMdbViews from "./routes/productsMdbViews.router.js";
import cartsRouterMdbViews from "./routes/cartsMdbViews.router.js";
import chatRouterMdbViews from "./routes/chatMdbViews.router.js";
import createProdMdbViews from "./routes/createProdMdbViews.router.js";
import productMdbViews from "./routes/productMdbViews.router.js";

import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import socket from "./socket.js";

const app = express();

const httpServer = app.listen(8080, () =>
  console.log("Listening on PORT 8080...")
);
const io = new Server(httpServer);

app.use(bodyParser.json()); // para traer la info del post como json
app.use(bodyParser.urlencoded({ extended: true }));

// configura motor de plantilla
app.engine("handlebars", handlebars.engine()); // definir nombre de plantilla
app.set("views", __dirname + "/views"); // definir donde estan las vistas
app.set("view engine", "handlebars"); // setear el motor de plantilla en la aplicación

// configura carpeta pública}
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.io = io;
  return next();
});

// Conexion a DB Mongo Atlas

//const MONGO_URI = 'mongodb+srv://gm2021g:edaRYZgZVYuNMGyY@cluster.0vufeyj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGO_URI =
  "mongodb+srv://gm2021g:ts66TYveMZ8VU7m1@cluster0.wydpbra.mongodb.net/BACKEND-43375?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URI, (error) => {
  if (error) {
    console.error("No se pudo conectar a la DB");
    return;
  }

  console.log("DB conected !!!");
});

// configura las rutas
app.use("/product", productMdbViews); // ruta de vistas
app.use("/create", createProdMdbViews); // ruta de vistas
app.use("/products", productsRouterMdbViews); // ruta de vistas
app.use("/api/products", productsRouterMdbApi); // ruta de api
app.use("/api/carts", cartsRouter);// ruta de api
app.use("/cart", cartsRouterMdbViews); // ruta de vistas
app.use("/chat", chatRouterMdbViews); // ruta de vistas

app.use("/", (req, res) => res.send("HOME"));

// socket
socket(io);
