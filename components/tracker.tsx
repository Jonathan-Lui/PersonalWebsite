import { useEffect, useState } from 'react';
import axios from 'axios';

type TrackerProps = {
  customReferrer?: string;
};

export default function Tracker({ customReferrer }: TrackerProps) {
  const [tracked, setTracked] = useState(false);
  useEffect(() => {
    if (window && !tracked) {
      let referrer = document.referrer === '' ? null : document.referrer;
      let screenHeight = screen.height;
      let screenWidth = screen.width;

      const baseUrl =
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 'https://yanchen.io' : 'http://localhost:3000';

      (async () => {
        const res = await axios.post(baseUrl + '/api/visit', {
          referrer: referrer,
          custom_referrer: customReferrer,
          screen_height: screenHeight,
          screen_width: screenWidth,
        });
        window.sessionStorage.setItem('visit_id', res.data['visit_id']);
      })();

      window.addEventListener('visibilitychange', async () => {
        const visitID = window.sessionStorage.getItem('visit_id');
        if (visitID == null || visitID === 'undefined') {
          return;
        }
        navigator.sendBeacon(baseUrl + '/api/leave', JSON.stringify({ visit_id: visitID }));
      });
      setTracked(true);
    }
  });

  return <></>;
}
