import { getColorValues } from "./utils";
import { Matrix } from "@easy-jspdf/matrix";
import { Primitive } from "./primitive";

export { Matrix };

export class PDF extends Primitive {
  private pageDimensions: { width: number; height: number }[] = [];

  constructor() {
    super();
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

    let self = this;
    let index = this.currentPageIndex;

    return new Proxy(this, {
      get: (target, prop, receiver) => {
        self.setCurrentPage(index);

        return Reflect.get(target, prop, receiver);
      },
    });
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

  /**
   * Adds the w operator to set the line width
   * @param width width of the line
   */
  setLineWidth(width: number) {
    if (!this.pages.length) {
      throw new Error("No pages available. Create a page first.");
    }

    this.pages[this.currentPageIndex].push(`${width} w`);
    return this;
  }

  /**
   * Adds the d operator to set the line dash pattern
   * @param dashArray array defining the dash pattern
   * @param dashPhase phase offset for the dash pattern
   */
  setLineDash(dashArray: number[], dashPhase: number = 0) {
    const dashString = dashArray.join(" ");
    this.pages[this.currentPageIndex].push(`[${dashString}] ${dashPhase} d`);
    return this;
  }

  setFillColor(r: number | string, g?: number, b?: number) {
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

    this.pages[this.currentPageIndex].push(`${red} ${green} ${blue} rg`);
    return this;
  }

  /**
   * Adds the q operator to save the current graphics state
   */
  saveState() {
    this.pages[this.currentPageIndex].push("q");
  }

  /**
   * Adds the Q operator to restore the previously saved graphics state
   */
  restoreState() {
    this.pages[this.currentPageIndex].push("Q");
  }

  /**
   * Added the matrix API that applies a transformation matrix using the PDF cm operator. The method takes six parameters representing the transformation matrix
   * @param a Scaling factor in X direction
   * @param b Skewing factors in Y direction
   * @param c Skewing factors in X direction
   * @param d Scaling factors in Y direction
   * @param e Translation factors in X direction
   * @param f Translation factors in Y direction
   */
  matrix(a: number, b: number, c: number, d: number, e: number, f: number) {
    this.pages[this.currentPageIndex].push(`${a} ${b} ${c} ${d} ${e} ${f} cm`);
  }

  private generatePDF(): string {
    const pageCount = this.pages.length;
    const kids = this.pages.map((_, i) => `${3 + i} 0 R`).join(" ");

    let pdf = `%PDF-1.7
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

    let totalObjects = 3 + pageCount * 2 + 3;

    const infoObj = totalObjects;
    totalObjects++;
    pdf += `
${infoObj} 0 obj
<<
/Author (${this.author})
/Title (${this.title})
/Subject (${this.subject})
/Creator (Easy jsPDF)
/Producer (Easy jsPDF)
>>
endobj`;

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
/Info ${this.author ? totalObjects - 1 : ""} 0 R
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
