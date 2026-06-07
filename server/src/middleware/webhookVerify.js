const crypto = require('crypto');

/**
 * Middleware to verify GitHub webhook HMAC-SHA256 signature.
 * Requires raw body — must be applied before json body parser on the webhook route.
 */
function verifyWebhookSignature(req, res, next) {
    const secret = process.env.GITHUB_WEBHOOK_SECRET;

    if (!secret) {
        console.warn('[webhook] No GITHUB_WEBHOOK_SECRET set. Skipping verification.');
        return next();
    }

    const signature = req.headers['x-hub-signature-256'];

    if (!signature) {
        return res.status(401).json({
            success: false,
            data: null,
            message: 'Missing webhook signature.',
        });
    }

    const hmac = crypto.createHmac('sha256', secret);
    const digest = 'sha256=' + hmac.update(JSON.stringify(req.body)).digest('hex');

    const signatureBuffer = Buffer.from(signature);
    const digestBuffer = Buffer.from(digest);

    if (signatureBuffer.length !== digestBuffer.length || !crypto.timingSafeEqual(signatureBuffer, digestBuffer)) {
        return res.status(401).json({
            success: false,
            data: null,
            message: 'Invalid webhook signature.',
        });
    }

    next();
}

module.exports = { verifyWebhookSignature };
