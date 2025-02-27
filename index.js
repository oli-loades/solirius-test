const express = require('express')
const dotenv = require('dotenv');
const routes = require('./api')
const errorHandler = require('./middleware/errorHandler')

dotenv.config();

const app = express()
const port = process.env.PORT || 3000

app.use(routes)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`App started on port ${port}`)
})
