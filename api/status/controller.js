const service = require('./service')

const getStatus = (req, res, next) => {
    try {
        const status = service.getStatus(req.params.uploadId)
        res.send(status)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getStatus
}