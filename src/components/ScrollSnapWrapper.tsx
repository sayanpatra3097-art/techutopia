'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollSnapWrapperProps {
    children: React.ReactNode;
}

export function ScrollSnapWrapper({ children }: ScrollSnapWrapperProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isSnapping, setIsSnapping] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            if (isSnapping) return;

            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const aboutSection = document.getElementById('about');

            if (!aboutSection) return;

            const aboutTop = aboutSection.offsetTop;

            // Check if we're scrolling from Hero towards About
            if (scrollY > 50 && scrollY < aboutTop) {
                // User started scrolling down from Hero - snap to About
                setIsSnapping(true);
                window.scrollTo({
                    top: aboutTop,
                    behavior: 'smooth'
                });

                // Reset snapping state after animation
                setTimeout(() => {
                    setIsSnapping(false);
                }, 800);
            }
            // Check if scrolling up from About back to Hero
            else if (scrollY > 0 && scrollY < aboutTop && scrollY < lastScrollY.current) {
                // User is scrolling up - snap back to Hero
                if (scrollY < aboutTop - 100) {
                    setIsSnapping(true);
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });

                    setTimeout(() => {
                        setIsSnapping(false);
                    }, 800);
                }
            }

            lastScrollY.current = scrollY;
        };

        // Throttle scroll events
        let ticking = false;
        const throttledScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', throttledScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', throttledScroll);
        };
    }, [isSnapping]);

    return (
        <div ref={containerRef}>
            {children}
        </div>
    );
}
