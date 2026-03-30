export class StyleUpdater {
  static update(doc, templateConfig) {
    const rootStyle = doc.getElementById('dynamic-root-style');
    if (rootStyle) {
      rootStyle.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
        :root {
          --font-color: ${templateConfig.fontColor};
          --font-size: ${templateConfig.fontSize}px;
          --font-family: ${templateConfig.fontFamily};
        }
      `;
    }

    const tpl = templateConfig.name;
    const stylesheets = [
      'resume', 'header', 'about', 'skills', 'target', 
      'graduation', 'specialization', 'projects', 'experience'
    ];
    
    for (const sheet of stylesheets) {
      const link = doc.getElementById(`${sheet}-style`);
      if (link) {
        link.href = `./src/resume/styles/${tpl}/${sheet}.css`;
      }
    }
  }
}
