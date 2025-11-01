## Installation

```bash
npm install easy-jspdf -S
# or
pnpm add easy-jspdf -S
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

```typescript
doc.line(50, 50, 200, 50); // Horizontal line
doc.line(50, 50, 50, 200); // Vertical line
```

#### `circle(x: number, y: number, radius: number, fill?: boolean)`

Draws a circle using Bézier curves for smooth approximation.

```typescript
doc.circle(100, 100, 50); // Stroke circle
doc.circle(200, 100, 30, true); // Filled circle
```

#### `rect(x: number, y: number, width: number, height: number, strokeWidth?: number, dashArray?: number[])`

Draws a rectangle with optional stroke width and dash pattern.

```typescript
doc.rect(50, 50, 100, 75); // Basic rectangle
doc.rect(50, 150, 100, 75, 3); // 3pt stroke width
doc.rect(200, 50, 100, 75, 2, [5, 3]); // Dashed rectangle
```

### Text Operations

#### `text(x: number, y: number, text: string, fontSize?: number, fontFamily?: string)`

Adds text to the PDF with Unicode support.

```typescript
doc.text(50, 50, "Hello World");
doc.text(50, 100, "Large text", 36);
doc.text(50, 150, "Times font", 18, "Times-Roman");
doc.text(50, 200, "你好世界"); // Unicode support
```

**Supported fonts**: Helvetica (default), Times-Roman, Courier

### Graphics State

#### `setLineWidth(width: number)`

Sets the line width for subsequent drawing operations.

```typescript
doc.setLineWidth(5);
```

#### `setLineDash(dashArray: number[], dashPhase?: number)`

Sets line dash pattern.

```typescript
doc.setLineDash([5, 3]); // 5 on, 3 off
doc.setLineDash([10, 5, 2, 5]); // Complex pattern
doc.setLineDash([]); // Reset to solid
```

#### `setStrokeColor(r: number | string, g?: number, b?: number)`

Sets stroke color using RGB values or color names.

```typescript
doc.setStrokeColor(255, 0, 0); // Red RGB
doc.setStrokeColor("blue"); // Color name
doc.setStrokeColor("cornflowerblue"); // CSS color names
```

#### `setFillColor(r: number | string, g?: number, b?: number)`

Sets fill color for filled shapes.

```typescript
doc.setFillColor(0, 255, 0); // Green fill
doc.setFillColor("red"); // Red fill
```

#### `saveState()` / `restoreState()`

Save and restore graphics state.

```typescript
doc.saveState();
// ... drawing operations with transformations
doc.restoreState(); // Restore to saved state
```

#### `matrix(a: number, b: number, c: number, d: number, e: number, f: number)`

Applies transformation matrix.

```typescript
doc.matrix(1, 0, 0, 1, 50, 100); // Translate
doc.matrix(2, 0, 0, 2, 0, 0); // Scale 2x
```

### Matrix Helper

```typescript
import { Matrix } from "easy-jspdf";

const m = new Matrix()
  .translate(50, 100)
  .scale(2)
  .rotate(Math.PI / 4);

const [a, b, c, d, e, f] = m.toArray();
doc.matrix(a, b, c, d, e, f);
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

### Color Support

Supports all CSS color names:

```typescript
doc.setStrokeColor("red");
doc.setStrokeColor("cornflowerblue");
doc.setStrokeColor("mediumseagreen");
// ... and 144 more CSS colors
```

### Method Chaining

Most methods support chaining:

```typescript
doc
  .createPage(612, 792)
  .setStrokeColor("blue")
  .setLineWidth(3)
  .rect(50, 50, 100, 100)
  .setFillColor("red")
  .circle(200, 200, 50, true);
```

## Features

- ✅ Zero dependencies
- ✅ TypeScript support
- ✅ Multi-page documents
- ✅ Unicode text support
- ✅ Vector graphics (lines, circles, rectangles)
- ✅ Color support (RGB + CSS color names)
- ✅ Graphics state management
- ✅ Matrix transformations
- ✅ Method chaining
- ✅ Browser compatible
- ✅ Comprehensive test suite

## Packages

This monorepo contains:

- **easy-jspdf**: Main PDF generation library
- **@easy-jspdf/matrix**: Matrix transformation utilities
- **@easy-jspdf/vite-plugin-deps-tree**: Vite plugin for dependency analysis
- **@easy-jspdf/playground**: Interactive testing environment

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
