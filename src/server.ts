import { appendFileSync, truncateSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { PDFService } from 'services/PDFService';
import { RegisteTemplateService } from 'services/RegisterTemplateService';
import { IVariablesDTO } from 'dtos/IVariablesDTO';
import data from './assets/data.json' assert { type: 'json' };

const provider = new PDFService();

provider
  .generate({
    template: new RegisteTemplateService().getContent(
      data as unknown as IVariablesDTO,
    ),
  })
  .then(result => {
    const pdfPath = resolve('resume.pdf');

    if (existsSync(pdfPath)) {
      truncateSync(pdfPath);
    }

    appendFileSync(pdfPath, result);
  });
