import { readFileSync } from 'node:fs';
import Handlebars from 'handlebars';

export class ParseContent {
  parsePartial({ name, file, variables }) {
    const templateFileContent = readFileSync(file, {
      encoding: 'utf-8',
    });

    const partialTemplate = Handlebars.compile(templateFileContent);
    const parsedPartialTemplate = partialTemplate(variables);

    Handlebars.registerPartial(name, parsedPartialTemplate);
  }

  parseTemplate({ file, variables }) {
    const templateFileContent = readFileSync(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = Handlebars.compile(templateFileContent, {
      compat: true,
    });

    return parseTemplate(variables);
  }
}
