const OpenAI = require('openai');

const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1';
const MODEL = 'meta/llama-3.1-70b-instruct';

let client = null;

/**
 * Initialize the NVIDIA NIM OpenAI-compatible client.
 * @param {string} apiKey - NVIDIA API key
 */
function initLLMClient(apiKey) {
    if (!apiKey) {
        console.warn('[llm] No NVIDIA_API_KEY provided. Chat features disabled.');
        return;
    }

    client = new OpenAI({
        baseURL: NVIDIA_BASE_URL,
        apiKey: apiKey,
    });

    console.log('[llm] NVIDIA NIM client initialized.');
}

/**
 * Generate a streaming chat completion.
 * @param {string} systemPrompt - System context prompt
 * @param {Array} conversationHistory - Array of { role, content } messages
 * @returns {ReadableStream} - OpenAI streaming response
 */
async function createChatStream(systemPrompt, conversationHistory) {
    if (!client) {
        throw new Error('LLM client not initialized. Check NVIDIA_API_KEY.');
    }

    try {
        const stream = await client.chat.completions.create({
            model: MODEL,
            messages: [
                { role: 'system', content: systemPrompt },
                ...conversationHistory,
            ],
            stream: true,
            max_tokens: 1024,
            temperature: 0.7,
        });

        return stream;
    } catch (err) {
        console.error(`[llm] Chat completion error: ${err.message}`);
        throw err;
    }
}

module.exports = { initLLMClient, createChatStream };
