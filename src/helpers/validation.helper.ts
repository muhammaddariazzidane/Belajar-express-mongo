import { type Request, type Response } from 'express'
import { ZodError } from 'zod'

type ValidationError = Record<string, string[]>

export const handleValidation = async (
  req: Request,
  res: Response,
  validationFunction: (data: any) => Promise<any>,
) => {
  try {
    const validatedData = await validationFunction(req.body)
    return validatedData
  } catch (error) {
    if (error instanceof ZodError) {
      const validationErrors: ValidationError = {}

      error.errors.forEach((err) => {
        const field = err.path[0] as string
        const errorMessage = err.message

        if (!validationErrors[field]) validationErrors[field] = []

        validationErrors[field].push(errorMessage)
      })

      return res.status(400).json({ error: 'Validation errors', message: validationErrors })
    } else {
      console.error('Internal server error:', error)
      return res.status(500).send('Internal server error')
    }
  }
}
