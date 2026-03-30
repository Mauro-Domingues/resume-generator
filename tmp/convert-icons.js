const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src', 'resume', 'icons');
const destFile = path.join(__dirname, '..', 'src', 'scripts', 'preview', 'icons.js');

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.hbs'));

let output = 'export const Icons = {\n';

for (const file of files) {
  const content = fs.readFileSync(path.join(srcDir, file), 'utf8');
  
  // Convert {{#if monochrome}}{{fontColor}}{{else}}#HEX{{/if}} to ${monochrome ? fontColor : '#HEX'}
  let modifiedContent = content.replace(/\{\{#if monochrome\}\}\{\{fontColor\}\}\{\{else\}\}(#[0-9a-fA-F]+)\{\{\/if\}\}/g, "${monochrome ? fontColor : '$1'}");
  
  // Convert {{#if monochrome}}{{fontColor}}XX{{else}}#HEX{{/if}} to ${monochrome ? fontColor + 'XX' : '#HEX'}
  modifiedContent = modifiedContent.replace(/\{\{#if monochrome\}\}\{\{fontColor\}\}([0-9a-fA-F]{2})\{\{else\}\}(#[0-9a-fA-F]+)\{\{\/if\}\}/g, "${monochrome ? fontColor + '$1' : '$2'}");
  
  const iconName = file.replace('-icon.hbs', 'Icon').replace(/-([a-z])/g, g => g[1].toUpperCase());
  
  output += `  ${iconName}: ({ monochrome, fontColor }) => \`\n${modifiedContent}\`,\n`;
}

output += '};\n';

fs.writeFileSync(destFile, output);
console.log('Icons written to', destFile);
