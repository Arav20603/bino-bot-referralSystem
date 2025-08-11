import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './App/dB/connectDB.js'
import userRouter from './App/routes/user.routes.js'

dotenv.config()
let app = express()
app.use(express.json())
app.use(cors())

app.use('/api/web/bino-bot/', userRouter)

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port: ${process.env.PORT || 3000}`)
  connectDB()
})