import { PreviewUtils } from './utils.js?v=1.0.0';

export class TargetUpdater {
  static update(doc, targetSection, langDict) {
    if (!targetSection.position) {
      PreviewUtils.insertOrUpdateSection(doc, 'target', '');
      return;
    }

    const html = `<section id="target">
        <h1 class="title">${langDict.targetTexts.title}</h1>
        <div class="content">
        <p>${targetSection.position}</p>
        </div>
        <span class="keywords">${PreviewUtils.joinKeywords(targetSection.keywords)}</span>
      </section>`;

    PreviewUtils.insertOrUpdateSection(doc, 'target', html);
  }
}
