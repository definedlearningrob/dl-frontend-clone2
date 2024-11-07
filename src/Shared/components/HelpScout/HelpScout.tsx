import { useTranslation } from 'react-i18next';

import { ReactComponent as HelpScoutIcon } from '@shared/svg/question.svg';
import useHelpScoutBeacon from '@shared/hooks/useHelpscoutBeacon';
import { APP_TYPES } from '@shared/resources/enums';

import { IconContainer } from '../IconContainer/IconContainer';
import { Tooltip } from '../Tooltip';

type Props = {
  app: APP_TYPES;
};

export const HelpScout = ({ app }: Props) => {
  const { t } = useTranslation();
  useHelpScoutBeacon({ app });

  return (
    <Tooltip message={t('appHeader.helpscout')}>
      <button
        onClick={() => {
          if (window.Beacon) {
            window.Beacon('toggle');
          }
        }}>
        <IconContainer Icon={HelpScoutIcon} className='text-font-secondary' />
      </button>
    </Tooltip>
  );
};
