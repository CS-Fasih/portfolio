const { Octokit } = require('octokit');
const cron = require('node-cron');
const RepoCache = require('../models/RepoCache.model');

let octokit = null;
let githubUsername = '';
let memoizedRepoContext = null;

/**
 * Initialize Octokit client.
 * @param {string} token - GitHub personal access token
 * @param {string} username - GitHub username
 */
function initGitHubClient(token, username) {
    if (!token || !username) {
        console.warn('[github] Missing GITHUB_TOKEN or GITHUB_USERNAME. GitHub features disabled.');
        return;
    }

    octokit = new Octokit({ auth: token });
    githubUsername = username;
    console.log(`[github] Octokit client initialized for @${username}.`);
}

/**
 * Fetch README content for a single repo.
 * @param {string} owner
 * @param {string} repo
 * @returns {string} decoded README text or empty string
 */
async function fetchReadme(owner, repo) {
    try {
        const { data } = await octokit.rest.repos.getReadme({ owner, repo });
        return Buffer.from(data.content, 'base64').toString('utf-8');
    } catch (err) {
        // 404 means no README — that's fine
        if (err.status !== 404) {
            console.error(`[github] Error fetching README for ${repo}: ${err.message}`);
        }
        return '';
    }
}

/**
 * Sync all public repos + READMEs into MongoDB.
 */
async function syncAllRepos() {
    if (!octokit) {
        console.warn('[github] Octokit not initialized. Skipping sync.');
        return;
    }

    try {
        console.log('[github] Starting full repo sync...');

        const repos = await octokit.paginate(octokit.rest.repos.listForUser, {
            username: githubUsername,
            type: 'public',
            per_page: 100,
        });

        let synced = 0;

        for (const repo of repos) {
            const readme = await fetchReadme(githubUsername, repo.name);

            await RepoCache.findOneAndUpdate(
                { repoName: repo.name },
                {
                    repoName: repo.name,
                    repoUrl: repo.html_url,
                    description: repo.description || '',
                    topics: repo.topics || [],
                    readme,
                    lastSynced: new Date(),
                },
                { upsert: true, new: true }
            );

            synced++;
        }

        console.log(`[github] Synced ${synced} repositories.`);

        // Invalidate cache
        memoizedRepoContext = null;
    } catch (err) {
        console.error(`[github] Sync error: ${err.message}`);
    }
}

/**
 * Sync a single repo by name (used by webhook handler).
 * @param {string} repoName
 */
async function syncSingleRepo(repoName) {
    if (!octokit) return;

    try {
        const { data: repo } = await octokit.rest.repos.get({
            owner: githubUsername,
            repo: repoName,
        });

        const readme = await fetchReadme(githubUsername, repoName);

        await RepoCache.findOneAndUpdate(
            { repoName: repo.name },
            {
                repoName: repo.name,
                repoUrl: repo.html_url,
                description: repo.description || '',
                topics: repo.topics || [],
                readme,
                lastSynced: new Date(),
            },
            { upsert: true, new: true }
        );

        console.log(`[github] Synced repo: ${repoName}`);

        // Invalidate cache
        memoizedRepoContext = null;
    } catch (err) {
        console.error(`[github] Error syncing ${repoName}: ${err.message}`);
    }
}

/**
 * Start periodic sync — every 6 hours.
 */
function startPeriodicSync() {
    cron.schedule('0 */6 * * *', () => {
        console.log('[github] Running periodic repo sync...');
        syncAllRepos();
    });

    console.log('[github] Periodic sync scheduled (every 6 hours).');
}

/**
 * Get all cached repos from MongoDB.
 * @returns {Array} Array of repo documents
 */
async function getCachedRepos() {
    try {
        return await RepoCache.find({}).lean();
    } catch (err) {
        console.error(`[github] Error fetching cached repos: ${err.message}`);
        return [];
    }
}

/**
 * Get the memoized context string of all repos.
 * @returns {string} The formatted repo context string
 */
async function getCachedRepoContext() {
    if (memoizedRepoContext !== null) {
        return memoizedRepoContext;
    }

    const repos = await getCachedRepos();
    let repoContext = '';
    for (const repo of repos) {
        const readmeSnippet = repo.readme
            ? repo.readme.substring(0, 800)
            : '(no README)';
        repoContext += `\n--- ${repo.repoName} ---\nURL: ${repo.repoUrl}\nDescription: ${repo.description || 'N/A'}\nTopics: ${(repo.topics || []).join(', ') || 'N/A'}\nREADME:\n${readmeSnippet}\n`;
    }
    memoizedRepoContext = repoContext;
    return memoizedRepoContext;
}

module.exports = {
    initGitHubClient,
    syncAllRepos,
    syncSingleRepo,
    startPeriodicSync,
    getCachedRepos,
    getCachedRepoContext,
};
