import { useEffect, useRef } from 'react';

/**
 * Custom cursor — amber dot follower on desktop.
 * Creates a fixed-position dot that tracks mouse movement.
 */
export function useCustomCursor() {
    const dotRef = useRef(null);

    useEffect(() => {
        // Only on desktop
        if (window.matchMedia('(max-width: 768px)').matches) return;

        const dot = document.createElement('div');
        dot.classList.add('cursor-dot');
        document.body.appendChild(dot);
        dotRef.current = dot;

        function handleMouseMove(e) {
            dot.style.left = `${e.clientX}px`;
            dot.style.top = `${e.clientY}px`;
        }

        function handleMouseDown() {
            dot.classList.add('active');
        }

        function handleMouseUp() {
            dot.classList.remove('active');
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            dot.remove();
        };
    }, []);
}
