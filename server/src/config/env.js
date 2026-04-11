const dotenv = require('dotenv');
dotenv.config();

const requiredVars = [
    'MONGODB_URI',
    'GROQ_API_KEY',
    'GITHUB_USERNAME',
    'GITHUB_TOKEN',
];

/**
 * Validates that all required environment variables are set.
 * Logs warnings for optional missing vars instead of crashing.
 */
function validateEnv() {
    const missing = requiredVars.filter((key) => !process.env[key]);

    if (missing.length > 0) {
        console.warn(
            `[env] WARNING: Missing environment variables: ${missing.join(', ')}. Some features may not work.`
        );
    }

    return {
        port: parseInt(process.env.PORT, 10) || 5000,
        mongoUri: process.env.MONGODB_URI,
        groqApiKey: process.env.GROQ_API_KEY,
        githubUsername: process.env.GITHUB_USERNAME,
        githubToken: process.env.GITHUB_TOKEN,
        githubWebhookSecret: process.env.GITHUB_WEBHOOK_SECRET || '',
        clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
        nodeEnv: process.env.NODE_ENV || 'development',
    };
}

module.exports = { validateEnv };
