import { Icons } from './icons.js?v=1.0.0';
import { PreviewUtils } from './utils.js?v=1.0.0';

export class SpecializationUpdater {
  static #renderItem(spec, langDict, templateConfig) {
    return `
      <li>
        <article class="specializations">
          <h1 class="specializations-title">
            ${Icons.diplomaIcon(templateConfig)} ${spec.title}
          </h1>
          <span class="keywords">${PreviewUtils.joinKeywords(spec.keywords)}</span>
          <div class="content">
            <p>${langDict.specializationTexts.content.title}: </p>
            <p>${spec.institution}</p>
            <p>${langDict.specializationTexts.content.duration}: </p>
            <p>${spec.duration} ${langDict.specializationTexts.content.time}</p>
            <p>${langDict.specializationTexts.content.description}: </p>
            <p>${spec.description}</p>
          </div>
        </article>
      </li>
    `;
  }

  static update(doc, specializationSection, langDict, templateConfig) {
    if (!specializationSection.specializations?.length) {
      PreviewUtils.insertOrUpdateSection(doc, 'specializations', '');
      return;
    }

    const html = `
      <section id="specializations">
        <h1 class="title">${langDict.specializationTexts.title}</h1>
        <ul class="specializations-list">
          ${PreviewUtils.orderArray(specializationSection.specializations).reduce((acc, spec) => acc + SpecializationUpdater.#renderItem(spec, langDict, templateConfig), '')}
        </ul>
      </section>
    `;

    PreviewUtils.insertOrUpdateSection(doc, 'specializations', html);
  }
}
