const pdf = `%PDF-1.1
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
/Count 1
/Kids [3 0 R]
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 4 0 R
>>
>>
/Contents 5 0 R
>>
endobj
4 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj
5 0 obj
<< /Length 44 >>
stream
BT
70 70 TD
/F1 24 Tf
(Hello World) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000067 00000 n 
0000000178 00000 n 
0000000328 00000 n 
0000000389 00000 n 
trailer
<<
/Root 1 0 R
/Size 6
>>
startxref
472
%%EOF`;

// const blob = new Blob([pdf], { type: "application/pdf" });
// const url = URL.createObjectURL(blob);

export default pdf