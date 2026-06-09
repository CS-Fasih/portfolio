const test = require('node:test');
const assert = require('node:assert');
const Module = require('node:module');

test('github controller getRepos handles getCachedRepos error', async (t) => {
    // Save the original require
    const originalRequire = Module.prototype.require;

    // Override require to mock github.service
    Module.prototype.require = function(id) {
        if (id === '../services/github.service') {
            return {
                getCachedRepos: async () => {
                    throw new Error('Test Mock Error');
                },
                syncAllRepos: async () => {},
                syncSingleRepo: async () => {}
            };
        }
        return originalRequire.apply(this, arguments);
    };

    // Require the controller after the mock is set up
    const { getRepos } = require('./github.controller');

    // Create mock req and res
    const req = {};
    let statusCode;
    let jsonResponse;

    const res = {
        status: (code) => {
            statusCode = code;
            return res;
        },
        json: (data) => {
            jsonResponse = data;
        }
    };

    // Capture console.error to avoid noise in test output
    const originalConsoleError = console.error;
    let consoleErrorOutput = '';
    console.error = (...args) => {
        consoleErrorOutput += args.join(' ');
    };

    try {
        await getRepos(req, res);

        assert.strictEqual(statusCode, 500, 'Status code should be 500');
        assert.deepStrictEqual(jsonResponse, {
            success: false,
            data: null,
            message: 'Failed to fetch repositories.',
        }, 'Response JSON should match error format');
        assert.ok(consoleErrorOutput.includes('Test Mock Error'), 'Should log the error message');
    } finally {
        // Restore console.error
        console.error = originalConsoleError;
        // Restore require
        Module.prototype.require = originalRequire;
        // Clear require cache for the controller so subsequent tests get a fresh instance
        delete require.cache[require.resolve('./github.controller')];
    }
});
