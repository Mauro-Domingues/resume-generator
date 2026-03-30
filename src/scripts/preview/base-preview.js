export const getBasePreviewHtml = ({ templateConfig, htmlTexts }) => {
  const tplName = templateConfig.name;

  return `
<!DOCTYPE html>
<html lang="${htmlTexts.language}">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview - ${htmlTexts.title}</title>
  
  <link rel="stylesheet" href="./src/resume/styles/styles.css" id="base-style">
  <link rel="stylesheet" href="./src/resume/styles/${tplName}/resume.css" id="resume-style">
  <link rel="stylesheet" href="./src/resume/styles/${tplName}/header.css" id="header-style">
  <link rel="stylesheet" href="./src/resume/styles/${tplName}/about.css" id="about-style">
  <link rel="stylesheet" href="./src/resume/styles/${tplName}/skills.css" id="skills-style">
  <link rel="stylesheet" href="./src/resume/styles/${tplName}/target.css" id="target-style">
  <link rel="stylesheet" href="./src/resume/styles/${tplName}/graduation.css" id="graduation-style">
  <link rel="stylesheet" href="./src/resume/styles/${tplName}/specialization.css" id="specialization-style">
  <link rel="stylesheet" href="./src/resume/styles/${tplName}/projects.css" id="projects-style">
  <link rel="stylesheet" href="./src/resume/styles/${tplName}/experience.css" id="experience-style">

  <style id="dynamic-root-style">
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
    :root {
      --font-color: ${templateConfig.fontColor};
      --font-size: ${templateConfig.fontSize}px;
      --font-family: ${templateConfig.fontFamily};
    }
  </style>
</head>
<body>
  <!-- Sections will be dynamically inserted here by PreviewUtils -->
</body>
</html>
  `.trim();
};
