const mongoose = require('mongoose');

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 3000;

/**
 * Connect to MongoDB with exponential backoff retry logic.
 * @param {string} uri - MongoDB connection string
 */
async function connectDB(uri) {
    if (!uri) {
        console.warn('[db] No MONGODB_URI provided. Database features disabled.');
        return;
    }

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            await mongoose.connect(uri, {
                serverSelectionTimeoutMS: 5000,
            });
            console.log('[db] MongoDB connected successfully.');
            return;
        } catch (err) {
            console.error(
                `[db] Connection attempt ${attempt}/${MAX_RETRIES} failed: ${err.message}`
            );

            if (attempt === MAX_RETRIES) {
                console.error('[db] All connection attempts exhausted. Exiting.');
                process.exit(1);
            }

            const delay = RETRY_DELAY_MS * Math.pow(2, attempt - 1);
            console.log(`[db] Retrying in ${delay}ms...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
}

module.exports = { connectDB };
