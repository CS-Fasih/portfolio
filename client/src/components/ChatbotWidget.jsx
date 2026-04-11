import { useState, useRef, useEffect } from 'react';
import { useChatbot } from '../hooks/useChatbot';
import '../styles/components/chatbot.css';

/**
 * ChatbotWidget — floating amber circle button + slide-up chat panel.
 */
function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, isLoading, error, sendMessage, clearChat } = useChatbot();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    function handleSubmit(e) {
        e.preventDefault();
        if (input.trim()) {
            sendMessage(input.trim());
            setInput('');
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    }

    return (
        <>
            {/* Toggle button */}
            <button
                className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle chatbot"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>
                )}
            </button>

            {/* Chat panel */}
            {isOpen && (
                <div className="chatbot-panel">
                    <div className="chatbot-header">
                        <div className="chatbot-header-info">
                            <h4>Ask about Fasih's work</h4>
                            <span>Powered by Llama 3.1 70B</span>
                        </div>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, i) => (
                            <div key={i} className={`chat-message ${msg.role === 'user' ? 'user' : 'bot'}`}>
                                {msg.content}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="chat-message typing">
                                <div className="typing-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="chat-message bot" style={{ borderColor: 'rgba(220,50,50,0.3)' }}>
                                Error: {error}
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chatbot-input" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about projects, skills..."
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading || !input.trim()}>
                            Send
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}

export default ChatbotWidget;
