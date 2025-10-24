export class PDF {
  private pages: string[][];
  private pageDimensions: { width: number; height: number }[];
  private currentPageIndex: number;

  constructor() {
    this.pages = [[]];
    this.pageDimensions = [{ width: 300, height: 144 }];
    this.currentPageIndex = 0;
  }

  /**
   * create a new page with specified width and height
   * @arg width width of the page
   * @arg height height of the page
   */
  createPage(width: number = 300, height: number = 144) {
    this.pages.push([]);
    this.pageDimensions.push({ width, height });
    this.currentPageIndex = this.pages.length - 1;
  }

  /**
   * Set the current page to draw on
   * @param index index of the page
   */
  setCurrentPage(index: number) {
    if (index >= 0 && index < this.pages.length) {
      this.currentPageIndex = index;
    } else {
      throw new Error("Invalid page index");
    }
  }

  text(
    x: number,
    y: number,
    text: string,
    fontSize: number = 24,
    fontFamily: string = "Helvetica"
  ) {
    const fontRef = this.getFontReference(fontFamily);
    this.pages[this.currentPageIndex].push(
      "BT",
      `${x} ${y} TD`,
      `/${fontRef} ${fontSize} Tf`,
      `(${text}) Tj`,
      "ET"
    );
  }

  private getFontReference(fontFamily: string): string {
    const fontMap: { [key: string]: string } = {
      Helvetica: "F1",
      "Times-Roman": "F2",
      Courier: "F3",
    };
    return fontMap[fontFamily] || "F1";
  }

  line(x1: number, y1: number, x2: number, y2: number) {
    this.pages[this.currentPageIndex].push(
      `${x1} ${y1} m`,
      `${x2} ${y2} l`,
      "S"
    );
  }

  circle(x: number, y: number, radius: number) {
    const k = 0.552284749831; // Bézier control point factor for circle approximation
    const r = radius;
    const kr = k * r;

    this.pages[this.currentPageIndex].push(
      `${x} ${y + r} m`, // Move to top
      `${x + kr} ${y + r} ${x + r} ${y + kr} ${x + r} ${y} c`, // Top-right curve
      `${x + r} ${y - kr} ${x + kr} ${y - r} ${x} ${y - r} c`, // Bottom-right curve
      `${x - kr} ${y - r} ${x - r} ${y - kr} ${x - r} ${y} c`, // Bottom-left curve
      `${x - r} ${y + kr} ${x - kr} ${y + r} ${x} ${y + r} c`, // Top-left curve
      "S" // Stroke
    );
  }

  saveState() {
    this.pages[this.currentPageIndex].push("q");
  }

  restoreState() {
    this.pages[this.currentPageIndex].push("Q");
  }

  comment(text: string) {
    this.pages[this.currentPageIndex].push(`% ${text}`);
  }

  private generatePDF(): string {
    const pageCount = this.pages.length;
    const kids = this.pages.map((_, i) => `${3 + i} 0 R`).join(" ");

    let pdf = `%PDF-1.1
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Count ${pageCount}
/Kids [${kids}]
>>
endobj`;

    this.pages.forEach((_content, i) => {
      const { width, height } = this.pageDimensions[i];
      const pageObj = 3 + i;
      const contentObj = 3 + pageCount + i;

      pdf += `
${pageObj} 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 ${width} ${height}]
/Resources <<
/Font <<
/F1 ${3 + pageCount * 2} 0 R
/F2 ${3 + pageCount * 2 + 1} 0 R
/F3 ${3 + pageCount * 2 + 2} 0 R
>>
>>
/Contents ${contentObj} 0 R
>>
endobj`;
    });

    pdf += `
${3 + pageCount * 2} 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj
${3 + pageCount * 2 + 1} 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Times-Roman
>>
endobj
${3 + pageCount * 2 + 2} 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Courier
>>
endobj`;

    this.pages.forEach((content, i) => {
      const stream = content.join("\n");
      const streamLength = stream.length;
      const contentObj = 3 + pageCount + i;

      pdf += `
${contentObj} 0 obj
<< /Length ${streamLength} >>
stream
${stream}
endstream
endobj`;
    });

    const totalObjects = 3 + pageCount * 2 + 3;
    pdf += `
xref
0 ${totalObjects}
0000000000 65535 f `;

    for (let i = 1; i < totalObjects; i++) {
      pdf += `
0000000010 00000 n `;
    }

    pdf += `
trailer
<<
/Root 1 0 R
/Size ${totalObjects}
>>
startxref
472
%%EOF`;

    return pdf;
  }

  getSourceCode() {
    return this.generatePDF();
  }

  toBlob() {
    return new Blob([this.generatePDF()], { type: "application/pdf" });
  }

  toUrl() {
    const blob = this.toBlob();
    return URL.createObjectURL(blob);
  }
}

export default PDF;
