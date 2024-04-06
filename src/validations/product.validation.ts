import { z } from 'zod'
import { type ProductType } from '../types/product.type'

export const createProductValidation = async (payload: ProductType) => {
  const schema = z
    .object({
      name: z.string(),
      price: z.number(),
    })
    .required()
  return await schema.parseAsync(payload)
}

export const updateProductValidation = async (payload: ProductType) => {
  const schema = z.object({
    name: z.string(),
    price: z.number(),
  })

  return await schema.parseAsync(payload)
}
