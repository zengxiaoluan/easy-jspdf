# Contributing to Easy jsPDF

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/easy-jspdf.git`
3. Install dependencies: `pnpm install`
4. Create a feature branch: `git checkout -b feature/your-feature`

## Development

1. `pnpm dev:playground`
2. `pnpm build:watch`

### Project Structure

```
├── packages/
│   ├── easy-jspdf/     # Main PDF library
│   ├── matrix/         # Matrix calculations
│── playground/     # Interactive testing
```

### Commands

- `pnpm dev` - Start easy-jspdf development
- `pnpm dev:playground` - Start playground
- `pnpm build:all` - Build all packages
- `pnpm test` - Run tests

### Adding Features

1. Implement your feature in the appropriate package
2. Add tests if applicable
3. Update documentation in README.md
4. Test in the playground

### Code Style

- Use TypeScript
- Follow existing code patterns
- Keep functions minimal and focused
- Add JSDoc comments for public APIs

## Submitting Changes

1. Ensure all tests pass
2. Update documentation
3. Commit with clear messages
4. Push to your fork
5. Create a pull request

## Package Guidelines

### easy-jspdf

- Core PDF generation functionality
- Minimal dependencies
- Browser-compatible

### matrix

- Mathematical operations for transformations
- Pure functions when possible
- Well-tested calculations

### playground

- Interactive examples
- Real-time preview
- Development tools
