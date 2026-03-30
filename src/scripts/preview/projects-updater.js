import { PreviewUtils } from './utils.js?v=1.0.0';

export class ProjectsUpdater {
  static #renderBanner(project) {
    if (!project.banner) return '';
    return `
      <figure>
        <img class="project-image" src="${project.banner}" alt="banner of ${project.title}">
      </figure>
    `;
  }

  static #renderLink(project) {
    if (!project.link) return '';
    return `
      <a href="${project.link.ref}" target="_blank">
        (${project.link.value})
      </a>
    `;
  }

  static #renderItem(project) {
    return `
      <li>
        <article class="project">
          ${ProjectsUpdater.#renderBanner(project)}
          <div class="content">
            <h1 class="project-title">
              ${project.title}
              ${ProjectsUpdater.#renderLink(project)}
            </h1>
            <span class="keywords">${PreviewUtils.joinKeywords(project.keywords)}</span>
            <p>${project.description}</p>
          </div>
        </article>
      </li>
    `;
  }

  static update(doc, projectSection, langDict) {
    if (!projectSection.projects?.length) {
      PreviewUtils.insertOrUpdateSection(doc, 'projects', '');
      return;
    }

    const html = `
      <section id="projects">
        <h1 class="title">${langDict.projectTexts.title}</h1>
        <ul class="project-list">
          ${PreviewUtils.orderArray(projectSection.projects).reduce((acc, project) => acc + ProjectsUpdater.#renderItem(project), '')}
        </ul>
      </section>
    `;

    PreviewUtils.insertOrUpdateSection(doc, 'projects', html);
  }
}
