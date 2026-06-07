import { test, describe } from 'node:test';
import assert from 'node:assert';
import api, { sendContactMessage } from './api.js';

describe('api service', () => {
    test('sendContactMessage throws an error when API fails with custom message', async () => {
        const originalPost = api.post;

        api.post = async () => {
            const error = new Error('Network Error');
            error.response = {
                data: {
                    message: 'Custom error message from backend'
                }
            };
            throw error;
        };

        try {
            await assert.rejects(
                sendContactMessage({ name: 'Test', email: 'test@example.com', message: 'Hello' }),
                (err) => {
                    assert.strictEqual(err.message, 'Custom error message from backend');
                    return true;
                }
            );
        } finally {
            api.post = originalPost;
        }
    });

    test('sendContactMessage throws default error when response has no message', async () => {
        const originalPost = api.post;

        api.post = async () => {
            throw new Error('Network Error');
        };

        try {
            await assert.rejects(
                sendContactMessage({ name: 'Test', email: 'test@example.com', message: 'Hello' }),
                (err) => {
                    assert.strictEqual(err.message, 'Failed to send message.');
                    return true;
                }
            );
        } finally {
            api.post = originalPost;
        }
    });
});
