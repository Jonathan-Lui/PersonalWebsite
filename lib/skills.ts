import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const skillsDirectory = path.join(process.cwd(), 'content', 'skills');

export const getLanguagesData = (): string[] => {
  const filePath = path.join(skillsDirectory, 'languages.yaml');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = yaml.load(fileContents) as { languages: string[] };

  return data.languages;
};

export const getToolsData = (): string[] => {
  const filePath = path.join(skillsDirectory, 'tools.yaml');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = yaml.load(fileContents) as { tools: string[] };

  return data.tools;
};
