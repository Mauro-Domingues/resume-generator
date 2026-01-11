import { DataCollector } from './data-collector.js';
// import { PDFService } from './PDFService.js';
// import { RegisterTemplate } from './RegisterTemplate.js';

export class FormActions {
  registerTemplate
  PDFService

  constructor() {
    // this.registerTemplate = new RegisterTemplate();
    // this.PDFService = new PDFService();
  }

  static updatePreview() {
    const variables = DataCollector.collect();

    const previewFrame = document.querySelector('#previewFrame');

    if (previewFrame) {
      // previewFrame.srcDoc = this.registerTemplate.getContent(variables);
    }
  }

  static setupAutoPreview() {
    let debounceTimer;
    const updatePreviewDebounced = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => this.updatePreview(), 500);
    };

    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('input', updatePreviewDebounced);
      input.addEventListener('change', updatePreviewDebounced);
    });

    this.updatePreview();
  }

  static setupPreviewButton() {
    const previewBtn = document.querySelector('#preview');
    if (!previewBtn) return;

    previewBtn.addEventListener('click', async () => {
      this.updatePreview();
    });
  }

  static setupDownloadPDFButton() {
    const copyJsonBtn = document.querySelector('#downloadPdf');
    if (!copyJsonBtn) return;

    copyJsonBtn.addEventListener('click', async () => {
      const downloadBtn = document.querySelector('#downloadPdf');
      if (!downloadBtn) return;

      downloadBtn.addEventListener('click', async () => {
        try {
          const variables = DataCollector.collect();
          const resp = await fetch('/api/pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(variables),
          });

          if (!resp.ok) {
            const err = await resp.json();
            alert('Error: ' + (err?.error || resp.statusText));
            return;
          }

          const blob = await resp.blob();
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'resume.pdf';
          a.click();
          URL.revokeObjectURL(url);
        } catch (err) {
          console.error('Download PDF error:', err);
          alert('Error downloading PDF: ' + err.message);
        }
      });
    })
  }

  static setupCopyJsonButton() {
    const copyJsonBtn = document.querySelector('#copyJson');
    if (!copyJsonBtn) return;

    copyJsonBtn.addEventListener('click', async () => {
      try {
        const variables = DataCollector.collect();
        const jsonString = JSON.stringify(variables, null, 2);
        await navigator.clipboard.writeText(jsonString);
        alert('JSON copiado para a área de transferência!');
      } catch (err) {
        console.error('Copy JSON error:', err);
        alert('Erro ao copiar JSON: ' + err.message);
      }
    });
  }

  static setupAllActions() {
    this.setupAutoPreview();
    this.setupDownloadPDFButton();
    this.setupCopyJsonButton();
  }
}
