import ScrollAnimator from './ScrollAnimator';
import { education } from '../data/portfolio';
import '../styles/components/education.css';

/**
 * Education — vertical timeline with amber line and content cards.
 */
function Education() {
    return (
        <section id="education" className="section">
            <div className="container">
                <ScrollAnimator>
                    <div className="section-header">
                        <span className="section-label">Education</span>
                        <h2>Academic Background</h2>
                    </div>
                </ScrollAnimator>

                <div className="timeline">
                    {education.map((entry, i) => (
                        <ScrollAnimator key={i}>
                            <div className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-card">
                                    <span className="timeline-date">{entry.period}</span>
                                    <h3>{entry.degree}</h3>
                                    <h4>{entry.institution}</h4>
                                    <p>{entry.description}</p>
                                    {entry.coursework.length > 0 && (
                                        <div className="coursework">
                                            {entry.coursework.map((course, j) => (
                                                <span key={j} className="coursework-tag">
                                                    {course}
                                                </span>
                                            ))}
                                        </div>
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

export default Education;
