import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import './utils/connect'
import { routes } from './routes'

const app = express()
const PORT = process.env.PORT ?? 4000

app.use(cors())
app.use(express.json())

routes(app)

app.listen(PORT, () => {
  console.log(`jalan di port ${PORT}`)
})
