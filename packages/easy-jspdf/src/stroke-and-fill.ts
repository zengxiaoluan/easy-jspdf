import { PathPaintingOperators } from "./types";
import { getColorValues } from "./utils";

export class StrokeAndFill {
  protected pages: string[][] = [];
  protected currentPageIndex: number = 0;
  private currentStrokeColor: Record<number, any> = {};

  constructor() {}

  fillMe() {
    let currentPage = this.pages[this.currentPageIndex];

    currentPage.pop(); // Remove the last operator (S or f)

    currentPage.push(PathPaintingOperators.Fill); // Add the fill operator

    return this;
  }

  /**
   * The color affects all subsequent stroke operations (lines, rectangles, circles) until changed again.
   * Uses RG operator with normalized values (0-1 range)
   * @param r
   * @param g
   * @param b
   * @returns
   */
  setStrokeColor(r: number | string, g?: number, b?: number) {
    let red: string, green: string, blue: string;

    if (typeof r === "string") {
      const [rVal, gVal, bVal] = getColorValues(r);
      red = rVal;
      green = gVal;
      blue = bVal;
    } else {
      red = (r / 255).toFixed(3);
      green = ((g || 0) / 255).toFixed(3);
      blue = ((b || 0) / 255).toFixed(3);
    }

    this.pages[this.currentPageIndex].push(`${red} ${green} ${blue} RG`);

    this.currentStrokeColor[this.currentPageIndex] = {
      r,
      g,
      b,
    };

    return this;
  }

  /**
   * get the current stroke color
   */
  getCurrentStrokeColor() {
    return this.currentStrokeColor[this.currentPageIndex];
  }

  getCurrentFillColor() {
    // Dummy implementation, replace with actual logic to get fill color
    return "0 0 0 rg"; // Black color in RGB
  }
}
