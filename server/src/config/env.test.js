const { test, describe, beforeEach, afterEach, mock } = require('node:test');
const assert = require('node:assert');
const { validateEnv } = require('./env');

describe('validateEnv', () => {
    let originalEnv;
    let warnMock;

    beforeEach(() => {
        originalEnv = { ...process.env };
        warnMock = mock.method(console, 'warn', () => {});

        // Clear process.env to have a clean state for testing
        Object.keys(process.env).forEach(key => delete process.env[key]);
    });

    afterEach(() => {
        // Restore process.env
        Object.keys(process.env).forEach(key => delete process.env[key]);
        Object.assign(process.env, originalEnv);

        mock.restoreAll();
    });

    test('should not log a warning if all required variables are set', () => {
        process.env.MONGODB_URI = 'mongodb://localhost';
        process.env.GROQ_API_KEY = 'groq_key';
        process.env.GITHUB_USERNAME = 'user';
        process.env.GITHUB_TOKEN = 'token';

        const result = validateEnv();

        assert.strictEqual(warnMock.mock.callCount(), 0);
        assert.strictEqual(result.mongoUri, 'mongodb://localhost');
        assert.strictEqual(result.groqApiKey, 'groq_key');
        assert.strictEqual(result.githubUsername, 'user');
        assert.strictEqual(result.githubToken, 'token');
    });

    test('should log a warning if required variables are missing', () => {
        process.env.MONGODB_URI = 'mongodb://localhost';
        // missing GROQ_API_KEY, GITHUB_USERNAME, GITHUB_TOKEN

        const result = validateEnv();

        assert.strictEqual(warnMock.mock.callCount(), 1);
        const warnArgs = warnMock.mock.calls[0].arguments;
        assert.ok(warnArgs[0].includes('Missing environment variables: GROQ_API_KEY, GITHUB_USERNAME, GITHUB_TOKEN'));

        assert.strictEqual(result.mongoUri, 'mongodb://localhost');
        assert.strictEqual(result.groqApiKey, undefined);
    });

    test('should return default values for optional variables when not set', () => {
        process.env.MONGODB_URI = 'mongodb://localhost';
        process.env.GROQ_API_KEY = 'groq_key';
        process.env.GITHUB_USERNAME = 'user';
        process.env.GITHUB_TOKEN = 'token';
        // PORT, GITHUB_WEBHOOK_SECRET, CLIENT_ORIGIN, NODE_ENV are not set

        const result = validateEnv();

        assert.strictEqual(result.port, 5000);
        assert.strictEqual(result.githubWebhookSecret, '');
        assert.strictEqual(result.clientOrigin, 'http://localhost:5173');
        assert.strictEqual(result.nodeEnv, 'development');
    });

    test('should parse PORT correctly', () => {
        process.env.PORT = '8080';
        const result = validateEnv();
        assert.strictEqual(result.port, 8080);
    });
});
