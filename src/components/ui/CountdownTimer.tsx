'use client';

import { useEffect, useState, memo } from 'react';

// Memoize to strictly prevent re-renders from parent unless props change
export const CountdownTimer = memo(function CountdownTimer({ 
  style, 
  className 
}: { 
  style?: React.CSSProperties;
  className?: string;
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-03-13T00:00:00');

    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime(); // Initial call
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`absolute font-medieval w-full flex justify-center ${className || ''}`}
      style={{
        bottom: '6%',
        zIndex: 15,
        pointerEvents: 'none', // Ensure clicks pass through to Hero transition
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(12px, 4vw, 32px)',
          padding: '20px clamp(10px, 5vw, 48px)',
        }}
      >
        {/* Days */}
        <TimeUnit value={timeLeft.days} label="DAYS" />

        <Separator />

        {/* Hours */}
        <TimeUnit value={timeLeft.hours} label="HOURS" />

        <Separator />

        {/* Minutes */}
        <TimeUnit value={timeLeft.minutes} label="MINS" />

        <Separator />

        {/* Seconds */}
        <TimeUnit value={timeLeft.seconds} label="SEC" />
      </div>
    </div>
  );
});

// Helper Components for Cleaner Code
const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div style={{ textAlign: 'center' }}>
    <div
      style={{
        fontFamily: 'Mamoru',
        fontSize: 'clamp(2rem, 6vw, 3.5rem)',
        fontWeight: '400',
        background: `
                repeating-linear-gradient(45deg, transparent 0px, transparent 10px, rgba(40,20,0,0.9) 10px, rgba(40,20,0,0.9) 11px),
                repeating-linear-gradient(-45deg, transparent 0px, transparent 15px, rgba(40,20,0,0.9) 15px, rgba(40,20,0,0.9) 16px),
                linear-gradient(180deg, #ffd700 0%, #b8860b 20%, #fffacd 40%, #ffd700 60%, #d7d2cf 80%, #ffd700 100%)
                `,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '2px 2px 0px #b8850f, 4px 4px 0px #2a1a00, 6px 6px 4px rgba(116, 33, 33, 0.8)',
        minWidth: 'clamp(40px, 10vw, 80px)',
      }}
    >
      {String(value).padStart(2, '0')}
    </div>
    <div
      className="font-cinzel"
      style={{
        fontSize: 'clamp(10px, 1.5vw, 14px)',
        color: '#d4af37',
        letterSpacing: 'clamp(1px, 0.4vw, 3px)',
        textTransform: 'uppercase',
        marginTop: '8px',
        textShadow: '0 2px 4px rgba(0,0,0,0.8)',
      }}
    >
      {label}
    </div>
  </div>
);

const Separator = () => (
  <div
    className="font-cursive"
    style={{
      fontSize: 'clamp(1.5rem, 5vw, 3rem)',
      background: `
            repeating-linear-gradient(45deg, transparent 0px, transparent 10px, rgba(40,20,0,0.9) 10px, rgba(40,20,0,0.9) 11px),
            repeating-linear-gradient(-45deg, transparent 0px, transparent 15px, rgba(40,20,0,0.9) 15px, rgba(40,20,0,0.9) 16px),
            linear-gradient(180deg, #ffd700 0%, #b8860b 20%, #fffacd 40%, #ffd700 60%, #8b4513 80%, #ffd700 100%)
        `,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      // OPTIMIZATION: Use text-shadow instead of filter: drop-shadow
      textShadow: '2px 2px 0px #3d2b00, 4px 4px 0px #2a1a00, 6px 6px 4px rgba(0,0,0,0.8)',
      fontWeight: 'bold',
      marginTop: '-15px',
    }}
  >
    :
  </div>
);
