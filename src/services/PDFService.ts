import { IGenerateDTO } from 'dtos/IGeneratePDFDTO';
import { Browser, launch } from 'puppeteer';

export class PDFService {
  #browser!: Browser;

  async #init(): Promise<void> {
    if (!this.#browser) {
      /**
       * @description If the API doesn't run local, comment out lines 18 and 22 (or install chromium on the pc).
       */
      this.#browser = await launch({
        headless: true,
        // executablePath: '/snap/bin/chromium', // @coment
        handleSIGINT: true,
        handleSIGHUP: true,
        handleSIGTERM: true,
        // channel: 'chrome', // @coment
        defaultViewport: null,
        ignoreDefaultArgs: [
          '--disable-extensions',
          '--no-sandbox',
          '--disable-acelerated-2d-canvas',
          '--disable-gpu',
          '--no-first-run',
          '--no-zygote',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--single-process',
          '--mute-audio',
          '--disable-default-apps',
          '--metrics-recording-only',
          '--disable-sync',
          '--disable-cloud-import',
          '--disable-breakpad',
        ],
        pipe: true,
      });
    }
  }

  async generate(data: IGenerateDTO): Promise<Uint8Array> {
    if (!this.#browser) {
      await this.#init();
    }

    const page = await this.#browser.newPage();

    await page.setContent(data.template, { waitUntil: 'domcontentloaded' });

    const pdf = await page.pdf({
      format: 'A4',
    });

    await page.close({ runBeforeUnload: false });

    return pdf;
  }
}
