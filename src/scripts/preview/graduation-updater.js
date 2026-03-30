import { Icons } from './icons.js?v=1.0.0';
import { PreviewUtils } from './utils.js?v=1.0.0';

export class GraduationUpdater {
  static #renderItem(graduation, langDict, templateConfig) {
    return `
      <li>
        <article class="graduations">
          <h1 class="graduations-title">
            ${Icons.institutionIcon(templateConfig)} ${graduation.title}
          </h1>
          <span class="keywords">${PreviewUtils.joinKeywords(graduation.keywords)}</span>
          <div class="content">
            <p>${langDict.graduationTexts.content.title}: </p>
            <p>${graduation.institution}</p>
            <p>${langDict.graduationTexts.content.period}: </p>
            <p>${PreviewUtils.formatPeriod(templateConfig, graduation, langDict)}</p>
            <p>${langDict.graduationTexts.content.description}: </p>
            <p>${graduation.description}</p>
          </div>
        </article>
      </li>
    `;
  }

  static update(doc, graduationSection, langDict, templateConfig) {
    if (!graduationSection.graduations?.length) {
      PreviewUtils.insertOrUpdateSection(doc, 'graduations', '');
      return;
    }

    const html = `
      <section id="graduations">
        <h1 class="title">${langDict.graduationTexts.title}</h1>
        <ul class="graduations-list">
          ${PreviewUtils.orderArray(graduationSection.graduations).reduce((acc, graduation) => acc + GraduationUpdater.#renderItem(graduation, langDict, templateConfig), '')}
        </ul>
      </section>
    `;

    PreviewUtils.insertOrUpdateSection(doc, 'graduations', html);
  }
}
