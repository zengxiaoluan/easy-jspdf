import "./style.css";
import { PDF } from "easy-jspdf";

let doc = new PDF();

doc.createPage(1024, 768);

doc.line(0, 10, 100, 10);
doc.line(10, 10, 100, 100);

let url = doc.toUrl();

document.querySelector<HTMLEmbedElement>("#app")!.src = url;
