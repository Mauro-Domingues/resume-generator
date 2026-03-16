import { DataCollector } from './data-collector.js?v=1.0.0';
import { RegisterTemplate } from './registerTemplate.js?v=1.0.0';
import { PersistenceManager } from './persistence.js?v=1.0.0';
import { Validator } from './validator.js?v=1.0.0';

export class FormActions {
  #registerTemplate;
  #sectionManagers;

  constructor(sectionManagers = {}) {
    this.#registerTemplate = new RegisterTemplate();
    this.#sectionManagers = sectionManagers;
  }

  async #updatePreview() {
    const variables = DataCollector.collect();
    const previewFrame = document.querySelector('#previewFrame');

    if (previewFrame) {
      previewFrame.srcdoc = await this.#registerTemplate.getContent(variables);
    }
  }

  #saveFormData() {
    const data = DataCollector.collect();
    PersistenceManager.save(data);
  }

  async #loadFormData() {
    const savedData = await PersistenceManager.load();
    if (!savedData) return;

    this.#restoreTemplateConfig(savedData.templateConfig);
    this.#sectionManagers.header?.init(savedData.headerSection);
    this.#sectionManagers.description?.init(
      savedData.aboutSection?.descriptions,
    );
    this.#sectionManagers.keywordManager?.init(
      'aboutKeywords',
      savedData.aboutSection?.keywords,
    );
    this.#sectionManagers.skills?.init(savedData.skillSection?.skills);
    this.#sectionManagers.keywordManager?.init(
      'skillsKeywords',
      savedData.skillSection?.keywords,
    );
    this.#restoreTargetSection(savedData.targetSection);
    this.#sectionManagers.experience?.init(
      savedData.experienceSection?.experiences,
    );
    this.#sectionManagers.graduation?.init(
      savedData.graduationSection?.graduations,
    );
    this.#sectionManagers.specialization?.init(
      savedData.specializationSection?.specializations,
    );
    this.#sectionManagers.project?.init(savedData.projectSection?.projects);

    await this.#updatePreview();
  }

  #restoreTemplateConfig(config) {
    if (!config) return;

    const fieldMap = {
      '#templateModel': config.name,
      '#templateLanguage': config.language,
      '#templateFontColor': config.fontColor,
      '#templateFontSize': config.fontSize,
    };

    Object.entries(fieldMap).forEach(([selector, value]) => {
      if (value !== undefined) {
        const element = document.querySelector(selector);
        if (element) element.value = value;
      }
    });

    const monochromeCheckbox = document.querySelector('#templateMonochrome');
    if (monochromeCheckbox && config.monochrome !== undefined) {
      monochromeCheckbox.checked = config.monochrome;
    }
  }

  #restoreTargetSection(target) {
    if (!target) return;

    const positionInput = document.querySelector('#targetPosition');
    if (positionInput && target.position) {
      positionInput.value = target.position;
    }

    this.#sectionManagers.keywordManager?.init(
      'targetKeywords',
      target.keywords,
    );
  }

  #setupAutoPreview() {
    let debounceTimer;
    const updatePreviewDebounced = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        await this.#updatePreview();
        this.#saveFormData();
      }, 500);
    };

    const main = document.querySelector('main');

    main.addEventListener('input', updatePreviewDebounced);
    main.addEventListener('change', updatePreviewDebounced);

    const observer = new MutationObserver(mutations => {
      const hasRemovals = mutations.some(
        mutation => mutation.removedNodes.length > 0,
      );
      if (hasRemovals) {
        updatePreviewDebounced();
      }
    });

    observer.observe(main, {
      childList: true,
      subtree: true,
    });

    this.#updatePreview();
  }

  #setupDownloadPDFButton() {
    const downloadBtn = document.querySelector('#downloadPdf');
    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', () => {
      if (!Validator.validate().isValid) return;

      const previewFrame = document.querySelector('#previewFrame');
      previewFrame?.contentWindow?.print();
    });
  }

  async setupAllActions() {
    await this.#loadFormData();
    this.#setupAutoPreview();
    this.#setupDownloadPDFButton();
  }
}
