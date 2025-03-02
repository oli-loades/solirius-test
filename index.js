const express = require('express')
const dotenv = require('dotenv');
const routes = require('./api')
const errorHandler = require('./middleware/errorHandler')
const rateLimiter = require('./middleware/rateLimiter')

dotenv.config();

const app = express()
const port = process.env.PORT || 3000

//gloabl middleware
app.use(rateLimiter)

// routes
app.use(routes)

//global error handler
app.use(errorHandler)

app.listen(port, () => {
    console.log(`App started on port ${port}`)
})
