const express = require('express')
const router = express.Router()

const multer = require("multer")
const csv = require('csv-parser')
const fs = require('fs')

const service = require('./service')

const upload = multer({ dest: './uploads' })

router.post("/upload", upload.single("file"), async (req, res) => {
    const results = [];
    if (!req.file) {
        // handle error
    }

    const fileId = req.file.filename
    res.write(JSON.stringify({
        uploadId: fileId,
        message: "File uploaded successfully. Processing started."
    }))
    const stream = fs.createReadStream(req.file.path).pipe(csv());
    
    stream.on('data', (data) => {
        results.push(data)
    })
    stream.on('error', (err) => console.log(err))
    stream.on("end", async () => {
        const result = await service.processData(fileId, results)
        res.write(JSON.stringify(result))
        res.end()
    })
})

module.exports = router