const rateLimit = require('express-rate-limit');
const constants = require('../constants');

module.exports = rateLimit({
    limit: process.env.RATE_LIMIT || constants.DEFAULT_RATE_LIMIT,
    windowMs: process.env.RATE_LIMIT_WINDOW || constants.DEFAULT_RATE_LIMIT_WINDOW,
});