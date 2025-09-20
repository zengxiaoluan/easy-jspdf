import './style.css'
import { EasyPDF } from 'easy-jspdf'

// Playground for testing EasyPDF features
function createPlayground() {
  const app = document.querySelector<HTMLDivElement>('#app')!

  app.innerHTML = `
    <div class="playground">
      <header>
        <h1>🎮 EasyPDF Playground</h1>
        <p>Interactive testing environment for the EasyPDF library</p>
      </header>
      
      <main>
        <section class="controls">
          <h2>Document Creation</h2>
          <div class="control-group">
            <label for="format">Format:</label>
            <select id="format">
              <option value="a4">A4</option>
              <option value="a3">A3</option>
              <option value="letter">Letter</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          
          <div class="control-group">
            <label for="orientation">Orientation:</label>
            <select id="orientation">
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
          </div>
          
          <div class="control-group custom-size" style="display: none;">
            <label for="width">Width (mm):</label>
            <input type="number" id="width" value="210" min="10" max="1000">
            <label for="height">Height (mm):</label>
            <input type="number" id="height" value="297" min="10" max="1000">
          </div>
          
          <div class="control-group">
            <label for="unit">Unit:</label>
            <select id="unit">
              <option value="mm">Millimeters (mm)</option>
              <option value="pt">Points (pt)</option>
              <option value="in">Inches (in)</option>
              <option value="px">Pixels (px)</option>
            </select>
          </div>
          
          <div class="control-group">
            <label>
              <input type="checkbox" id="compress" checked>
              Enable compression
            </label>
          </div>
          
          <button id="create-pdf" class="primary-btn">Create PDF</button>
          <button id="add-page" class="secondary-btn" disabled>Add Page</button>
        </section>
        
        <section class="output">
          <h2>Document Info</h2>
          <div id="pdf-info" class="info-panel">
            <p>No PDF created yet. Use the controls above to create one.</p>
          </div>
          
          <h2>Console Output</h2>
          <div id="console-output" class="console"></div>
        </section>
      </main>
    </div>
  `

  setupEventListeners()
}

let currentPDF: EasyPDF | null = null

function setupEventListeners() {
  const formatSelect = document.getElementById('format') as HTMLSelectElement
  const customSizeDiv = document.querySelector('.custom-size') as HTMLDivElement
  const createBtn = document.getElementById('create-pdf') as HTMLButtonElement
  const addPageBtn = document.getElementById('add-page') as HTMLButtonElement

  // Show/hide custom size inputs
  formatSelect.addEventListener('change', () => {
    customSizeDiv.style.display = formatSelect.value === 'custom' ? 'block' : 'none'
  })

  // Create PDF button
  createBtn.addEventListener('click', createPDF)

  // Add page button
  addPageBtn.addEventListener('click', addPage)
}

function createPDF() {
  const format = (document.getElementById('format') as HTMLSelectElement).value
  const orientation = (document.getElementById('orientation') as HTMLSelectElement).value as 'portrait' | 'landscape'
  const unit = (document.getElementById('unit') as HTMLSelectElement).value as 'mm' | 'pt' | 'in' | 'px'
  const compress = (document.getElementById('compress') as HTMLInputElement).checked

  let pdfFormat: 'a4' | 'a3' | 'letter' | [number, number]

  if (format === 'custom') {
    const width = parseInt((document.getElementById('width') as HTMLInputElement).value)
    const height = parseInt((document.getElementById('height') as HTMLInputElement).value)
    pdfFormat = [width, height]
  } else {
    pdfFormat = format as 'a4' | 'a3' | 'letter'
  }

  try {
    currentPDF = EasyPDF.create({
      format: pdfFormat,
      orientation,
      unit,
      compress
    })

    updatePDFInfo()
    document.getElementById('add-page')!.removeAttribute('disabled')

    logToConsole('✅ PDF created successfully!', 'success')
    logToConsole(`Format: ${JSON.stringify(pdfFormat)}`, 'info')
    logToConsole(`Orientation: ${orientation}`, 'info')
    logToConsole(`Unit: ${unit}`, 'info')
    logToConsole(`Compression: ${compress}`, 'info')

  } catch (error) {
    logToConsole(`❌ Error creating PDF: ${error}`, 'error')
  }
}

function addPage() {
  if (!currentPDF) return

  try {
    currentPDF.addPage()
    updatePDFInfo()
    logToConsole(`📄 Page added. Total pages: ${currentPDF.getPageCount()}`, 'success')
  } catch (error) {
    logToConsole(`❌ Error adding page: ${error}`, 'error')
  }
}

function updatePDFInfo() {
  if (!currentPDF) return

  const infoPanel = document.getElementById('pdf-info')!
  const options = currentPDF.getOptions()
  const pageSize = currentPDF.getPageSize()
  const pageCount = currentPDF.getPageCount()
  const currentPage = currentPDF.getCurrentPage()

  infoPanel.innerHTML = `
    <div class="info-grid">
      <div class="info-item">
        <strong>Format:</strong> ${JSON.stringify(options.format)}
      </div>
      <div class="info-item">
        <strong>Orientation:</strong> ${options.orientation}
      </div>
      <div class="info-item">
        <strong>Unit:</strong> ${options.unit}
      </div>
      <div class="info-item">
        <strong>Compression:</strong> ${options.compress ? 'Enabled' : 'Disabled'}
      </div>
      <div class="info-item">
        <strong>Page Size:</strong> ${pageSize.width} × ${pageSize.height} ${options.unit}
      </div>
      <div class="info-item">
        <strong>Total Pages:</strong> ${pageCount}
      </div>
      <div class="info-item">
        <strong>Current Page:</strong> ${currentPage?.getPageNumber() || 'None'}
      </div>
    </div>
  `
}

function logToConsole(message: string, type: 'info' | 'success' | 'error' = 'info') {
  const consoleOutput = document.getElementById('console-output')!
  const timestamp = new Date().toLocaleTimeString()
  const logEntry = document.createElement('div')
  logEntry.className = `log-entry log-${type}`
  logEntry.innerHTML = `<span class="timestamp">[${timestamp}]</span> ${message}`

  consoleOutput.appendChild(logEntry)
  consoleOutput.scrollTop = consoleOutput.scrollHeight
}

// Initialize playground
createPlayground()