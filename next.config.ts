import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // Set turbopack root to this project directory to avoid lockfile detection issues
    turbopack: {
        root: __dirname,
        rules: {
            '*.glsl': { loaders: ['raw-loader'] },
            '*.vs': { loaders: ['raw-loader'] },
            '*.fs': { loaders: ['raw-loader'] },
            '*.vert': { loaders: ['raw-loader'] },
            '*.frag': { loaders: ['raw-loader'] },
        },
    },

    // Trailing slash for routing consistency
    trailingSlash: false,

    // Ignore TypeScript errors during build (StaticImageData type issues)
    typescript: {
        ignoreBuildErrors: true,
    },

    // Ignore ESLint errors during build
    eslint: {
        ignoreDuringBuilds: true,
    },

    // Disable image optimization for static export
    images: {
        unoptimized: true,
        qualities: [25, 50, 75, 85, 100],
    },

    // Transpile packages that need it
    transpilePackages: [
        'three',
        '@react-three/fiber',
        '@react-three/drei',
        '@react-three/postprocessing',
        'lenis',
    ],

    // Optimize package imports for tree-shaking
    modularizeImports: {
        'lucide-react': {
            transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
        },
    },

    // Configure webpack for GLSL shaders and bundle optimization
    webpack: (config, { isServer }) => {
        // GLSL shader support
        config.module.rules.push({
            test: /\.(glsl|vs|fs|vert|frag)$/,
            use: ['raw-loader', 'glslify-loader'],
        });

        // Optimize chunks for better caching
        if (!isServer) {
            config.optimization = {
                ...config.optimization,
                splitChunks: {
                    ...config.optimization?.splitChunks,
                    cacheGroups: {
                        ...((config.optimization?.splitChunks as { cacheGroups?: Record<string, unknown> })?.cacheGroups || {}),
                        // Separate Three.js into its own chunk
                        three: {
                            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
                            name: 'three',
                            chunks: 'all',
                            priority: 30,
                        },
                        // Separate animation libraries
                        animations: {
                            test: /[\\/]node_modules[\\/](framer-motion|gsap)[\\/]/,
                            name: 'animations',
                            chunks: 'all',
                            priority: 20,
                        },
                    },
                },
            };
        }

        return config;
    },
};

export default nextConfig;
