# Contributing to TECHUTOPIA 2026

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/bansal1806/techutopia_v5.0.git
   cd techutopia_v5.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## Project Structure

```
techutopia_v5.0/
├── src/
│   ├── components/
│   │   ├── 3d/              # 3D components (Scene, Model, Camera)
│   │   ├── audio/           # Audio management
│   │   ├── layout/          # Layout components
│   │   ├── navigation/      # Navigation components
│   │   ├── performance/     # Performance monitoring
│   │   └── sections/       # Page sections
│   ├── config/              # Configuration files
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components
│   └── utils/               # Utility functions
├── public/                  # Static assets
└── docs/                    # Documentation
```

## Theme: Greek Mythology

### Color Palette
- **Primary**: Blood Red (#6f1c16), Void Black (#000000), Terracotta (#7e4031)
- **Accents**: Golden Amber (#ee8a3c), Gold Shimmer (#FFD700)
- **Text**: Ivory Cream (#ffecd1), Stone Gray (#8B8680)

### Using Theme Colors
```tsx
// CSS Variables
style={{ color: 'var(--ivory-cream)' }}
style={{ backgroundColor: 'var(--void-black)' }}
style={{ borderColor: 'var(--terracotta)' }}

// Utility Classes
className="text-gold-shimmer"
className="bg-deep-wine"
className="glow-gold"
```

## Git Workflow

### Making Changes

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Use TypeScript
   - Add comments for complex logic

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

4. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Go to GitHub
   - Create a PR from your branch to `main`
   - Describe your changes

### Commit Message Format
```
Type: Brief description

Detailed explanation if needed
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`

## Code Style

- Use TypeScript for all new files
- Follow existing component patterns
- Use functional components with hooks
- Keep components focused and reusable
- Add PropTypes or TypeScript interfaces

## 3D Development

### Adding 3D Models
1. Place models in `public/models/`
2. Use GLB format (recommended)
3. Optimize models before adding
4. Use the `Model` component from `src/components/3d/Model.tsx`

### Performance
- Use LOD (Level of Detail) for complex models
- Implement lazy loading for 3D scenes
- Monitor FPS with PerformanceMonitor component
- Use adaptive quality system

## Testing

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Resources

- [Tech Stack Documentation](./TECH_STACK.md)
- [Example Usage](./EXAMPLE_USAGE.md)
- [Theme Configuration](./src/config/theme.ts)

## Questions?

Open an issue on GitHub or contact the maintainers.

