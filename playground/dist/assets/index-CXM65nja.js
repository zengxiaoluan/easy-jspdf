(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();class p{pages;pageDimensions;currentPageIndex;constructor(){this.pages=[["BT","70 70 TD","/F1 24 Tf","(Hello World) Tj","ET"]],this.pageDimensions=[{width:300,height:144}],this.currentPageIndex=0}createPage(t=300,n=144){this.pages.push([]),this.pageDimensions.push({width:t,height:n}),this.currentPageIndex=this.pages.length-1}setCurrentPage(t){if(t>=0&&t<this.pages.length)this.currentPageIndex=t;else throw new Error("Invalid page index")}line(t,n,s,e){this.pages[this.currentPageIndex].push(`${t} ${n} m`,`${s} ${e} l`,"S")}generatePDF(){const t=this.pages.length,n=this.pages.map((r,o)=>`${3+o} 0 R`).join(" ");let s=`%PDF-1.1
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Count ${t}
/Kids [${n}]
>>
endobj`;this.pages.forEach((r,o)=>{const{width:a,height:c}=this.pageDimensions[o],l=3+o,h=3+t+o;s+=`
${l} 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 ${a} ${c}]
/Resources <<
/Font <<
/F1 ${3+t*2} 0 R
>>
>>
/Contents ${h} 0 R
>>
endobj`}),s+=`
${3+t*2} 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj`,this.pages.forEach((r,o)=>{const a=r.join(`
`),c=a.length,l=3+t+o;s+=`
${l} 0 obj
<< /Length ${c} >>
stream
${a}
endstream
endobj`});const e=3+t*2+1;s+=`
xref
0 ${e}
0000000000 65535 f `;for(let r=1;r<e;r++)s+=`
0000000010 00000 n `;return s+=`
trailer
<<
/Root 1 0 R
/Size ${e}
>>
startxref
472
%%EOF`,s}toBlob(){return new Blob([this.generatePDF()],{type:"application/pdf"})}toUrl(){const t=this.toBlob();return URL.createObjectURL(t)}}let i=new p;i.createPage(1024,768);i.line(0,10,100,10);i.line(10,10,100,100);i.setCurrentPage(0);i.line(0,50,200,50);i.line(50,0,50,200);let u=i.toUrl();document.querySelector("#app").src=u;
