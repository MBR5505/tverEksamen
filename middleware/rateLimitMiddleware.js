const rateLimit = require('express-rate-limit');

const strictLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // 5 requests per hour
    message: 'For mange forespørsler for denne operasjonen, prøv igjen senere',
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        return req.ip // Will use X-Forwarded-For from trusted proxy
    }
});

const standardLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per 15 minutes
    message: 'For mange forespørsler, prøv igjen senere',
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        return req.ip // Will use X-Forwarded-For from trusted proxy
    }
});

module.exports = { strictLimiter, standardLimiter };
