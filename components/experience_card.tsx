import { useState } from 'react';
import Tag from './tag';
import { trackEvent } from '../lib/analytics';

type CollapsibleProps = {
  id: string;
  title: string;
  subtitle: string;
  dates?: string;
  description: string;
  tags?: string[];
};

export default function ExperienceCard({ id, title, subtitle, dates, description, tags }: CollapsibleProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    if (isCollapsed) {
      trackEvent({
        action: 'expand',
        params: {
          event_category: 'experience',
          event_label: id,
        },
      });
    }
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="p-3 border rounded-md border-white hover:border-blue cursor-pointer" onClick={toggleCollapse}>
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="text-xl font-medium text-blue">{title}</div>
        <div className="text-base font-light">{dates}</div>
      </div>
      <div className="text-lg font-light">{subtitle}</div>
      <div className={`${isCollapsed ? 'hidden' : ''}` + ' mt-5'}>
        <div className="text-base font-light font-mono mb-3">{description}</div>
        <div className="flex flex-row flex-wrap gap-1">
          {tags != null && tags.map((tag) => <Tag text={tag} key={id + '-' + tag} />)}
        </div>
      </div>
    </div>
  );
}
