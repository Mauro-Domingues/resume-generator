import { BaseListManager } from './base/baseListManager.js?v=1.0.0';
import { KeywordMixin } from './base/keywordMixin.js?v=1.0.0';

export class Specialization extends KeywordMixin(BaseListManager) {
  constructor() {
    super('specializationList', 'specializationAdd');
  }

  createItemHTML(index) {
    return `
      <label for="specializationList-title-${index}">TÍTULO</label>
      <input id="specializationList-title-${index}" class="title" placeholder="Título" required aria-required="true" aria-label="Título da especialização"/>
      <label for="specializationList-institution-${index}">INSTITUIÇÃO</label>
      <input id="specializationList-institution-${index}" class="institution" placeholder="Instituição" required aria-required="true" aria-label="Nome da instituição"/>
      <label for="specializationList-duration-${index}">DURAÇÃO (HORAS)</label>
      <input type="number" id="specializationList-duration-${index}" class="duration" placeholder="Duração (horas)" required aria-required="true" aria-label="Duração em horas"/>
      <label for="specializationList-description-${index}">DESCRIÇÃO</label>
      <textarea id="specializationList-description-${index}" class="description" placeholder="Descrição" required aria-required="true" aria-label="Descrição da especialização"></textarea>
    `;
  }

  setupItemBehavior(item, index) {
    const { keywordsSub } = this.createKeywordsSection(
      item,
      index,
      'Palavras-chave',
    );

    item._keywordsSub = keywordsSub;
  }

  populateItem(item, index, data) {
    super.populateItem(item, index, data);

    if (item._keywordsSub && data.keywords) {
      this.populateKeywords(item._keywordsSub, index, data.keywords);
    }
  }

  getItemAriaLabel() {
    return 'Item de especialização';
  }

  getRemoveAriaLabel() {
    return 'Remover especialização';
  }
}
