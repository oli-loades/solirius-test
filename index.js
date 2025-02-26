const express = require('express')
const dotenv = require('dotenv');
const multer = require("multer")
const csv = require('csv-parser')
const fs = require('fs')

dotenv.config();

const upload = multer({ dest: './uploads'})

const app = express()
const port = process.env.PORT || 3000

app.post("/upload", upload.single("file"), (req, res) => {
    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('error', (err) => console.log(err))
        .on("end", () => {
            console.log(results);
        })
    res.json({
        uploadId: req.file.filename,
        message: "File uploaded successfully. Processing started."
    })
})

app.listen(port, () => {
  console.log(`App started on port ${port}`)
})
