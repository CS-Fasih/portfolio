const OpenAI = require('openai');

const GROQ_BASE_URL = 'https://api.groq.com/openai/v1';
const MODEL = 'llama-3.1-70b-versatile';

let client = null;

/**
 * Initialize the Groq OpenAI-compatible client.
 * @param {string} apiKey - Groq API key
 */
function initLLMClient(apiKey) {
    if (!apiKey) {
        console.warn('[llm] No GROQ_API_KEY provided. Chat features disabled.');
        return;
    }

    client = new OpenAI({
        baseURL: GROQ_BASE_URL,
        apiKey: apiKey,
    });

    console.log('[llm] Groq client initialized.');
}

/**
 * Generate a streaming chat completion.
 * @param {string} systemPrompt - System context prompt
 * @param {Array} conversationHistory - Array of { role, content } messages
 * @returns {ReadableStream} - OpenAI streaming response
 */
async function createChatStream(systemPrompt, conversationHistory) {
    if (!client) {
        throw new Error('LLM client not initialized. Check GROQ_API_KEY.');
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
