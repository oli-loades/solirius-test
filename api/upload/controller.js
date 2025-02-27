const csv = require('csv-parser')
const fs = require('fs')

const service = require('./service')

const upload = async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    if (!req.file) {
        return next(new Error('No file uploaded'))
    }

    if (req.file.mimetype !== 'text/csv') {
        return next(new Error('Incorrect file format'))
    }

    const fileId = req.file.filename
    res.write(`${JSON.stringify({
        uploadId: fileId,
        message: "File uploaded successfully. Processing started."
    })}\n`)

    const results = [];
    const stream = fs.createReadStream(req.file.path).pipe(csv()); 
    stream.on('data', (data) => {
        results.push(data)
    })
    stream.on('error', (err) => console.log(err))
    stream.on("end", async () => {
        try {
            const result = await service.processData(fileId, results)
            res.end(JSON.stringify(result))
        } catch (err) {
            next(err)
        }
    })
}

module.exports = {
    upload
}