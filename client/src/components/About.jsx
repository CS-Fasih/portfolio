import ScrollAnimator from './ScrollAnimator';
import { aboutText, stats } from '../data/portfolio';
import '../styles/components/about.css';

/**
 * About — editorial paragraph with drop cap, quick-stats cards.
 */
function About() {
    return (
        <section id="about" className="section">
            <div className="container">
                <ScrollAnimator>
                    <div className="section-header">
                        <span className="section-label">About</span>
                        <h2>Who I Am</h2>
                    </div>
                </ScrollAnimator>

                <div className="about-content">
                    <ScrollAnimator className="about-text">
                        {aboutText.map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </ScrollAnimator>

                    <div className="about-stats stagger-children">
                        {stats.map((stat, i) => (
                            <ScrollAnimator key={i}>
                                <div className="stat-card">
                                    <div className="stat-number">{stat.number}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                            </ScrollAnimator>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
