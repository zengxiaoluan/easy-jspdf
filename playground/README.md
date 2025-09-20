# 🎮 EasyPDF Playground

An interactive testing environment for the EasyPDF library. This playground allows you to experiment with different PDF creation options and see the results in real-time.

## Features

- **Interactive Controls**: Test different PDF formats, orientations, and settings
- **Real-time Feedback**: See document properties and console output immediately
- **Visual Interface**: User-friendly form controls for all PDF options
- **Live Testing**: Perfect for development and debugging

## Getting Started

From the monorepo root:

```bash
# Start the playground
pnpm dev:playground

# Or run directly from this package
cd packages/playground
pnpm dev
```

The playground will be available at `http://localhost:3001`

## Available Options

### Document Format
- **A4**: Standard A4 paper size (210 × 297 mm)
- **A3**: A3 paper size (297 × 420 mm)  
- **Letter**: US Letter size (215.9 × 279.4 mm)
- **Custom**: Define your own width and height in millimeters

### Orientation
- **Portrait**: Standard vertical orientation
- **Landscape**: Horizontal orientation (swaps width/height)

### Units
- **mm**: Millimeters (default)
- **pt**: Points (1/72 inch)
- **in**: Inches
- **px**: Pixels

### Other Options
- **Compression**: Enable/disable PDF compression

## Usage

1. **Select Options**: Use the form controls to configure your PDF
2. **Create PDF**: Click "Create PDF" to generate a new document
3. **Add Pages**: Use "Add Page" to add additional pages
4. **View Info**: Check the document info panel for current settings
5. **Monitor Console**: Watch the console output for detailed logs

## Development

This playground uses the EasyPDF library as a workspace dependency:

```json
{
  "dependencies": {
    "easy-jspdf": "workspace:*"
  }
}
```

Any changes to the main EasyPDF library will be reflected immediately in the playground during development.

## Testing New Features

The playground is perfect for:
- Testing new API methods
- Validating different configuration options
- Debugging PDF generation issues
- Demonstrating library capabilities
- Prototyping new features

## Structure

```
src/
├── main.ts          # Main playground application
├── style.css        # Playground-specific styles
└── vite-env.d.ts    # Vite type definitions
```