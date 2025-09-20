# Easy jsPDF Monorepo

This is a monorepo containing the Easy jsPDF project and related packages, managed with **Catalog** for centralized dependency management.

## Structure

```
├── packages/
│   ├── easy-jspdf/          # Main EasyPDF library package
│   └── playground/          # Interactive testing playground
├── catalog.json             # Centralized dependency versions
├── .catalogrc               # Catalog configuration
├── package.json             # Root package.json with workspace config
├── pnpm-workspace.yaml      # PNPM workspace configuration
├── tsconfig.json            # Root TypeScript project references
└── tsconfig.base.json       # Shared TypeScript configuration
```

## Getting Started

Install dependencies for all packages:
```bash
pnpm install
```

## Development

Run the main EasyPDF library in development mode:
```bash
pnpm dev
```

Run the interactive playground:
```bash
pnpm dev:playground
```

Build all packages:
```bash
pnpm build:all
```

## Playground

The playground package (`packages/playground/`) provides an interactive testing environment for the EasyPDF library:

- **Interactive UI**: Test different PDF creation options
- **Real-time feedback**: See results immediately in the console
- **Live examples**: Experiment with various configurations
- **Development tool**: Perfect for testing new features

Access the playground at `http://localhost:3001` when running `pnpm dev:playground`.

## Adding New Packages

To add a new package to the monorepo:

1. Create a new directory under `packages/`
2. Add a `package.json` with the package configuration
3. Add a `tsconfig.json` that extends the base configuration
4. Update the root `tsconfig.json` to include the new package reference

## Scripts

- `pnpm dev` - Start development server for easy-jspdf library
- `pnpm dev:playground` - Start the interactive playground (port 3001)
- `pnpm build` - Build easy-jspdf package
- `pnpm build:all` - Build all packages
- `pnpm dev:all` - Start all development servers
- `pnpm install:all` - Install dependencies for all packages
- `pnpm catalog:install` - Update dependencies from catalog