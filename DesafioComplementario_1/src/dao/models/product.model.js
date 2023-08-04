import mongoose from 'mongoose'

// Nombre de la coleccion
const productCollection = 'products'

// Esquema del documento
const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    brand: String,
    gender: String,
    description: String,
    size: Number,
    price: Number,
    photo: String
})

// Creacion del modelo. Collecion + Schema
export const productModel = mongoose.model(productCollection, productSchema)