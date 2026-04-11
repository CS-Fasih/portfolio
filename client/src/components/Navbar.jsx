import { useState, useEffect } from 'react';
import { navLinks } from '../data/portfolio';
import '../styles/components/navbar.css';

/**
 * Navbar — fixed navigation with scroll blur, amber underline indicators,
 * and mobile hamburger → full-screen overlay menu.
 */
function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        function handleScroll() {
            setScrolled(window.scrollY > 50);

            // Determine active section
            const sections = navLinks.map((link) => link.href.slice(1));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && el.getBoundingClientRect().top <= 150) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function handleLinkClick() {
        setMenuOpen(false);
    }

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-inner">
                <a href="#" className="navbar-logo">MF</a>

                <div className="navbar-links">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={activeSection === link.href.slice(1) ? 'active' : ''}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <button
                    className={`hamburger ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                {navLinks.map((link) => (
                    <a key={link.href} href={link.href} onClick={handleLinkClick}>
                        {link.label}
                    </a>
                ))}
            </div>
        </nav>
    );
}

export default Navbar;
