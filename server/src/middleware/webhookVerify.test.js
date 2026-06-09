const test = require('node:test');
const assert = require('node:assert');
const crypto = require('crypto');
const { verifyWebhookSignature } = require('./webhookVerify');

test('verifyWebhookSignature Middleware', async (t) => {

    const createMockReq = (headers = {}, body = {}) => ({
        headers,
        body
    });

    const createMockRes = () => {
        const res = {};
        res.status = (code) => {
            res.statusCode = code;
            return res;
        };
        res.json = (data) => {
            res.jsonData = data;
            return res;
        };
        return res;
    };

    await t.test('skips verification if GITHUB_WEBHOOK_SECRET is not set', (t) => {
        const originalSecret = process.env.GITHUB_WEBHOOK_SECRET;
        delete process.env.GITHUB_WEBHOOK_SECRET;

        let nextCalled = false;
        const next = () => { nextCalled = true; };

        const req = createMockReq();
        const res = createMockRes();

        verifyWebhookSignature(req, res, next);

        assert.strictEqual(nextCalled, true);

        if (originalSecret !== undefined) {
            process.env.GITHUB_WEBHOOK_SECRET = originalSecret;
        }
    });

    await t.test('returns 401 if signature is missing', (t) => {
        const originalSecret = process.env.GITHUB_WEBHOOK_SECRET;
        process.env.GITHUB_WEBHOOK_SECRET = 'my-secret';

        let nextCalled = false;
        const next = () => { nextCalled = true; };

        const req = createMockReq();
        const res = createMockRes();

        verifyWebhookSignature(req, res, next);

        assert.strictEqual(nextCalled, false);
        assert.strictEqual(res.statusCode, 401);
        assert.deepStrictEqual(res.jsonData, {
            success: false,
            data: null,
            message: 'Missing webhook signature.',
        });

        process.env.GITHUB_WEBHOOK_SECRET = originalSecret;
    });

    await t.test('returns 401 if signature is invalid (different length)', (t) => {
        const originalSecret = process.env.GITHUB_WEBHOOK_SECRET;
        process.env.GITHUB_WEBHOOK_SECRET = 'my-secret';

        let nextCalled = false;
        const next = () => { nextCalled = true; };

        const req = createMockReq({
            'x-hub-signature-256': 'sha256=invalid'
        }, { action: 'opened' });
        const res = createMockRes();

        verifyWebhookSignature(req, res, next);

        assert.strictEqual(nextCalled, false);
        assert.strictEqual(res.statusCode, 401);
        assert.deepStrictEqual(res.jsonData, {
            success: false,
            data: null,
            message: 'Invalid webhook signature.',
        });

        process.env.GITHUB_WEBHOOK_SECRET = originalSecret;
    });

    await t.test('returns 401 if signature is invalid (same length)', (t) => {
        const secret = 'my-secret';
        const originalSecret = process.env.GITHUB_WEBHOOK_SECRET;
        process.env.GITHUB_WEBHOOK_SECRET = secret;

        let nextCalled = false;
        const next = () => { nextCalled = true; };

        const body = { action: 'opened' };

        // Generate an invalid signature of the exact same length (71 chars for sha256= + 64 hex chars)
        const invalidSignature = 'sha256=' + '0'.repeat(64);

        const req = createMockReq({
            'x-hub-signature-256': invalidSignature
        }, body);
        const res = createMockRes();

        verifyWebhookSignature(req, res, next);

        assert.strictEqual(nextCalled, false);
        assert.strictEqual(res.statusCode, 401);
        assert.deepStrictEqual(res.jsonData, {
            success: false,
            data: null,
            message: 'Invalid webhook signature.',
        });

        process.env.GITHUB_WEBHOOK_SECRET = originalSecret;
    });

    await t.test('calls next if signature is valid', (t) => {
        const secret = 'my-secret';
        const originalSecret = process.env.GITHUB_WEBHOOK_SECRET;
        process.env.GITHUB_WEBHOOK_SECRET = secret;

        let nextCalled = false;
        const next = () => { nextCalled = true; };

        const body = { action: 'opened' };

        const hmac = crypto.createHmac('sha256', secret);
        const validSignature = 'sha256=' + hmac.update(JSON.stringify(body)).digest('hex');

        const req = createMockReq({
            'x-hub-signature-256': validSignature
        }, body);
        const res = createMockRes();

        verifyWebhookSignature(req, res, next);

        assert.strictEqual(nextCalled, true);
        assert.strictEqual(res.statusCode, undefined);

        process.env.GITHUB_WEBHOOK_SECRET = originalSecret;
    });

});
