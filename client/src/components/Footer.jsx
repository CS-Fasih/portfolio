import { navLinks } from '../data/portfolio';

/**
 * Footer — credit line, auto-updated year, mini nav links.
 */
function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <p>Built by Muhammad Fasih with React + Node.js — {year}</p>
                <div className="footer-links">
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href}>
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
