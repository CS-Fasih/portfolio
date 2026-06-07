const { test, describe } = require('node:test');
const assert = require('node:assert');
const { handleContact } = require('./contact.controller');

describe('Contact Controller', () => {
    test('handleContact - should return 400 for invalid email format', async () => {
        const req = {
            body: {
                name: 'John Doe',
                email: 'invalid-email',
                message: 'Hello, World!'
            }
        };

        let responseStatus;
        let responseJson;

        const res = {
            status: (code) => {
                responseStatus = code;
                return res;
            },
            json: (data) => {
                responseJson = data;
                return res;
            }
        };

        await handleContact(req, res);

        assert.strictEqual(responseStatus, 400);
        assert.deepStrictEqual(responseJson, {
            success: false,
            data: null,
            message: 'Invalid email format.'
        });
    });

    test('handleContact - should return 400 for missing email format', async () => {
        const req = {
            body: {
                name: 'John Doe',
                email: '',
                message: 'Hello, World!'
            }
        };

        let responseStatus;
        let responseJson;

        const res = {
            status: (code) => {
                responseStatus = code;
                return res;
            },
            json: (data) => {
                responseJson = data;
                return res;
            }
        };

        await handleContact(req, res);

        assert.strictEqual(responseStatus, 400);
        assert.deepStrictEqual(responseJson, {
            success: false,
            data: null,
            message: 'Name, email, and message are required.'
        });
    });
});
