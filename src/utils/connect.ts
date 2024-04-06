import mongoose from 'mongoose'
import { CONFIG } from '../config/db.config'

mongoose
  .connect(`${CONFIG.db}`)
  .then(() => {
    console.log('connect to mongo')
  })
  .catch((error) => {
    console.log(`error ${error}`)
  })
