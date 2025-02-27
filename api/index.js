const express = require('express')
const router = express.Router()
const multer = require("multer")

const uploadController = require('./upload/controller')
const statusController = require('./status/controller')

const uploader = multer({ dest: './uploads' })

router.post('/upload', uploader.single('file'), uploadController.upload)
router.get('/status/:uploadId', statusController.getStatus)

module.exports = router