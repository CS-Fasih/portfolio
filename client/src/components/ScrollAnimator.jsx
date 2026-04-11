import { useEffect, useRef } from 'react';

/**
 * ScrollAnimator — wraps children with IntersectionObserver-based fade-up animation.
 * @param {{ children: React.ReactNode, className?: string }} props
 */
function ScrollAnimator({ children, className = '' }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('visible');
                    observer.unobserve(el);
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={`fade-up ${className}`}>
            {children}
        </div>
    );
}

export default ScrollAnimator;
