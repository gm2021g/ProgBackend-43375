import mongoose from 'mongoose'

// Nombre de la coleccion
const cartCollection = 'carts'

// Esquema del documento
const cartSchema = new mongoose.Schema({
    id: Number,
    product: [
        {
            id: Number,
            quantity: Number
        }
    ]
})

// Creacion del modelo. Collecion + Schema
export const cartModel = mongoose.model(cartCollection, cartSchema)