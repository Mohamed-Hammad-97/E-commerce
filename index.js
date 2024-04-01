import 'dotenv/config.js'
import express from 'express'
import { connection } from './db connection/connection.js'
import { allRoutes } from './src/modules/routes.js'
import { AppError } from './src/utils/AppError.js'
import cors from 'cors'
const app = express()
const port = 3000

app.use(cors)
app.use(express.json())
app.use("/uploads", express.static("uploads"))
connection()
allRoutes(app)


app.use('*', (req, res, next) => {
    next(new AppError("URL not Found", 404))
})
app.use((err, req, res, next) => {
    process.env.MODE == 'dev' ? res.status(err.statusCode).json({ message: err.message, stack: err.stack }) : res.status(err.statusCode).json({ message: err.message })
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${port}`)
})