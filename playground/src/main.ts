import './style.css'
import * as easy from 'easy-jspdf'

console.log(easy)

const blob = new Blob([easy.default], { type: "application/pdf" });
const url = URL.createObjectURL(blob);

document.querySelector<HTMLEmbedElement>('#app')!.src = url
