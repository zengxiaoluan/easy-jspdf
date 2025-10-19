export class PDF {
  private pages: string[][];
  private currentPageIndex: number;

  constructor() {
    this.pages = [["BT", "70 70 TD", "/F1 24 Tf", "(Hello World) Tj", "ET"]];
    this.currentPageIndex = 0;
  }

  /**
   * Creates a new page in the PDF document.
   */
  createPage() {
    this.pages.push([]);
    this.currentPageIndex = this.pages.length - 1;
  }

  line(x1: number, y1: number, x2: number, y2: number) {
    this.pages[this.currentPageIndex].push(
      `${x1} ${y1} m`,
      `${x2} ${y2} l`,
      "S"
    );
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
/MediaBox [0 0 300 144]
/Count ${pageCount}
/Kids [${kids}]
>>
endobj`;

    this.pages.forEach((content, i) => {
      const stream = content.join("\n");
      const streamLength = stream.length;
      const pageObj = 3 + i;
      const contentObj = 3 + pageCount + i;

      pdf += `
${pageObj} 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 ${3 + pageCount * 2} 0 R
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

    const totalObjects = 3 + pageCount * 2 + 1;
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

  toBlob() {
    return new Blob([this.generatePDF()], { type: "application/pdf" });
  }

  toUrl() {
    const blob = this.toBlob();
    return URL.createObjectURL(blob);
  }
}

export default PDF;
