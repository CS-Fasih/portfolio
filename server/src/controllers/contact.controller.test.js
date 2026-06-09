const { describe, it, mock } = require('node:test');
const assert = require('node:assert');
const { handleContact } = require('./contact.controller');

describe('Contact Controller', () => {
    describe('handleContact', () => {
        it('should return 400 if name is missing', async () => {
            const req = {
                body: {
                    email: 'test@example.com',
                    message: 'Hello'
                }
            };
            const res = {
                status: mock.fn(() => res),
                json: mock.fn(() => res)
            };
            await handleContact(req, res);
            assert.strictEqual(res.status.mock.calls.length, 1);
            assert.strictEqual(res.status.mock.calls[0].arguments[0], 400);
        });

        it('should return 400 if email is missing', async () => {
            const req = {
                body: {
                    name: 'Test Name',
                    message: 'Hello'
                }
            };
            const res = {
                status: mock.fn(() => res),
                json: mock.fn(() => res)
            };
            await handleContact(req, res);
            assert.strictEqual(res.status.mock.calls.length, 1);
            assert.strictEqual(res.status.mock.calls[0].arguments[0], 400);
        });

        it('should return 400 if message is missing', async () => {
            const req = {
                body: {
                    name: 'Test Name',
                    email: 'test@example.com'
                }
            };
            const res = {
                status: mock.fn(() => res),
                json: mock.fn(() => res)
            };
            await handleContact(req, res);
            assert.strictEqual(res.status.mock.calls.length, 1);
            assert.strictEqual(res.status.mock.calls[0].arguments[0], 400);
        });
    });
});
