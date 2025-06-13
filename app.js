require('dotenv').config()
require('express-async-errors')
const express = require('express')
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

const app = express()

// middleware
app.use(express.json())
app.use(notFound)
app.use(errorHandler)

// routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

// products route
app.use('/api/v1/products', productsRouter)

const port = process.env.PORT || 3000
const start = async () => {
    try {
        // connectDB
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()