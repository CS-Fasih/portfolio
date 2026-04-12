const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { validateEnv } = require('./config/env');
const { connectDB } = require('./config/db');
const { initLLMClient } = require('./services/llm.service');
const { initGitHubClient, syncAllRepos, startPeriodicSync } = require('./services/github.service');
const { initEmailService } = require('./services/email.service');
const { errorHandler } = require('./middleware/errorHandler');

const chatRoutes = require('./routes/chat.routes');
const githubRoutes = require('./routes/github.routes');
const contactRoutes = require('./routes/contact.routes');

async function startServer() {
    const config = validateEnv();
    const app = express();

    // Security & logging
    app.set('trust proxy', 1);
    app.use(helmet());

    if (config.nodeEnv !== 'production') {
        app.use(morgan('dev'));
    } else {
        app.use(morgan('combined'));
    }

    // CORS
    const corsOptions = {
        origin:
            config.nodeEnv === 'production'
                ? config.clientOrigin
                : '*',
        methods: ['GET', 'POST'],
        credentials: true,
    };
    app.use(cors(corsOptions));

    // Body parsing
    app.use(express.json({ limit: '1mb' }));

    // Health check
    app.get('/api/health', (_req, res) => {
        res.json({ success: true, data: null, message: 'Server is running.' });
    });

    // Routes
    app.use('/api/chat', chatRoutes);
    app.use('/api/github', githubRoutes);
    app.use('/api/contact', contactRoutes);

    // Global error handler
    app.use(errorHandler);

    // Initialize services
    await connectDB(config.mongoUri);
    initLLMClient(config.groqApiKey);
    initGitHubClient(config.githubToken, config.githubUsername);
    initEmailService();

    // Initial GitHub sync + cron schedule
    syncAllRepos().catch((err) =>
        console.error(`[startup] Initial sync failed: ${err.message}`)
    );
    startPeriodicSync();

    // Start listening
    app.listen(config.port, () => {
        console.log(`[server] Listening on port ${config.port} (${config.nodeEnv})`);
    });
}

startServer().catch((err) => {
    console.error(`[fatal] Server startup failed: ${err.message}`);
    process.exit(1);
});
