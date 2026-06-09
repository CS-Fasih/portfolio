import { useState, useRef, useCallback, useEffect } from 'react';
import { getChatEndpoint } from '../services/api';

const STORAGE_KEY = 'portfolio_chat_history';

const GREETING = {
    role: 'assistant',
    content: "Hi! I'm the AI assistant on Fasih's portfolio. Ask me anything about his projects, skills, or experience — I have full access to his GitHub repositories.",
};

/**
 * Chat hook — manages messages, sends to SSE endpoint, streams response.
 */
export function useChatbot() {
    const [messages, setMessages] = useState(() => {
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [GREETING];
        } catch {
            return [GREETING];
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const abortControllerRef = useRef(null);

    // Persist to sessionStorage
    useEffect(() => {
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        } catch {
            // Storage full or unavailable
        }
    }, [messages]);

    const sendMessage = useCallback(
        async (userMessage) => {
            if (!userMessage.trim() || isLoading) return;

            setError(null);

            const userMsg = { role: 'user', content: userMessage.trim() };
            setMessages((prev) => [...prev, userMsg]);
            setIsLoading(true);

            // Build conversation history for API (exclude the greeting if it's the system one)
            const conversationHistory = messages.reduce((acc, m) => {
                if (m.role === 'user' || m.role === 'assistant') {
                    acc.push({ role: m.role, content: m.content });
                }
                return acc;
            }, []);

            try {
                abortControllerRef.current = new AbortController();

                const response = await fetch(getChatEndpoint(), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: userMessage.trim(),
                        conversationHistory,
                    }),
                    signal: abortControllerRef.current.signal,
                });

                if (!response.ok) {
                    throw new Error('Chat service unavailable.');
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder();

                // Add empty bot message that we'll stream into
                setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

                let buffer = '';

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });

                    const lines = buffer.split('\n');
                    buffer = lines.pop() || '';

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const data = line.slice(6).trim();

                            if (data === '[DONE]') break;

                            try {
                                const parsed = JSON.parse(data);
                                if (parsed.content) {
                                    setMessages((prev) => {
                                        const updated = [...prev];
                                        const lastBot = updated[updated.length - 1];
                                        if (lastBot && lastBot.role === 'assistant') {
                                            updated[updated.length - 1] = {
                                                ...lastBot,
                                                content: lastBot.content + parsed.content,
                                            };
                                        }
                                        return updated;
                                    });
                                }
                                if (parsed.error) {
                                    setError(parsed.error);
                                }
                            } catch {
                                // Skip malformed JSON
                            }
                        }
                    }
                }
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message || 'Failed to send message.');
                    // Remove the empty bot message on error
                    setMessages((prev) => {
                        const last = prev[prev.length - 1];
                        if (last?.role === 'assistant' && last.content === '') {
                            return prev.slice(0, -1);
                        }
                        return prev;
                    });
                }
            } finally {
                setIsLoading(false);
                abortControllerRef.current = null;
            }
        },
        [messages, isLoading]
    );

    const clearChat = useCallback(() => {
        setMessages([GREETING]);
        setError(null);
        sessionStorage.removeItem(STORAGE_KEY);
    }, []);

    return {
        messages,
        isLoading,
        error,
        sendMessage,
        clearChat,
    };
}
