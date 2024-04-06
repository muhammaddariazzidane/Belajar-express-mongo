import { type ProductType } from '../types/product.type'
import { productModel } from '../models/product.model'

export const getProduct = async () => {
  return await productModel.find()
}
export const getProductById = async (id: string) => {
  return await productModel.findOne({ _id: id })
}

export const insertProduct = async (payload: ProductType) => {
  return await productModel.create(payload)
}

export const updateProductById = async (id: string, payload: ProductType) => {
  return await productModel.findOneAndUpdate(
    {
      _id: id,
    },
    { $set: payload },
  )
}

export const deleteProductById = async (id: string) => {
  return await productModel.findOneAndDelete({ _id: id })
}
