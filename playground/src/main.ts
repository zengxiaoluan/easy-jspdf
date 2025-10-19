import "./style.css";
import { PDF } from "easy-jspdf";

let doc = new PDF();

doc.createPage();
doc.line(0, 10, 100, 10);

let url = doc.toUrl();

document.querySelector<HTMLEmbedElement>("#app")!.src = url;
