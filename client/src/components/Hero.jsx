import { useState, useEffect, useCallback } from 'react';
import { heroTitles, ownerInfo } from '../data/portfolio';
import '../styles/components/hero.css';

/**
 * Hero — large display heading, animated typewriter subtitle,
 * tagline, CTA buttons, and scroll indicator.
 */
function Hero() {
    const [titleIndex, setTitleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [displayText, setDisplayText] = useState('');

    const typeSpeed = isDeleting ? 40 : 80;
    const pauseDelay = 2000;

    useEffect(() => {
        const currentTitle = heroTitles[titleIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setDisplayText(currentTitle.substring(0, charIndex + 1));
                setCharIndex((prev) => prev + 1);

                if (charIndex + 1 === currentTitle.length) {
                    setTimeout(() => setIsDeleting(true), pauseDelay);
                }
            } else {
                setDisplayText(currentTitle.substring(0, charIndex - 1));
                setCharIndex((prev) => prev - 1);

                if (charIndex - 1 === 0) {
                    setIsDeleting(false);
                    setTitleIndex((prev) => (prev + 1) % heroTitles.length);
                }
            }
        }, typeSpeed);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, titleIndex, typeSpeed]);

    return (
        <section className="hero">
            <div className="hero-bg"></div>
            <div className="hero-grid"></div>

            <div className="hero-content">
                <h1 className="hero-name">{ownerInfo.name}</h1>

                <div className="hero-subtitle">
                    {displayText}
                    <span className="typewriter-cursor"></span>
                </div>

                <p className="hero-tagline">{ownerInfo.tagline}</p>

                <div className="hero-actions">
                    <a href="#projects" className="btn-primary">
                        View Projects
                    </a>
                    <a href="#contact" className="btn-outline">
                        Get in Touch
                    </a>
                </div>
            </div>

            <div className="hero-scroll scroll-indicator">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </div>
        </section>
    );
}

export default Hero;
