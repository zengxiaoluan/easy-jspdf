# Easy jsPDF Monorepo

This is a monorepo containing the Easy jsPDF project and related packages.

## Structure

```
├── packages/
│   └── easy-jspdf/          # Main application package
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

Run the main application in development mode:
```bash
pnpm dev
```

Build all packages:
```bash
pnpm build:all
```

## Adding New Packages

To add a new package to the monorepo:

1. Create a new directory under `packages/`
2. Add a `package.json` with the package configuration
3. Add a `tsconfig.json` that extends the base configuration
4. Update the root `tsconfig.json` to include the new package reference

## Scripts

- `pnpm dev` - Start development server for easy-jspdf
- `pnpm build` - Build easy-jspdf package
- `pnpm build:all` - Build all packages
- `pnpm install:all` - Install dependencies for all packages