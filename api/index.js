const express = require('express');
const router = express.Router();
const uploaderMIdlleware = require('../middleware/fileUploader');

const uploadController = require('./upload/controller');
const statusController = require('./status/controller');

router.post('/upload', uploaderMIdlleware, uploadController.upload);
router.get('/status/:uploadId', statusController.getStatus);

module.exports = router;