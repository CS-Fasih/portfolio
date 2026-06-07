const { getCachedRepos } = require('../services/github.service');
const { createChatStream } = require('../services/llm.service');

let cachedRepoContext = null;
let cacheExpiration = 0;
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

/**
 * POST /api/chat
 * Handles chat messages with streaming SSE response.
 * @param {Object} req - { message, conversationHistory }
 * @param {Object} res
 */
async function handleChat(req, res) {
    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'Message is required.',
            });
        }

        // Build context from cached repos
        let repoContext = '';

        if (cachedRepoContext !== null && Date.now() < cacheExpiration) {
            repoContext = cachedRepoContext;
        } else {
            const repos = await getCachedRepos();
            for (const repo of repos) {
                const readmeSnippet = repo.readme
                    ? repo.readme.substring(0, 800)
                    : '(no README)';
                repoContext += `\n--- ${repo.repoName} ---\nURL: ${repo.repoUrl}\nDescription: ${repo.description || 'N/A'}\nTopics: ${(repo.topics || []).join(', ') || 'N/A'}\nREADME:\n${readmeSnippet}\n`;
            }
            cachedRepoContext = repoContext;
            cacheExpiration = Date.now() + CACHE_TTL;
        }

        const systemPrompt = `You are the AI assistant on Muhammad Fasih's portfolio website.
You have deep knowledge of Fasih's projects from his GitHub repositories.
Answer questions about his work, tech stack, projects, and skills.
Be concise, technically accurate, and friendly.
If asked about a specific repo, reference the README data provided.
Do not answer questions unrelated to Fasih's work or portfolio.

=== REPOSITORY KNOWLEDGE BASE ===${repoContext}`;

        // Set SSE headers
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
        });

        const history = [
            ...conversationHistory.map((msg) => ({
                role: msg.role,
                content: msg.content,
            })),
            { role: 'user', content: message },
        ];

        const stream = await createChatStream(systemPrompt, history);

        for await (const chunk of stream) {
            const content = chunk.choices?.[0]?.delta?.content;
            if (content) {
                res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }
        }

        res.write('data: [DONE]\n\n');
        res.end();
    } catch (err) {
        console.error(`[chat] Error: ${err.message}`);

        // If headers haven't been sent, return JSON error
        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                data: null,
                message: 'Chat service unavailable.',
            });
        }

        // If streaming, send error event
        res.write(`data: ${JSON.stringify({ error: 'Stream interrupted.' })}\n\n`);
        res.end();
    }
}

module.exports = { handleChat };
