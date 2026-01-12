import { DataCollector } from './data-collector.js';
// import { PDFService } from './PDFService.js';
import { RegisterTemplate } from './registerTemplate.js';

export class FormActions {
  registerTemplate
  PDFService

  constructor() {
    this.registerTemplate = new RegisterTemplate();
    // this.PDFService = new PDFService();
  }

  async updatePreview() {
    const variables = DataCollector.collect();

    const previewFrame = document.querySelector('#previewFrame');

    if (previewFrame) {
      const htmlContent = await this.registerTemplate.getContent(variables);

      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      previewFrame.src = url;

      console.log('Preview atualizado:', htmlContent.length, 'caracteres');
    }
  }

  async setupAutoPreview() {
    let debounceTimer;
    const updatePreviewDebounced = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => await this.updatePreview(), 500);
    };

    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('input', updatePreviewDebounced);
      input.addEventListener('change', updatePreviewDebounced);
    });

    await this.updatePreview();
  }

  async setupPreviewButton() {
    const previewBtn = document.querySelector('#preview');
    if (!previewBtn) return;

    previewBtn.addEventListener('click', async () => {
      const variables = DataCollector.collect();
      const htmlContent = await this.registerTemplate.getContent(variables);

      const newWindow = window.open();
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    });
  }

  setupDownloadPDFButton() {
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

  setupCopyJsonButton() {
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

  setupAllActions() {
    this.setupAutoPreview();
    this.setupDownloadPDFButton();
    this.setupCopyJsonButton();
  }
}
