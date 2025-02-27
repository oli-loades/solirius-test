const csv = require('csv-parser')
const fs = require('fs')
const logger = require('../../utils/logger')

const service = require('./service')

const upload = async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    if (!req.file) {
        return res.status(400).send({ error: 'File is missing'})
    }

    if (req?.file?.mimetype !== 'text/csv') {
        return res.status(400).send({ error: 'Incorrect file format'})
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
    stream.on('error', (err) => logger.error(err))
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