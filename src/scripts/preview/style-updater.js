export class StyleUpdater {
  static #cssCache = new Map();

  static async #fetchCss(url) {
    if (StyleUpdater.#cssCache.has(url)) return StyleUpdater.#cssCache.get(url);
    try {
      const res = await fetch(url, { cache: 'force-cache' });
      const text = res.ok ? await res.text() : '';
      StyleUpdater.#cssCache.set(url, text);
      return text;
    } catch {
      return '';
    }
  }

  static #setInlineStyle(doc, id, css) {
    let element = doc.getElementById(id);

    if (!css) {
      if (element) element.remove();
      return;
    }

    if (!element) {
      element = doc.createElement('style');
      element.id = id;
      doc.head.appendChild(element);
    }

    element.textContent = css;
  }

  static #sections(base, data) {
    const { headerSection, aboutSection, skillSection, targetSection,
      graduationSection, specializationSection, projectSection, experienceSection } = data;

    return [
      { id: 'base-style', cssPath: './src/resume/styles/styles.css', active: true },
      { id: 'resume-style', cssPath: `${base}/resume.css`, active: true },
      { id: 'header-style', cssPath: `${base}/header.css`, active: !!headerSection?.header?.name },
      { id: 'about-style', cssPath: `${base}/about.css`, active: !!aboutSection?.descriptions?.length },
      { id: 'skills-style', cssPath: `${base}/skills.css`, active: !!skillSection?.skills?.length },
      { id: 'target-style', cssPath: `${base}/target.css`, active: !!targetSection?.position },
      { id: 'graduation-style', cssPath: `${base}/graduation.css`, active: !!graduationSection?.graduations?.length },
      { id: 'specialization-style', cssPath: `${base}/specialization.css`, active: !!specializationSection?.specializations?.length },
      { id: 'projects-style', cssPath: `${base}/projects.css`, active: !!projectSection?.projects?.length },
      { id: 'experience-style', cssPath: `${base}/experience.css`, active: !!experienceSection?.experiences?.length },
    ];
  }

  static async update(doc, data) {
    const { templateConfig } = data;
    const base = `./src/resume/styles/${templateConfig.name}`;

    StyleUpdater.#setInlineStyle(doc, 'dynamic-root-style', `@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
      :root {
        --font-color: ${templateConfig.fontColor};
        --font-size: ${templateConfig.fontSize}px;
        --font-family: ${templateConfig.fontFamily};
      }`);

    await Promise.all(
      StyleUpdater.#sections(base, data).map(async ({ id, cssPath, active }) => {
        const css = active ? await StyleUpdater.#fetchCss(cssPath) : '';
        StyleUpdater.#setInlineStyle(doc, id, css);
      })
    );

  }
}
