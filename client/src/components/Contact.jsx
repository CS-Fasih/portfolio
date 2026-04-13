import { useState } from 'react';
import ScrollAnimator from './ScrollAnimator';
import { ownerInfo } from '../data/portfolio';
import { sendContactMessage } from '../services/api';
import '../styles/components/contact.css';

/**
 * Contact — split layout with info/socials on left, form on right.
 */
function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null); // 'success' | 'error' | null
    const [statusMessage, setStatusMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(e) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus(null);

        try {
            const result = await sendContactMessage(formData);
            setStatus('success');
            setStatusMessage(result.message || 'Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setStatus('error');
            setStatusMessage(err.message || 'Failed to send message.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section id="contact" className="section">
            <div className="container">
                <ScrollAnimator>
                    <div className="section-header">
                        <span className="section-label">Contact</span>
                        <h2>Get in Touch</h2>
                        <p>Have a project in mind or want to collaborate? Reach out.</p>
                    </div>
                </ScrollAnimator>

                <div className="contact-content">
                    {/* Left — Info */}
                    <ScrollAnimator>
                        <div className="contact-info">
                            <h3>Let's Connect</h3>

                            <div className="contact-info-item">
                                <div className="contact-info-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                </div>
                                <div className="contact-info-text">
                                    <span>Email</span>
                                    <a href={`mailto:${ownerInfo.email}`}>{ownerInfo.email}</a>
                                </div>
                            </div>

                            <div className="contact-info-item">
                                <div className="contact-info-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                </div>
                                <div className="contact-info-text">
                                    <span>Location</span>
                                    {ownerInfo.location}
                                </div>
                            </div>

                            <div className="contact-socials">
                                {/* GitHub */}
                                <a href={ownerInfo.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                                </a>

                                {/* Fiverr */}
                                <a href={ownerInfo.fiverr} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Fiverr">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.86.41-.86.96v1.752h1.71v1.693h-1.71v4.627h-2.004v-4.627h-.86v-1.693h.86v-1.89c0-1.243.872-2.49 2.33-2.49.648 0 1.04.16 1.04.16l-.352 1.527s-.26-.09-.534-.09c-.397 0-.71.26-.71.68v.053h1.94v-.66zm-5.263 0h-1.803v8.072h2.004v-4.627h.79v-1.693h-.79V16.09c0-.283.183-.412.412-.412h.59v-1.852s-.353-.089-.698-.089c-.916 0-1.697.61-1.697 1.692v.453zm-3.483 0h2.004v8.072h-2.004v-8.072zm-4.333 2.696v5.376H6.925v-5.11c0-.276-.187-.406-.411-.406-.224 0-.41.13-.41.406v5.11H4.1v-5.11c0-.276-.187-.406-.41-.406-.224 0-.412.13-.412.406v5.11H1.274v-5.376c0-1.133.81-1.753 1.88-1.753.638 0 1.196.282 1.48.74.34-.478.87-.74 1.47-.74 1.07 0 1.882.62 1.882 1.753z" /></svg>
                                </a>
                            </div>
                        </div>
                    </ScrollAnimator>

                    {/* Right — Form */}
                    <ScrollAnimator>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="contact-name">Name</label>
                                <input
                                    type="text"
                                    id="contact-name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="contact-email">Email</label>
                                <input
                                    type="email"
                                    id="contact-email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="contact-message">Message</label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tell me about your project..."
                                    rows="5"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn-primary form-submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>

                            {status === 'success' && (
                                <div className="form-success">{statusMessage}</div>
                            )}
                            {status === 'error' && (
                                <div className="form-error">{statusMessage}</div>
                            )}
                        </form>
                    </ScrollAnimator>
                </div>
            </div>
        </section>
    );
}

export default Contact;
