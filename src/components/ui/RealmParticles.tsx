'use client';

import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { type ISourceOptions } from '@tsparticles/engine';

interface RealmParticlesProps {
    variant: 'zeus' | 'poseidon' | 'hades';
}

// Memoize to prevent re-renders unless variant changes
export const RealmParticles = React.memo(function RealmParticles({ variant }: RealmParticlesProps) {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    if (!init) {
        return null;
    }

    const getOptions = (variant: 'zeus' | 'poseidon' | 'hades'): ISourceOptions => {
        const common: ISourceOptions = {
            fullScreen: { enable: false },
            detectRetina: false, // Performance optimization: Render at standard resolution
            fpsLimit: 60, // Cap at 60 to save battery/resources
            particles: {
                reduceDuplicates: true, // OPTIMIZATION: Reduce duplicate particle calculations
            },
            interactivity: {
                detectsOn: "window", // OPTIMIZATION: More efficient event detection
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse"
                    },
                    resize: {
                        enable: true,
                        delay: 0.5
                    }
                },
                modes: {
                    repulse: {
                        distance: 80, // OPTIMIZATION: Reduced interaction distance
                        duration: 0.3, // OPTIMIZATION: Faster interaction response
                        factor: 3, // OPTIMIZATION: More efficient repulsion calculation
                        speed: 1
                    }
                }
            },
            // OPTIMIZATION: Disable unused features for better performance
            motion: {
                disable: false,
                reduce: {
                    factor: 4,
                    value: true
                }
            }
        };

        if (variant === 'zeus') {
            // Cosmic Dust - Twinkling stars
            return {
                ...common,
                particles: {
                    number: {
                        value: 80, // INCREASED: More cosmic particles for richer effect
                        density: {
                            enable: true,
                            width: 1920,
                            height: 1080
                        }
                    },
                    color: {
                        value: ["#ffffff", "#ffd700", "#b0e0e6"]
                    },
                    shape: {
                        type: "circle"
                    },
                    opacity: {
                        value: { min: 0.1, max: 0.8 },
                        animation: {
                            enable: true,
                            speed: 0.3, // OPTIMIZATION: Reduced animation speed to save CPU
                            sync: false
                        }
                    },
                    size: {
                        value: { min: 1, max: 3 },
                        animation: {
                            enable: true,
                            speed: 1.5, // OPTIMIZATION: Reduced animation speed
                            sync: false
                        }
                    },
                    move: {
                        enable: true,
                        speed: 0.15, // OPTIMIZATION: Slightly reduced movement speed
                        direction: "none",
                        random: true,
                        straight: false,
                        outModes: "out"
                    },
                    links: {
                        enable: true,
                        distance: 100, // OPTIMIZATION: Further reduced to minimize link calculations
                        color: "#ffffff",
                        opacity: 0.3, // OPTIMIZATION: Reduced opacity for better performance
                        width: 1
                    },
                    // REFINED APPROACH: Reduce particle density in center instead of hard boundaries
                    zIndex: {
                        value: 0,
                        opacityRate: 0.5, // Particles fade when overlapping UI areas
                    }
                }
            };
        } else if (variant === 'poseidon') {
            // Ocean Bubbles
            return {
                ...common,
                particles: {
                    number: {
                        value: 70, // INCREASED: More ocean bubbles for immersive underwater feel
                        density: {
                            enable: true,
                            width: 1920,
                            height: 1080
                        }
                    },
                    color: {
                        value: ["#e0f7fa", "#80deea", "#ffffff"]
                    },
                    shape: {
                        type: "circle"
                    },
                    opacity: {
                        value: { min: 0.1, max: 0.6 },
                        animation: {
                            enable: false // OPTIMIZATION: Disabled opacity animation to save CPU
                        }
                    },
                    size: {
                        value: { min: 1, max: 5 }, // OPTIMIZATION: Slightly reduced max size
                        animation: {
                            enable: false // OPTIMIZATION: Disabled size animation for better performance
                        }
                    },
                    move: {
                        enable: true,
                        speed: { min: 0.4, max: 1.8 }, // OPTIMIZATION: Slightly reduced speed range
                        direction: "top",
                        random: true,
                        straight: false,
                        outModes: "out"
                    },
                    wobble: {
                        enable: true,
                        distance: 4, // OPTIMIZATION: Reduced wobble distance
                        speed: 8 // OPTIMIZATION: Reduced wobble speed
                    },
                    // REFINED APPROACH: Gentle opacity reduction instead of hard boundaries
                    zIndex: {
                        value: 0,
                        opacityRate: 0.4, // More aggressive fade for ocean bubbles
                    }
                }
            };
        } else {
            // Hades Embers
            return {
                ...common,
                particles: {
                    number: {
                        value: 90, // INCREASED: More embers for dramatic underworld effect
                        density: {
                            enable: true,
                            width: 1920,
                            height: 1080
                        }
                    },
                    color: {
                        value: ["#ff4500", "#ff8c00", "#ff0000"]
                    },
                    shape: {
                        type: "circle"
                    },
                    opacity: {
                        value: { min: 0.1, max: 1 },
                        animation: {
                            enable: true,
                            speed: 0.8, // OPTIMIZATION: Reduced animation speed
                            sync: false,
                            mode: "decrease",
                            startValue: "max",
                            destroy: "min"
                        }
                    },
                    size: {
                        value: { min: 1.5, max: 3.5 }, // OPTIMIZATION: Slightly smaller particles
                        animation: {
                            enable: false // OPTIMIZATION: Disabled size animation for better performance
                        }
                    },
                    move: {
                        enable: true,
                        speed: { min: 0.4, max: 1.2 }, // OPTIMIZATION: Reduced speed range
                        direction: "top",
                        random: true,
                        straight: false,
                        outModes: "out",
                    },
                    life: {
                        duration: {
                            sync: false,
                            value: 4 // OPTIMIZATION: Slightly longer life to reduce respawn frequency
                        },
                        count: 0,
                        delay: {
                            random: {
                                enable: true,
                                minimumValue: 0.3 // OPTIMIZATION: Reduced minimum delay
                            },
                            value: 0.8 // OPTIMIZATION: Reduced delay value
                        }
                    },
                    // REFINED APPROACH: Subtle opacity reduction for Hades embers
                    zIndex: {
                        value: 0,
                        opacityRate: 0.3, // Gentle fade to maintain atmosphere
                    }
                }
            };
        }
    };

    return (
        <Particles
            id={`realm-particles-${variant}`}
            options={getOptions(variant)}
            className="absolute inset-0 z-0 pointer-events-none"
        />
    );
});
