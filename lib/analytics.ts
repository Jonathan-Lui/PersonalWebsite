import axios from 'axios';

type EventType = {
  action: string;
  params: {
    event_category?: string;
    event_label?: string;
    value?: string;
  };
};

export const GA_TRACKING_ID: string = process.env.GA_TRACKING_ID;

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 'https://yanchen.io' : 'http://localhost:3000';

export const pageView = (url: string, title: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_location: url,
    page_title: title,
  });
};

export const trackEvent = ({ action, params }: EventType) => {
  window.gtag('event', action, params);
  (async () => {
    const visitID = window.sessionStorage.getItem('visit_id');
    await axios.post(baseUrl + '/api/event', {
      visit_id: visitID,
      action: action,
      event_category: params.event_category,
      event_detail: params.event_label,
    });
  })();
};
