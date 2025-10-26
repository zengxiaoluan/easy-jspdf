import { describe, it, expect } from "vitest";
import { PDF } from "../index";

describe("PDF", () => {
  it("should create a PDF instance", () => {
    const pdf = new PDF();
    expect(pdf).toBeInstanceOf(PDF);
  });

  it("should create a page with default dimensions", () => {
    const pdf = new PDF();
    pdf.createPage();
    const source = pdf.getSourceCode();
    expect(source).toContain("300 144");
  });

  it("should create a page with custom dimensions", () => {
    const pdf = new PDF();
    pdf.createPage(612, 792);
    const source = pdf.getSourceCode();
    expect(source).toContain("612 792");
  });

  it("should add a line to the PDF", () => {
    const pdf = new PDF();
    pdf.line(50, 50, 200, 50);
    const source = pdf.getSourceCode();
    expect(source).toContain("50 50 m");
    expect(source).toContain("200 50 l");
  });

  it("should add text to the PDF", () => {
    const pdf = new PDF();
    pdf.text(100, 100, "Hello World");
    const source = pdf.getSourceCode();
    expect(source).toContain("(Hello World) Tj");
  });

  it("should set line width", () => {
    const pdf = new PDF();
    pdf.setLineWidth(5);
    const source = pdf.getSourceCode();
    expect(source).toContain("5 w");
  });

  it("should set stroke color with RGB", () => {
    const pdf = new PDF();
    pdf.setStrokeColor(255, 0, 0);
    const source = pdf.getSourceCode();
    expect(source).toContain("1.000 0.000 0.000 RG");
  });

  it("should set stroke color with color name", () => {
    const pdf = new PDF();
    pdf.setStrokeColor("red");
    const source = pdf.getSourceCode();
    expect(source).toContain("1.000 0.000 0.000 RG");
  });
});
