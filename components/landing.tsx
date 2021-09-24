import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { trackEvent } from '../lib/analytics';

export default function Landing() {
  const trackClick = (site: string) => {
    trackEvent({
      action: 'click',
      params: {
        event_category: 'link',
        event_label: site,
      },
    });
    return false;
  };

  return (
    <div className="flex flex-row h-screen items-center justify-center pt-24 pb-24 lg:pt-96 lg:pb-96">
      <div className="flex flex-col h-full justify-between w-3/4 lg:w-2/3 max-w-screen-xl min-h-500">
        <div>
          <div className="text-3xl lg:text-4xl mb-3">
            Hello!{' '}
            <span role="img" aria-label="wave">
              👋
            </span>
            <span role="img" aria-label="Upside down smiley">
              🙃
            </span> 
          </div>
          <div className="text-4xl lg:text-6xl font-bold">
            I'm <span className="text-red">Jonathan</span>,
          </div>
        </div>
        <div className="text-2xl lg:text-3xl font-light">
          <p>an engineering student,</p>
          <p>software developer,</p>
          <p>and cool guy.</p>
        </div>
        <div className="text-2xl lg:text-3xl font-light">
          <div className="mb-6">
            I'm currently a <span className="text-blue">Software & Mechanical Engineering Student </span> @{' '}
            <span className="text-blue">University of Calgary</span>.
          </div>
          <div className="flex flex-row text-4xl lg:text-5xl space-x-9">
            <a href="https://www.linkedin.com/in/jonathan-lui-42239b130/" target="_blank" onClick={() => trackClick('linkedin')}>
              <FontAwesomeIcon icon={faLinkedinIn} className="hover:text-blue" />
            </a>
            <a href="https://github.com/Jonathan-Lui" target="_blank" onClick={() => trackClick('github')}>
              <FontAwesomeIcon icon={faGithub} className="hover:text-blue" />
            </a>
            <a href="mailto:jonathanlhlui@gmail.com" target="_blank" onClick={() => trackClick('email')}>
              <FontAwesomeIcon icon={faEnvelope} className="hover:text-blue" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
