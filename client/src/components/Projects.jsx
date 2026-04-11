import { useState, useEffect } from 'react';
import ScrollAnimator from './ScrollAnimator';
import { featuredProject, projects as staticProjects } from '../data/portfolio';
import { fetchGitHubRepos } from '../services/api';
import '../styles/components/projects.css';

/**
 * Projects — featured full-width card + masonry grid.
 * Fetches live repo data from backend; falls back to static data.
 */
function Projects() {
    const [liveRepos, setLiveRepos] = useState([]);

    useEffect(() => {
        let cancelled = false;

        async function loadRepos() {
            try {
                const repos = await fetchGitHubRepos();
                if (!cancelled && repos.length > 0) {
                    setLiveRepos(repos);
                }
            } catch {
                // Fall back to static data
            }
        }

        loadRepos();
        return () => { cancelled = true; };
    }, []);

    // Merge live repos with static projects — prefer static for curated display
    const displayProjects = staticProjects.map((proj) => {
        const live = liveRepos.find(
            (r) => r.name.toLowerCase() === proj.name.toLowerCase()
        );
        return {
            ...proj,
            description: live?.description || proj.description,
            github: live?.url || proj.github,
        };
    });

    return (
        <section id="projects" className="section">
            <div className="container">
                <ScrollAnimator>
                    <div className="section-header">
                        <span className="section-label">Projects</span>
                        <h2>Selected Work</h2>
                    </div>
                </ScrollAnimator>

                {/* Featured project */}
                <ScrollAnimator>
                    <div className="project-featured">
                        <span className="project-featured-label">Featured Project</span>
                        <h3>{featuredProject.name}</h3>
                        <p>{featuredProject.description}</p>
                        <div className="project-tags">
                            {featuredProject.tech.map((t, i) => (
                                <span key={i} className="project-tag">{t}</span>
                            ))}
                        </div>
                        <div className="project-links">
                            {featuredProject.github && (
                                <a href={featuredProject.github} target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                                    GitHub
                                </a>
                            )}
                            {featuredProject.live && (
                                <a href={featuredProject.live} target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                    Live
                                </a>
                            )}
                        </div>
                    </div>
                </ScrollAnimator>

                {/* Project grid */}
                <div className="projects-grid">
                    {displayProjects.map((project, i) => (
                        <ScrollAnimator key={i}>
                            <div className="project-card">
                                <h4>{project.name}</h4>
                                <p>{project.description}</p>
                                <div className="project-tags">
                                    {project.tech.map((t, j) => (
                                        <span key={j} className="project-tag">{t}</span>
                                    ))}
                                </div>
                                <div className="project-links">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                                            GitHub
                                        </a>
                                    )}
                                    {project.live && (
                                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                            Live
                                        </a>
                                    )}
                                </div>
                            </div>
                        </ScrollAnimator>
                    ))}
                </div>

                <ScrollAnimator>
                    <div className="projects-cta">
                        <a
                            href="https://github.com/YOUR_GITHUB_USERNAME"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline"
                        >
                            View All on GitHub
                        </a>
                    </div>
                </ScrollAnimator>
            </div>
        </section>
    );
}

export default Projects;
