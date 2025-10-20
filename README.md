# Easy jsPDF [![npm](https://img.shields.io/npm/v/easy-jspdf.svg)](https://www.npmjs.com/package/easy-jspdf) [![build status](https://github.com/zengxiaoluan/easy-jspdf/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/zengxiaoluan/easy-jspdf/actions/workflows/node.js.yml) [![Download](https://img.shields.io/npm/dm/easy-jspdf)](https://www.npmjs.com/package/easy-jspdf)

A lightweight, zero-dependency JavaScript library for generating PDF documents in the browser. Easy jsPDF provides a simple API for creating multi-page PDFs with drawing operations, perfect for client-side PDF generation without external dependencies.

## Installation

```bash
npm install easy-jspdf
# or
pnpm add easy-jspdf
# or
yarn add easy-jspdf
```

## Quick Start

```typescript
import { PDF } from "easy-jspdf";

const doc = new PDF();
doc.createPage(612, 792); // US Letter size
doc.line(50, 50, 200, 50);

const url = doc.toUrl();
// Use the URL to display or download the PDF
```

## API Reference

### Constructor

#### `new PDF()`

Creates a new PDF document with a default page (300x144).

```typescript
const doc = new PDF();
```

### Page Management

#### `createPage(width?: number, height?: number)`

Creates a new page with specified dimensions and sets it as the current page.

- `width` (optional): Page width in points. Default: 300
- `height` (optional): Page height in points. Default: 144

```typescript
doc.createPage(); // Default size (300x144)
doc.createPage(612, 792); // US Letter (8.5" x 11")
doc.createPage(595, 842); // A4
```

#### `setCurrentPage(index: number)`

Sets the current page for drawing operations.

- `index`: Zero-based page index

```typescript
doc.setCurrentPage(0); // Switch to first page
doc.setCurrentPage(1); // Switch to second page
```

### Drawing Operations

#### `line(x1: number, y1: number, x2: number, y2: number)`

Draws a line from point (x1, y1) to point (x2, y2) on the current page.

- `x1`, `y1`: Starting point coordinates
- `x2`, `y2`: Ending point coordinates

```typescript
doc.line(50, 50, 200, 50); // Horizontal line
doc.line(50, 50, 50, 200); // Vertical line
```

### Output Methods

#### `toBlob(): Blob`

Returns the PDF as a Blob object.

```typescript
const blob = doc.toBlob();
```

#### `toUrl(): string`

Returns a URL for the PDF that can be used in iframe, embed, or for download.

```typescript
const url = doc.toUrl();
document.getElementById("pdf-viewer").src = url;
```

#### `getSourceCode(): string`

Returns the raw PDF source code as a string.

```typescript
const pdfSource = doc.getSourceCode();
console.log(pdfSource);
```

### Common Page Sizes

```typescript
// US Letter
doc.createPage(612, 792);

// A4
doc.createPage(595, 842);

// Legal
doc.createPage(612, 1008);

// A3
doc.createPage(842, 1191);
```

## Getting Started (Development)

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
