import ScrollAnimator from './ScrollAnimator';
import { experience } from '../data/portfolio';
import '../styles/components/experience.css';

/**
 * Experience — vertical timeline (same style as Education).
 */
function Experience() {
    return (
        <section id="experience" className="section">
            <div className="container">
                <ScrollAnimator>
                    <div className="section-header">
                        <span className="section-label">Experience</span>
                        <h2>Professional Journey</h2>
                    </div>
                </ScrollAnimator>

                <div className="timeline">
                    {experience.map((entry, i) => (
                        <ScrollAnimator key={i}>
                            <div className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-card">
                                    <span className="timeline-date">{entry.period}</span>
                                    <h3>{entry.role}</h3>
                                    <h4>{entry.company}</h4>
                                    <p>{entry.description}</p>
                                    {entry.highlights.length > 0 && (
                                        <ul className="experience-highlights">
                                            {entry.highlights.map((hl, j) => (
                                                <li key={j}>{hl}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </ScrollAnimator>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Experience;
