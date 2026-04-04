
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRouter from './routes/auth.route.js'
import { errorHandling } from './middleware/error.middleware.js'

const app  = express()
const PORT = 3000

app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5173']
}))
app.use(cookieParser())


app.use('/auth', authRouter)


app.use(errorHandling)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})