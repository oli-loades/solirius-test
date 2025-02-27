const express = require('express')
const router = express.Router()
const multer = require("multer")

const uploadController = require('./upload/controller')

const uploader = multer({ dest: './uploads' })

router.use('/upload', uploader.single('file'), uploadController.upload)

module.exports = router