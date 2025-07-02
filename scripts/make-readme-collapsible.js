#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the README.md file
const readmePath = path.join(__dirname, '..', 'README.md');
let readmeContent = fs.readFileSync(readmePath, 'utf8');

// Function to convert a command section to collapsible format
function makeCommandCollapsible(commandMatch) {
  const fullMatch = commandMatch[0];
  const commandName = commandMatch[1];
  const description = commandMatch[2];
  const commandContent = commandMatch[3];
  
  return `<details>
<summary><strong>${commandName}</strong> - ${description}</summary>

${commandContent}

</details>`;
}

// Find the commands section
const commandsStart = readmeContent.indexOf('<!-- commands -->');
const commandsEnd = readmeContent.indexOf('<!-- commandsstop -->');

if (commandsStart === -1 || commandsEnd === -1) {
  console.error('Could not find commands section markers');
  process.exit(1);
}

// Extract the commands section
const beforeCommands = readmeContent.substring(0, commandsStart);
const commandsSection = readmeContent.substring(commandsStart, commandsEnd);
const afterCommands = readmeContent.substring(commandsEnd);

// Keep the command list as is (the bullet points)
const commandListEnd = commandsSection.indexOf('\n\n## ');
const commandList = commandsSection.substring(0, commandListEnd);
const commandDetails = commandsSection.substring(commandListEnd);

// Convert command details to collapsible format
const commandRegex = /## `([^`]+)`\n\n([^\n]+)\n\n```\n([\s\S]*?)```\n\n_See code: \[([^\]]+)\]\(([^)]+)\)_/g;

let match;
let processedCommands = commandDetails;

while ((match = commandRegex.exec(commandDetails)) !== null) {
  const fullMatch = match[0];
  const commandName = match[1];
  const description = match[2];
  const usageContent = match[3];
  const codeLink = match[4];
  const codeUrl = match[5];
  
  const collapsibleCommand = `<details>
<summary><strong>${commandName}</strong> - ${description}</summary>

\`\`\`
${usageContent}
\`\`\`

_See code: [${codeLink}](${codeUrl})_

</details>`;
  
  processedCommands = processedCommands.replace(fullMatch, collapsibleCommand);
}

// Reconstruct the README
const newReadmeContent = beforeCommands + commandList + '\n\n' + processedCommands + afterCommands;

// Write the updated README
fs.writeFileSync(readmePath, newReadmeContent, 'utf8');

console.log('Successfully made README command sections collapsible!'); 