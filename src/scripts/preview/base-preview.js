export const getBasePreviewHtml = ({ htmlTexts }) => {
  return `<!DOCTYPE html>
<html lang="${htmlTexts.language}">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview - ${htmlTexts.title}</title>
</head>
<body>
</body>
</html>`;
};
