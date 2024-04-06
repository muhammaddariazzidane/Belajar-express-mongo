import mongoose from 'mongoose'
import { productSchema } from '../schema/product.schema'

export const productModel = mongoose.model('product', productSchema)
