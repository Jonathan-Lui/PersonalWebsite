import ExperienceCard from './experience_card';
import { ExperienceDataParsed } from '../lib/experience';

export default function Experience({ experienceData }: { experienceData: ExperienceDataParsed[] }) {
  return (
    <div className="flex flex-row items-center justify-center mt-36 mb-20">
      <div className="lg:grid lg:grid-cols-4 w-3/4 lg:w-2/3 max-w-screen-xl">
        <div className="text-2xl font-medium text-red mb-3 lg:mb-0">EXPERIENCE</div>
        <div className="lg:col-span-3 text-xl font-light m-n3 space-y-3 xl:pr-36">
          {experienceData.map((experience) => {
            return (
              <ExperienceCard
                id={experience.id}
                title={experience.company}
                subtitle={experience.title}
                description={experience.description}
                tags={experience.tags}
                dates={experience.dates}
                key={experience.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
