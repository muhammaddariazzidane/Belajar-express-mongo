import { type Request, type Response } from 'express'
import {
  getProduct as getProductFromDB,
  getProductById,
  insertProduct,
  updateProductById,
  deleteProductById,
} from '../services/product.service'
import { createProductValidation, updateProductValidation } from '../validations/product.validation'
import { handleValidation } from '../helpers/validation.helper'

export const createProduct = async (req: Request, res: Response) => {
  const validatedProduct = await handleValidation(req, res, createProductValidation)
  if (!validatedProduct) return

  try {
    await insertProduct(validatedProduct)
    return res.json({ product: validatedProduct, message: 'success create product' })
  } catch (error) {
    console.error('Internal server error:', error)
    return res.status(500).send('Internal server error')
  }
}

export const getProduct = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req

  if (id) {
    const product = await getProductById(id)
    if (product) return res.status(200).json({ status: true, statusCode: 200, data: product })
    else return res.status(200).json({ status: true, statusCode: 404, message: 'Data Not Found', data: {} })
  } else {
    const products = await getProductFromDB()
    return res.status(200).json({ status: true, statusCode: 200, data: products })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req

  const validatedProduct = await handleValidation(req, res, updateProductValidation)
  if (!validatedProduct) return

  try {
    await updateProductById(id, validatedProduct)
    return res.json({ product: validatedProduct, message: 'success update product' })
  } catch (error) {
    console.error('Internal server error:', error)
    return res.status(500).send('Internal server error')
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req
  const product = await getProductById(id)
  if (product) {
    try {
      await deleteProductById(id)
      return res.json({ message: 'success delete product' })
    } catch (error) {
      console.error('Internal server error:', error)
      return res.status(500).send('Internal server error')
    }
  } else {
    return res.status(200).json({ status: true, statusCode: 404, message: 'Data Not Found', data: {} })
  }
}
