const express = require('express')
const dotenv = require('dotenv');
const routes = require('./api')

dotenv.config();

const app = express()
const port = process.env.PORT || 3000

app.use(routes)

app.listen(port, () => {
    console.log(`App started on port ${port}`)
})
