export const PathPaintingOperators = {
  Stroke: "S",
  Fill: "f",
  FillAndStroke: "B",
  FillEvenOdd: "f*",
  FillEvenOddAndStroke: "B*",
} as const;

export const LineCapStyle = {
  Butt: 0,
  Round: 1,
  ProjectingSquare: 2,
} as const;

export const LineJoinStyle = {
  Miter: 0,
  Round: 1,
  Bevel: 2,
} as const;

export const TextRenderingMode = {
  Fill: 0,
  Stroke: 1,
  FillThenStroke: 2,
  Invisible: 3,
  FillAndAddToPathForClipping: 4,
  StrokeAndAddToPathForClipping: 5,
  FillThenStrokeAndAddToPathForClipping: 6,
  AddToPathForClipping: 7,
} as const;

export interface PageDimension {
  width: number;
  height: number;
}

export interface PDFOptions {
  pageDimensions?: PageDimension[];
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

export type Color = RGB | CMYK | string;

export interface FontOptions {
  fontFamily?: string;
  fontSize?: number;
}

export type FontFamily = "Helvetica" | "Times-Roman" | "Courier";

export type FontStyle = "normal" | "bold" | "italic" | "bolditalic";
