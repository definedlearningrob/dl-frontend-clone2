/* eslint-disable no-undef */
import { useEffect } from 'react';

import { APP_TYPES } from '@shared/resources/enums';

type TArguments = {
  app: string;
};

// DOCS
// https://developer.helpscout.com/beacon-2/web/javascript-api/
function useHelpScoutBeacon({ app }: TArguments) {
  const helpscoutKey =
    app === APP_TYPES.CAREERS
      ? import.meta.env.VITE_HELPSCOUT_CAREERS_KEY
      : import.meta.env.VITE_HELPSCOUT_NEWDL_KEY;

  useEffect(() => {
    if (window.Beacon) {
      window.Beacon('init', helpscoutKey);
      window.Beacon('config', {
        color: '#005994', //PRIMARY-500
        display: {
          style: 'manual',
        },
      });
    }

    return () => {
      if (document.getElementById('beacon-script') && window.Beacon) {
        window.Beacon('destroy');
      }
    };
  }, []);
}

export default useHelpScoutBeacon;
