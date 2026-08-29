'use client';

import { useEffect, useState } from 'react';

export function PerformanceIndicator() {
    const [fps, setFps] = useState(60);
    const [mode, setMode] = useState<'high' | 'medium' | 'low'>('high');
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Only show in development or with ?debug=true
        const isDev = process.env.NODE_ENV === 'development';
        const hasDebug = typeof window !== 'undefined' && window.location.search.includes('debug=true');
        
        if (isDev || hasDebug) {
            setShow(true);
        }

        let frameCount = 0;
        let lastTime = performance.now();
        let animationId: number;

        const measureFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            const elapsed = currentTime - lastTime;

            if (elapsed >= 1000) {
                const currentFPS = Math.round((frameCount * 1000) / elapsed);
                setFps(currentFPS);
                frameCount = 0;
                lastTime = currentTime;

                // Determine mode based on FPS
                if (currentFPS >= 50) setMode('high');
                else if (currentFPS >= 35) setMode('medium');
                else setMode('low');
            }

            animationId = requestAnimationFrame(measureFPS);
        };

        animationId = requestAnimationFrame(measureFPS);

        return () => {
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, []);

    if (!show) return null;

    const modeColors = {
        high: '#00ff00',
        medium: '#ffaa00',
        low: '#ff0000'
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: '10px',
                right: '10px',
                zIndex: 9999,
                background: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                padding: '8px 12px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '12px',
                border: `2px solid ${modeColors[mode]}`,
                pointerEvents: 'none'
            }}
        >
            <div>FPS: <span style={{ color: modeColors[mode], fontWeight: 'bold' }}>{fps}</span></div>
            <div>Mode: <span style={{ color: modeColors[mode], fontWeight: 'bold' }}>{mode.toUpperCase()}</span></div>
        </div>
    );
}
