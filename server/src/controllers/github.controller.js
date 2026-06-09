const { syncSingleRepo, getCachedRepos } = require('../services/github.service');

/**
 * GET /api/github/repos
 * Returns cached GitHub repo data.
 */
async function getRepos(req, res) {
    try {
        const repos = await getCachedRepos();

        res.json({
            success: true,
            data: repos.map((repo) => ({
                name: repo.repoName,
                url: repo.repoUrl,
                description: repo.description,
                topics: repo.topics,
                lastSynced: repo.lastSynced,
            })),
            message: `${repos.length} repositories found.`,
        });
    } catch (err) {
        console.error(`[github] Get repos error: ${err.message}`);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Failed to fetch repositories.',
        });
    }
}

/**
 * POST /api/github/webhook
 * Handles GitHub webhook events for repo sync.
 */
async function handleWebhook(req, res) {
    // Respond 200 immediately
    res.status(200).json({ success: true, data: null, message: 'Webhook received.' });

    try {
        const event = req.headers['x-github-event'];
        const payload = req.body;

        if (event === 'repository' && payload.action === 'created') {
            const repoName = payload.repository?.name;
            if (repoName) {
                console.log(`[webhook] New repo created: ${repoName}`);
                await syncSingleRepo(repoName);
            }
        } else if (event === 'push') {
            const repoName = payload.repository?.name;
            const branch = payload.ref;

            if (repoName && (branch === 'refs/heads/main' || branch === 'refs/heads/master')) {
                console.log(`[webhook] Push to ${repoName}/${branch}`);
                await syncSingleRepo(repoName);
            }
        }
    } catch (err) {
        console.error(`[webhook] Processing error: ${err.message}`);
    }
}

module.exports = { getRepos, handleWebhook };
