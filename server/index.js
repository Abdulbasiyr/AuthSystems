
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRouter from './src/routes/auth.route.js'
import { errorHandling } from './src/middleware/error.middleware.js'
import { rateLimit } from './src/middleware/rateLimit.middeleware.js'

const app  = express()
const PORT = 3001

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())


app.use('/auth', rateLimit, authRouter)


app.use(errorHandling)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})