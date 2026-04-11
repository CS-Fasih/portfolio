import { useEffect, useRef } from 'react';

/**
 * Custom hook that adds IntersectionObserver-based scroll animations.
 * Adds 'visible' class to elements with 'fade-up' class when they enter viewport.
 */
export function useScrollAnimation() {
    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observerRef.current?.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        const elements = document.querySelectorAll('.fade-up');
        elements.forEach((el) => observerRef.current?.observe(el));

        return () => {
            observerRef.current?.disconnect();
        };
    }, []);
}
