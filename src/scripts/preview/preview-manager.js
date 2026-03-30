import { getBasePreviewHtml } from './base-preview.js?v=1.0.0';
import { PreviewTranslations } from './preview-translations.js?v=1.0.0';
import { StyleUpdater } from './style-updater.js?v=1.0.0';
import { HeaderUpdater } from './header-updater.js?v=1.0.0';
import { AboutUpdater } from './about-updater.js?v=1.0.0';
import { TargetUpdater } from './target-updater.js?v=1.0.0';
import { ExperienceUpdater } from './experience-updater.js?v=1.0.0';
import { GraduationUpdater } from './graduation-updater.js?v=1.0.0';
import { SpecializationUpdater } from './specialization-updater.js?v=1.0.0';
import { SkillsUpdater } from './skills-updater.js?v=1.0.0';
import { ProjectsUpdater } from './projects-updater.js?v=1.0.0';

export class PreviewManager {
  static async update(data) {
    const iframe = document.querySelector('#previewFrame');
    if (!iframe) return;

    const langDict = PreviewTranslations[data.templateConfig.language];

    const isLoaded = iframe.contentDocument?.getElementById('base-style');

    if (!isLoaded) {
      await new Promise(resolve => {
        iframe.onload = resolve;
        iframe.srcdoc = getBasePreviewHtml({
          htmlTexts: langDict.html,
        });
      });
      iframe.onload = null;
    }

    const doc = iframe.contentDocument;

    await StyleUpdater.update(doc, data);
    HeaderUpdater.update(doc, data.headerSection, data.templateConfig);
    AboutUpdater.update(doc, data.aboutSection, langDict);
    TargetUpdater.update(doc, data.targetSection, langDict);
    ExperienceUpdater.update(doc, data.experienceSection, langDict, data.templateConfig);
    GraduationUpdater.update(doc, data.graduationSection, langDict, data.templateConfig);
    SpecializationUpdater.update(doc, data.specializationSection, langDict, data.templateConfig);
    SkillsUpdater.update(doc, data.skillSection, langDict, data.templateConfig);
    ProjectsUpdater.update(doc, data.projectSection, langDict);
  }
}
