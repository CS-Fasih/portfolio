import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Send a contact form message.
 * @param {{ name: string, email: string, message: string }} data
 * @returns {Promise<Object>}
 */
export async function sendContactMessage(data) {
    try {
        const response = await api.post('/api/contact', data);
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || 'Failed to send message.');
    }
}

/**
 * Fetch cached GitHub repos from backend.
 * @returns {Promise<Array>}
 */
export async function fetchGitHubRepos() {
    try {
        const response = await api.get('/api/github/repos');
        return response.data.data || [];
    } catch (err) {
        console.error('Failed to fetch repos:', err.message);
        return [];
    }
}

/**
 * Get the SSE chat endpoint URL for streaming.
 * @returns {string}
 */
export function getChatEndpoint() {
    return `${API_BASE_URL}/api/chat`;
}

export default api;
