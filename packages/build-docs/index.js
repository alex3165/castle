const { readFileSync, writeFileSync } = require('fs');

const docFilename = process.argv[2];
const text = readFileSync(docFilename, 'utf8');
const matchExample = /> \[([0-9a-z\-\/\.]+)\]\(([0-9a-z\-\/\.]+)\)\n\n\`\`\`([0-9a-z\-]+)\n(((?!\`\`\`).|\n)*\`\`\`)/gm;

const replaced = text.replace(matchExample, (_, name, filename, language) => {
  const link = `[${name}](${filename})`;
  console.log('Update', link);
  const file = readFileSync(filename);
  return `> ${link}\n\n\`\`\`${language}\n${file}\`\`\``;
});

writeFileSync(docFilename, replaced, 'utf8');
