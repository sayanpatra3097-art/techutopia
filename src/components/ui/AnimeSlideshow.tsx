'use client';

import { memo, useState, useEffect, useMemo } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

// All anime image numbers (no #13 in the set)
const ANIME_IMAGE_NUMBERS = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42
];

const TOTAL_IMAGES = ANIME_IMAGE_NUMBERS.length; // 41

interface AnimeSlideshowProps {
    smoothScroll: MotionValue<number>;
    /** Scroll range start (0-1) */
    scrollStart?: number;
    /** Scroll range end (0-1) */
    scrollEnd?: number;
    /** Which subset of images to show (for realm-based splitting) */
    imageSlice?: [number, number];
    /** Optional z-index */
    zIndex?: number;
}

/**
 * Scroll-driven anime image slideshow with parallax crossfade.
 * Maps a scroll range to a set of images, showing 2 at a time with crossfade transitions.
 * Includes Ken Burns zoom + subtle parallax Y-shift for cinematic feel.
 */
export const AnimeSlideshow = memo(function AnimeSlideshow({
    smoothScroll,
    scrollStart = 0,
    scrollEnd = 1,
    imageSlice,
    zIndex = 1,
}: AnimeSlideshowProps) {
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

    // Get the subset of images to display
    const images = useMemo(() => {
        if (imageSlice) {
            return ANIME_IMAGE_NUMBERS.slice(imageSlice[0], imageSlice[1]);
        }
        return ANIME_IMAGE_NUMBERS;
    }, [imageSlice]);

    const imageCount = images.length;

    // Map scroll progress to a continuous image index (0 to imageCount)
    const imageProgress = useTransform(
        smoothScroll,
        [scrollStart, scrollEnd],
        [0, imageCount]
    );

    // Track current image index for preloading
    const [currentIdx, setCurrentIdx] = useState(0);

    useEffect(() => {
        const unsubscribe = imageProgress.on('change', (value) => {
            const idx = Math.max(0, Math.min(Math.floor(value), imageCount - 1));
            setCurrentIdx(idx);
        });
        return unsubscribe;
    }, [imageProgress, imageCount]);

    // Preload images near current position
    useEffect(() => {
        const preloadRange = 3; // Preload ±3 images
        const start = Math.max(0, currentIdx - preloadRange);
        const end = Math.min(imageCount, currentIdx + preloadRange + 1);

        for (let i = start; i < end; i++) {
            const num = images[i];
            if (!loadedImages.has(num)) {
                const img = new Image();
                img.src = `/Home/anime/${num}.webp`;
                img.onload = () => {
                    setLoadedImages(prev => new Set(prev).add(num));
                };
            }
        }
    }, [currentIdx, images, imageCount, loadedImages]);

    // Render only the current and next image for performance
    const visibleIndices = useMemo(() => {
        const indices: number[] = [];
        const prev = Math.max(0, currentIdx - 1);
        const next = Math.min(imageCount - 1, currentIdx + 1);
        // Only render 3 images max: prev, current, next
        if (prev !== currentIdx) indices.push(prev);
        indices.push(currentIdx);
        if (next !== currentIdx) indices.push(next);
        return indices;
    }, [currentIdx, imageCount]);

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                zIndex,
                overflow: 'hidden',
                pointerEvents: 'none',
            }}
        >
            {visibleIndices.map((idx) => (
                <SlideImage
                    key={images[idx]}
                    imageNum={images[idx]}
                    imageIndex={idx}
                    imageProgress={imageProgress}
                    imageCount={imageCount}
                />
            ))}

            {/* Cinematic vignette overlay for text readability */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `
                        radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%),
                        linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.2) 100%)
                    `,
                    pointerEvents: 'none',
                    zIndex: 2,
                }}
            />
        </div>
    );
});

/**
 * Individual slide image with scroll-driven opacity and Ken Burns effect.
 */
const SlideImage = memo(function SlideImage({
    imageNum,
    imageIndex,
    imageProgress,
    imageCount,
}: {
    imageNum: number;
    imageIndex: number;
    imageProgress: MotionValue<number>;
    imageCount: number;
}) {
    // Each image is visible for 1 unit of progress, crossfading at boundaries
    // Quicker crossfade so images stay fully visible longer
    const fadeIn = Math.max(0, imageIndex - 0.1);
    const fullStart = imageIndex + 0.1;
    const fullEnd = imageIndex + 0.9;
    const fadeOut = imageIndex + 1.1;

    const opacity = useTransform(
        imageProgress,
        [fadeIn, fullStart, fullEnd, fadeOut],
        [0, 1, 1, 0]
    );

    // Ken Burns: slow zoom from 1.0 to 1.15 while visible
    const scale = useTransform(
        imageProgress,
        [imageIndex - 0.5, imageIndex + 1.5],
        [1.0, 1.15]
    );

    // Subtle parallax Y-shift (moves up as you scroll)
    const y = useTransform(
        imageProgress,
        [imageIndex - 1, imageIndex + 1],
        [30, -30]
    );

    return (
        <motion.div
            style={{
                position: 'absolute',
                inset: 0,
                opacity,
                scale,
                y,
                willChange: 'transform, opacity',
                zIndex: imageIndex === 0 ? 0 : 1,
            }}
        >
            <img
                src={`/Home/anime/${imageNum}.webp`}
                alt={`Scene ${imageNum}`}
                loading="lazy"
                decoding="async"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    pointerEvents: 'none',
                    transform: 'translateZ(0)', // Force GPU
                }}
            />
        </motion.div>
    );
});

export { ANIME_IMAGE_NUMBERS, TOTAL_IMAGES };
