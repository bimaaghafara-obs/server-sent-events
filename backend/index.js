require('dotenv').config()
const cors = require('cors');
const express = require('express')

const feedRoutes = require('./routes/feeds')

// express app
const app = express()

// middleware
app.use(cors())
app.use(express.json())


app.use((req, res, next) => {
  console.log(new Date().toLocaleString(), '=>', req.path, req.method)
  next()
})

// routes
app.use('/api/feeds', feedRoutes)

// app
app.listen(process.env.PORT, () => {
  console.log('listening for requests on port', process.env.PORT)
})