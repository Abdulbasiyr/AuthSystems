
import express from 'express'
import cors from 'cors'

import authRouter from './routes/auth.route.js'

const app  = express()
const PORT = 3000

app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5173']
}))


app.use('/auth', authRouter)


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})