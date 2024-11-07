import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { appendScript } from '@dc/utils/appendScript';
import { removeScript } from '@dc/utils/removeScript';

import { ReactComponent as PlayIcon } from '@shared/assets/icons/play.svg';
import { pathwaysNotUsingReadSpeaker } from '@shared/utils/pathwaysNotUsingReadSpeaker';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { cx } from '@shared/utils/cx';
import { useDetectApplicationType } from '@shared/hooks/useDetectApplicationType';
import './ReadSpeaker.sass';

type Props = {
  isCollapsed?: boolean;
};

export const ReadSpeaker = (props: Props) => {
  const { isCollapsed = false } = props;
  const { t } = useTranslation();
  const location = useLocation();
  const { isCareersApp } = useDetectApplicationType();
  const readSpeakerUrl = isCareersApp
    ? import.meta.env.VITE_READ_SPEAKER_URL_DC
    : import.meta.env.VITE_READ_SPEAKER_URL_PBL;
  const readSpeakerScript = '//cdn1.readspeaker.com/script/12093/webReader/webReader.js?pids=wr';
  const isSpeakerReady = !!window.ReadSpeaker;
  const readSpeakerClasses = classnames(
    'rs_skip rsbtn rs_preserve read-speaker flex items-center !mb-0 !bg-neutral-200 !rounded-sm !p-xxs',
    {
      hidden: pathwaysNotUsingReadSpeaker(location),
    }
  );

  useEffect(() => {
    if (!isSpeakerReady) {
      appendScript(readSpeakerScript);
    }

    return () => {
      removeScript(readSpeakerScript);
    };
  }, [location]);

  useEffect(() => {
    const webReader = window.ReadSpeaker;

    if (document.getElementsByClassName('rsbtn_tooltoggle').length === 0) {
      window.rsConf = {
        params: '//f1-na.readspeaker.com/script/12093/webReader/webReader.js?pids=wr',
        general: { usePost: true },
      };

      webReader?.ui?.init();

      webReader?.q(function () {
        webReader?.ui.addClickEvents();
      });
    } else {
      webReader?.q(function () {
        if (webReader?.ui.getActivePlayer()) {
          webReader?.ui.getActivePlayer().close();
        }
      });
    }
  }, [window.ReadSpeaker, location]);

  const playButtonClassNames = cx(
    'rsbtn_play !flex items-center grow !bg-transparent !border-r-0 !border-t-0 !border-b-0 !rounded-none !h-base',
    {
      '!border-l-0': isCollapsed,
      '!border-l-neutral-300 !pl-xs ml-xs': !isCollapsed,
    }
  );

  return (
    <div
      className={cx('px-xs z-highest mb-sm', { collapsed: isCollapsed })}
      id='readspeaker_button1'>
      <div className={readSpeakerClasses}>
        <a
          accessKey='L'
          className={playButtonClassNames}
          href={readSpeakerUrl}
          rel='nofollow'
          title={t('readSpeaker.title')}>
          <span className='rsbtn_left rsimg rspart grow block !m-0 !bg-neutral-200 hover:!bg-neutral-700 rounded-sm group !py-xxs'>
            <span className='rsbtn_text before:!content-none after:!content-none !flex items-center'>
              <span className='!p-0 grow !flex items-center justify-center gap-xxxs group-hover:!text-white'>
                {!isCollapsed && (
                  <span className='!p-0 group-hover:!text-inherit !font-medium !text-xs !h-auto !leading-base'>
                    {t('readSpeaker.listen')}
                  </span>
                )}
                <IconContainer
                  Icon={PlayIcon}
                  className='text-primary-500 grow group-hover:!text-inherit !p-xxs'
                  paddingSize='none'
                  size='sm'
                />
              </span>
            </span>
          </span>
        </a>
      </div>
    </div>
  );
};
