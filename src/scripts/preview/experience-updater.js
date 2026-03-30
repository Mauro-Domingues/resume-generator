import { Icons } from './icons.js?v=1.0.0';
import { PreviewUtils } from './utils.js?v=1.0.0';

export class ExperienceUpdater {
  static #renderItem(experience, langDict, templateConfig) {
    return `
      <li>
        <article class="occupation">
          <h1 class="occupation-title">
            ${Icons.pinIcon(templateConfig)} ${experience.title}
          </h1>
          <span class="keywords">${PreviewUtils.joinKeywords(experience.keywords)}</span>
          <div class="content">
            <p>${langDict.experienceTexts.content.title}: </p>
            <p>${experience.company}</p>
            <p>${langDict.experienceTexts.content.period}: </p>
            <p>${PreviewUtils.formatPeriod(templateConfig, experience, langDict)}</p>
            <p>${langDict.experienceTexts.content.description}: </p>
            <p>${experience.description}</p>
          </div>
        </article>
      </li>
    `;
  }

  static update(doc, experienceSection, langDict, templateConfig) {
    if (!experienceSection.experiences?.length) {
      PreviewUtils.insertOrUpdateSection(doc, 'experiences', '');
      return;
    }

    const html = `
      <section id="experiences">
        <h1 class="title">${langDict.experienceTexts.title}</h1>
        <ul class="experiences-list">
          ${PreviewUtils.orderArray(experienceSection.experiences).reduce((acc, exp) => acc + ExperienceUpdater.#renderItem(exp, langDict, templateConfig), '')}
        </ul>
      </section>
    `;

    PreviewUtils.insertOrUpdateSection(doc, 'experiences', html);
  }
}
