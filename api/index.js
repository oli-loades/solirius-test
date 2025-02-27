const express = require('express')
const router = express.Router()

const uploadController = require('./upload/controller')

router.use(uploadController)

module.exports = router