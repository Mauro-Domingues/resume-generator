import { readFileSync } from 'node:fs';
import Handlebars from 'handlebars';
import { IParsePartialContentDTO } from 'dtos/IParsePartialContentDTO';
import { IParseContentDTO } from 'dtos/IParseContentDTO';

export class ParseContentService {
  parsePartial({ name, file, variables }: IParsePartialContentDTO) {
    const templateFileContent = readFileSync(file, {
      encoding: 'utf-8',
    });

    const partialTemplate = Handlebars.compile(templateFileContent);
    const parsedPartialTemplate = partialTemplate(variables);

    Handlebars.registerPartial(name, parsedPartialTemplate);
  }

  parseTemplate({ file, variables }: IParseContentDTO) {
    const templateFileContent = readFileSync(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = Handlebars.compile(templateFileContent, {
      compat: true,
    });

    return parseTemplate(variables);
  }
}
