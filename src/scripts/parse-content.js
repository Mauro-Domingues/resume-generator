export class ParseContent {
  static #fileCache = new Map();

  static async #fetchText(file) {
    if (ParseContent.#fileCache.has(file)) {
      return ParseContent.#fileCache.get(file);
    }
    const response = await fetch(file, {
      cache: 'force-cache'
    });
    const text = await response.text();
    ParseContent.#fileCache.set(file, text);
    return text;
  }

  async parsePartial({ name, file, variables }) {
    const templateFileContent = await ParseContent.#fetchText(file);
    const partialTemplate = Handlebars.compile(templateFileContent);
    const parsedPartialTemplate = partialTemplate(variables);
    Handlebars.registerPartial(name, parsedPartialTemplate);
  }

  async parseTemplate({ file, variables }) {
    const templateFileContent = await ParseContent.#fetchText(file);
    const parseTemplate = Handlebars.compile(templateFileContent, {
      compat: true,
    });
    return parseTemplate(variables);
  }
}
