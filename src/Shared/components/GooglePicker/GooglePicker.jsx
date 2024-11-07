{
  /*eslint-disable camelcase */
}

import loadScript from 'load-script';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { callToast } from '@shared/components/Toaster/Toaster';

const GOOGLE_SDK_URL = 'https://apis.google.com/js/api.js';
const GOOGLE_IDENTITY_URL = 'https://accounts.google.com/gsi/client';

/**
 * NOTE: BE format whitelist: [pdf doc docx xls xlsx csv txt rtf html zip mp3 wma mpg flv avi jpg jpeg png gif mp4 ppt pptx webm]
 *
 * NOTE: FE list of allowed MIME types:
 * application/msword
 * application/pdf
 * application/rtf
 * application/vnd.ms-excel
 * application/vnd.ms-powerpoint
 * application/vnd.openxmlformats-officedocument.presentationml.presentation
 * application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
 * application/vnd.openxmlformats-officedocument.wordprocessingml.document
 * application/zip
 * audio/mpeg
 * audio/webm
 * image/gif
 * image/jpeg
 * image/png
 * text/csv
 * text/html
 * text/plain
 * video/mp4
 * video/mpeg
 * video/webm video/x-flv
 * video/x-ms-wmv
 * video/x-msvideo
 * application/vnd.google-apps.video
 * application/vnd.google-apps.spreadsheet
 * application/vnd.google-apps.site
 * application/vnd.google-apps.presentation
 * application/vnd.google-apps.photo
 * application/vnd.google-apps.drawing
 * application/vnd.google-apps.document
 * application/vnd.google-apps.audio
 */
const ALLOWED_MIME_TYPES =
  // eslint-disable-next-line max-len
  'application/msword,application/pdf,application/rtf,application/vnd.ms-excel,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/zip,audio/mpeg,audio/webm,image/gif,image/jpeg,image/png,text/csv,text/html,text/plain,video/mp4,video/mpeg,video/webm,video/x-flv,video/x-ms-wmv,video/x-msvideo,application/vnd.google-apps.video,application/vnd.google-apps.spreadsheet,application/vnd.google-apps.site,application/vnd.google-apps.presentation,application/vnd.google-apps.photo,application/vnd.google-apps.drawing,application/vnd.google-apps.document,application/vnd.google-apps.audio';

const GOOGLE_APP_ID = import.meta.env.VITE_GOOGLE_APP_ID;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_DEVELOPER_KEY = import.meta.env.VITE_GOOGLE_DEVELOPER_KEY;

// Google Integration with the usage of GIS
// Overall docs: https://developers.google.com/drive/picker/guides/overview
// Token model: https://developers.google.com/identity/oauth2/web/guides/use-token-model
// Scopes: https://developers.google.com/identity/protocols/oauth2/scopes
// Getting token: https://developers.google.com/identity/oauth2/web/reference/js-reference#google.accounts.oauth2.initTokenClient
// Picker: https://developers.google.com/drive/picker/reference#picker-builder
export const GooglePicker = ({ children, disabled, onChange }) => {
  const { t } = useTranslation();
  const isGoogleReady = () => !!window.gapi;
  const isGooglePickerReady = () => !!window.google?.picker;
  const isGoogleIdentityReady = () => !!window.google;

  const googleIdenetyTokenClient = useRef(null);
  const oauthToken = useRef(null);

  const onGAPILoad = () => {
    if (!isGooglePickerReady()) {
      window.gapi.load('picker');
    }
  };

  const onGISLoad = () => {
    googleIdenetyTokenClient.current = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/drive.readonly',
      callback: (resp) => {
        if (resp.error !== undefined) {
          callToast('error', t('components.googlePicker.error'));

          // eslint-disable-next-line no-console
          console.error(resp.error);

          return;
        }
        oauthToken.current = resp.access_token;
        createPicker(resp.access_token);
      },
      error_callback: (resp) => {
        callToast('error', t('components.googlePicker.error'));

        // eslint-disable-next-line no-console
        console.error(JSON.stringify(resp));
      },
    });
  };

  useEffect(() => {
    if (isGoogleReady()) {
      onGAPILoad();

      if (isGoogleIdentityReady()) {
        onGISLoad();
      } else {
        loadScript(GOOGLE_IDENTITY_URL, onGISLoad);
      }

      return;
    }

    loadScript(GOOGLE_SDK_URL, onGAPILoad);
    loadScript(GOOGLE_IDENTITY_URL, onGISLoad);
  }, []);

  const handleChange = (data) => {
    onChange({
      data,
      token: oauthToken.current,
    });
  };

  const createPicker = (token) => {
    const googleViewId = window.google.picker.ViewId.DOCS;

    const view = new window.google.picker.View(googleViewId).setMimeTypes(ALLOWED_MIME_TYPES);

    const picker = new window.google.picker.PickerBuilder()
      .setAppId(GOOGLE_APP_ID)
      .addView(view)
      .setOAuthToken(token)
      .setDeveloperKey(GOOGLE_DEVELOPER_KEY)
      .setCallback(handleChange)
      .enableFeature(window.google.picker.Feature.MINE_ONLY)
      .build();

    picker.setVisible(true);
  };

  const onOpen = () => {
    if (!isGoogleReady() || !isGooglePickerReady() || disabled) {
      return null;
    }

    if (!oauthToken.current) {
      googleIdenetyTokenClient.current.requestAccessToken();

      return;
    }

    createPicker(oauthToken.current);
  };

  return (
    <div role='button' onClick={onOpen}>
      {children}
    </div>
  );
};

GooglePicker.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
