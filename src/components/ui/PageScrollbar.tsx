'use client';

import { useEffect } from 'react';

interface PageScrollbarProps {
    thumbColor?: string;
    hoverColor?: string;
    trackColor?: string;
}

export function PageScrollbar({
    thumbColor = 'rgba(212, 175, 55, 0.3)',
    hoverColor = 'rgba(212, 175, 55, 0.8)',
    trackColor = 'transparent'
}: PageScrollbarProps) {
    useEffect(() => {
        const root = document.documentElement;

        // Save previous values
        const prevThumb = root.style.getPropertyValue('--sb-thumb');
        const prevHover = root.style.getPropertyValue('--sb-thumb-hover');
        const prevTrack = root.style.getPropertyValue('--sb-track');

        // Set new values
        root.style.setProperty('--sb-thumb', thumbColor);
        root.style.setProperty('--sb-thumb-hover', hoverColor);
        root.style.setProperty('--sb-track', trackColor);

        return () => {
            // Restore (or clear to fallback to CSS defaults)
            if (prevThumb) root.style.setProperty('--sb-thumb', prevThumb);
            else root.style.removeProperty('--sb-thumb');

            if (prevHover) root.style.setProperty('--sb-thumb-hover', prevHover);
            else root.style.removeProperty('--sb-thumb-hover');

            if (prevTrack) root.style.setProperty('--sb-track', prevTrack);
            else root.style.removeProperty('--sb-track');
        };
    }, [thumbColor, hoverColor, trackColor]);

    return null;
}
