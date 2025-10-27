import "./style.css";
import { PDF, Matrix } from "easy-jspdf";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

const defaultCode = `const doc = new PDF();

doc.createPage(612, 792); // US Letter size
doc.line(50, 50, 200, 50);
doc.line(50, 50, 50, 200);

return doc;`;

const savedCode = localStorage.getItem("playground-code") || defaultCode;

const editor = monaco.editor.create(document.getElementById("editor")!, {
  value: savedCode,
  language: "typescript",
  theme: "vs-dark",
  automaticLayout: true,
});

editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
  // Prevent default Ctrl+S behavior
});

function updatePDF() {
  try {
    const code = editor.getValue();
    const func = new Function("PDF", "Matrix", code);
    const doc = func(PDF, Matrix);
    const url = doc.toUrl();
    document.querySelector<HTMLEmbedElement>("#app")!.src = url;
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
}

editor.onDidChangeModelContent(() => {
  const code = editor.getValue();
  localStorage.setItem("playground-code", code);
  updatePDF();
});

updatePDF();
