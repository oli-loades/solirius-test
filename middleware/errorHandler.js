const logger = require('../utils/logger')

module.exports = (err, req, res, next) => {
    logger.error(err)
    res.status(500).end({error: 'Something went wrong.'})
}