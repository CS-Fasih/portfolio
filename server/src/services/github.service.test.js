const test = require('node:test');
const assert = require('node:assert');
const Module = require('node:module');

const originalRequire = Module.prototype.require;

test('github.service - fetchReadme tests', async (t) => {
    let mockGetReadme;

    // Mock module requires
    Module.prototype.require = function (id) {
        if (id === 'octokit') {
            return {
                Octokit: class {
                    constructor() {
                        this.rest = {
                            repos: {
                                getReadme: (...args) => mockGetReadme(...args)
                            }
                        };
                    }
                }
            };
        }
        if (id === '../models/RepoCache.model') {
            return {};
        }
        if (id === 'node-cron') {
            return {
                schedule: () => {}
            };
        }
        return originalRequire.apply(this, arguments);
    };

    // Clean module cache to ensure fresh require with mocks
    delete require.cache[require.resolve('./github.service')];
    const githubService = require('./github.service');

    // Mute console output from initGitHubClient
    const originalConsoleLog = console.log;
    console.log = () => {};
    githubService.initGitHubClient('fake-token', 'fake-user');
    console.log = originalConsoleLog;

    await t.test('returns empty string when README is missing (404 error)', async () => {
        mockGetReadme = async () => {
            const error = new Error('Not Found');
            error.status = 404;
            throw error;
        };

        const result = await githubService.fetchReadme('owner', 'repo');
        assert.strictEqual(result, '');
    });

    await t.test('returns empty string and logs error for non-404 errors', async () => {
        mockGetReadme = async () => {
            const error = new Error('Server Error');
            error.status = 500;
            throw error;
        };

        const originalConsoleError = console.error;
        let loggedError = false;
        console.error = (msg) => {
            loggedError = true;
            assert.ok(msg.includes('Server Error'), 'Error message should be logged');
        };

        const result = await githubService.fetchReadme('owner', 'repo');
        assert.strictEqual(result, '');
        assert.strictEqual(loggedError, true, 'console.error should have been called');

        console.error = originalConsoleError;
    });

    await t.test('returns decoded content when fetch is successful', async () => {
        mockGetReadme = async () => {
            return {
                data: {
                    content: Buffer.from('# Hello World', 'utf-8').toString('base64')
                }
            };
        };

        const result = await githubService.fetchReadme('owner', 'repo');
        assert.strictEqual(result, '# Hello World');
    });

    // Clean up
    Module.prototype.require = originalRequire;
});
