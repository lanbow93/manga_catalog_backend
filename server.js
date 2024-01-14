import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import userRouter from './controllers/User.js'
import seriesRouter from './controllers/Series.js'

dotenv.config()
const app = express()

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL.split(',')
  })
)
app.use(express.json())
app.use(morgan('common'))
app.use(cookieParser())
app.use('/user', userRouter)
app.use('/series', seriesRouter)

app.get('/', (request, response) => {
  response.send('Server is functional')
})

const PORT = process.env.PORT | 7777
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
