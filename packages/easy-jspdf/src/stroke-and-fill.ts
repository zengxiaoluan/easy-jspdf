import { PathPaintingOperators } from "./types";

export class StrokeAndFill {
  protected pages: string[][] = [[]];
  protected currentPageIndex: number = 0;

  constructor() {}

  fillMe() {
    let currentPage = this.pages[this.currentPageIndex];

    currentPage.pop(); // Remove the last operator (S or f)

    currentPage.push(PathPaintingOperators.Fill); // Add the fill operator

    return this;
  }
}
