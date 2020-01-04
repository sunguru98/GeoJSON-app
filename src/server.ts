import express, { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import './db'

const app: Express = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api/stores', require('./routes/storeRoutes'))

app.get('/', (_: express.Request, res: express.Response): void => {
  res.sendStatus(200)
})

app.listen(PORT, () => console.log(`Server connected to PORT ${PORT}`))
