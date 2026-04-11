const rateLimit = require('express-rate-limit');

/**
 * Rate limiter for the chat endpoint.
 * 20 requests per IP per hour.
 */
const chatRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        data: null,
        message: 'Too many chat requests. Please try again later.',
    },
});

module.exports = { chatRateLimiter };
