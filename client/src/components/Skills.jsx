import ScrollAnimator from './ScrollAnimator';
import { skillCategories } from '../data/portfolio';
import '../styles/components/skills.css';

/**
 * Skills — categorized grid with icon + label cards. No progress bars.
 */
function Skills() {
    return (
        <section id="skills" className="section">
            <div className="container">
                <ScrollAnimator>
                    <div className="section-header">
                        <span className="section-label">Skills</span>
                        <h2>Technical Toolkit</h2>
                    </div>
                </ScrollAnimator>

                {skillCategories.map((category, i) => (
                    <ScrollAnimator key={i}>
                        <div className="skills-category">
                            <h3 className="skills-category-title">{category.title}</h3>
                            <div className="skills-grid">
                                {category.skills.map((skill, j) => (
                                    <div key={j} className="skill-card">
                                        <img
                                            src={skill.icon}
                                            alt={skill.name}
                                            width="24"
                                            height="24"
                                            loading="lazy"
                                        />
                                        <span>{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollAnimator>
                ))}
            </div>
        </section>
    );
}

export default Skills;
