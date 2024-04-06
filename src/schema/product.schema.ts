import mongoose from 'mongoose'

export const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true },
)
