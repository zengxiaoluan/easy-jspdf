import { StrokeAndFill } from "./stroke-and-fill";

export class Primitive extends StrokeAndFill {
  constructor() {
    super();
  }

  ellipse(x: number, y: number, rx: number, ry: number, fill: boolean = false) {
    const k = 0.552284749831; // Bézier control point factor for ellipse approximation
    const rxk = k * rx;
    const ryk = k * ry;

    this.pages[this.currentPageIndex].push(
      `${x} ${y + ry} m`, // Move to top
      `${x + rxk} ${y + ry} ${x + rx} ${y + ryk} ${x + rx} ${y} c`, // Top-right curve
      `${x + rx} ${y - ryk} ${x + rxk} ${y - ry} ${x} ${y - ry} c`, // Bottom-right curve
      `${x - rxk} ${y - ry} ${x - rx} ${y - ryk} ${x - rx} ${y} c`, // Bottom-left curve
      `${x - rx} ${y + ryk} ${x - rxk} ${y + ry} ${x} ${y + ry} c`, // Top-left curve
      fill ? "f" : "S" // Fill or Stroke
    );

    return this;
  }

  /**
   * The circle API is now implemented using Bézier curves to create a smooth circle approximation. The method takes three parameters
   * @param x Center X coordinate
   * @param y Center Y coordinate
   * @param radius Circle radius
   */
  circle(x: number, y: number, radius: number, fill: boolean = false) {
    const k = 0.552284749831; // Bézier control point factor for circle approximation
    const r = radius;
    const kr = k * r;

    this.pages[this.currentPageIndex].push(
      `${x} ${y + r} m`, // Move to top
      `${x + kr} ${y + r} ${x + r} ${y + kr} ${x + r} ${y} c`, // Top-right curve
      `${x + r} ${y - kr} ${x + kr} ${y - r} ${x} ${y - r} c`, // Bottom-right curve
      `${x - kr} ${y - r} ${x - r} ${y - kr} ${x - r} ${y} c`, // Bottom-left curve
      `${x - r} ${y + kr} ${x - kr} ${y + r} ${x} ${y + r} c`, // Top-left curve
      fill ? "f" : "S" // Fill or Stroke
    );
  }

  line(x1: number, y1: number, x2: number, y2: number) {
    this.pages[this.currentPageIndex].push(
      `${x1} ${y1} m`,
      `${x2} ${y2} l`,
      "S"
    );
  }

  /**
   * Adds the re operator to draw a rectangle
   * @param x Bottom-left X coordinate
   * @param y Bottom-left Y coordinate
   * @param width Width of the rectangle
   * @param height Height of the rectangle
   * @param strokeWidth Stroke width of the rectangle
   */
  rect(x: number, y: number, width: number, height: number) {
    this.pages[this.currentPageIndex].push(
      `${x} ${y} ${width} ${height} re`,
      "S"
    );

    return this;
  }

  comment(text: string) {
    this.pages[this.currentPageIndex].push(`% ${text}`);
  }

  text(
    x: number,
    y: number,
    text: string,
    fontSize: number = 24,
    fontFamily: string = "Helvetica"
  ) {
    const fontRef = getFontReference(fontFamily);
    const encodedText = encodeText(text);
    this.pages[this.currentPageIndex].push(
      "BT",
      `${x} ${y} TD`,
      `/${fontRef} ${fontSize} Tf`,
      encodedText,
      "ET"
    );
  }
}

function encodeText(text: string): string {
  const utf8Bytes = new TextEncoder().encode(text);
  const hexString = Array.from(utf8Bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return `<${hexString}> Tj`;
}

function getFontReference(fontFamily: string): string {
  const fontMap: { [key: string]: string } = {
    Helvetica: "F1",
    "Times-Roman": "F2",
    Courier: "F3",
  };
  return fontMap[fontFamily] || "F1";
}
