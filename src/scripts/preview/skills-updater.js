import { PreviewUtils } from './utils.js?v=1.0.0';

export class SkillsUpdater {
  static #renderItem(skill, langDict) {
    return `
      <li>
        <span>${skill.title} - ${langDict.skillTexts.options[skill.level]}</span>
      </li>
    `;
  }

  static update(doc, skillSection, langDict) {
    if (!skillSection.skills?.length) {
      PreviewUtils.insertOrUpdateSection(doc, 'skills', '');
      return;
    }

    const html = `
      <section id="skills">
        <h1 class="title">${langDict.skillTexts.title}</h1>
        <span class="keywords">${PreviewUtils.joinKeywords(skillSection.keywords)}</span>
        <div class="content">
          <ul class="skill-list">
            ${PreviewUtils.orderArray(skillSection.skills).reduce((acc, skill) => acc + SkillsUpdater.#renderItem(skill, langDict), '')}
          </ul>
        </div>
      </section>
    `;

    PreviewUtils.insertOrUpdateSection(doc, 'skills', html);
  }
}
