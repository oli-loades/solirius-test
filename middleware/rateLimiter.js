const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
    limit: process.env.RATE_LIMIT || 10,
    windowMs: process.env.RATE_LIMIT_WINDOW || 60000,
});