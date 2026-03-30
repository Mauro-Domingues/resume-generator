import { PreviewUtils } from './utils.js?v=1.0.0';

export class AboutUpdater {
  static #renderItem(desc) {
    return `<li>${desc}</li>`;
  }

  static update(doc, aboutSection, langDict) {
    if (!aboutSection.descriptions?.length) {
      PreviewUtils.insertOrUpdateSection(doc, 'about', '');
      return;
    }

    const html = `<section id="about">
        <h1 class="title">${langDict.aboutTexts.title}</h1>
        <span class="keywords">${PreviewUtils.joinKeywords(aboutSection.keywords)}</span>
        <ul class="content">
          ${aboutSection.descriptions
        .reduce((acc, desc) => acc + AboutUpdater.#renderItem(desc), '')
      }
        </ul>
      </section>`;

    PreviewUtils.insertOrUpdateSection(doc, 'about', html);
  }
}
