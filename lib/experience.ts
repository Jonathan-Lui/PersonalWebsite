import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export type ExperienceData = {
  id: string;
  company: string;
  title: string;
  start: Date;
  end?: Date;
  tags: string[];
  description: string;
};

export type ExperienceDataParsed = {
  id: string;
  company: string;
  title: string;
  dates: string;
  tags: string[];
  description: string;
};

const experienceDirectory = path.join(process.cwd(), 'content', 'experience');

const processDates = (start: Date, end?: Date): string => {
  // Fix off-by-one date bug
  // (https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off)
  const adjustedStart = new Date(start.getTime() - start.getTimezoneOffset() * -60000);
  const startDateString = adjustedStart.toLocaleDateString('default', {
    year: 'numeric',
    month: 'short',
  });
  let endDateString;

  if (end != null) {
    const adjustedEnd = new Date(end.getTime() - end.getTimezoneOffset() * -60000);
    endDateString = adjustedEnd.toLocaleDateString('default', {
      year: 'numeric',
      month: 'short',
    });
  } else {
    endDateString = 'Present';
  }

  return `${startDateString} - ${endDateString}`;
};

export const getSortedExperienceData = (): ExperienceDataParsed[] => {
  const fileNames = fs.readdirSync(experienceDirectory);

  const allExperiencesData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.yaml$/, '');
    const fullPath = path.join(experienceDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const data = yaml.load(fileContents) as ExperienceData;

    return {
      id,
      ...data,
      dates: processDates(data.start, data.end),
    };
  });

  const sortedExperience = allExperiencesData.sort((a, b) => {
    if (a.start < b.start) {
      return 1;
    } else {
      return -1;
    }
  });

  return sortedExperience.map((experience) => {
    return {
      id: experience.id,
      company: experience.company,
      title: experience.title,
      dates: experience.dates,
      tags: experience.tags,
      description: experience.description,
    };
  });
};
