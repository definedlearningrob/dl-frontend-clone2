import { Trans } from 'react-i18next';

import { BadgeGroupedById } from '@shared/resources/types';

type Props = {
  badges: BadgeGroupedById[];
};

export const BadgesHeader = ({ badges }: Props) => (
  <Trans
    components={{
      neutralText: <span className='text-neutral-600' />,
    }}
    i18nKey='portfolio.public.badges'
    values={{ count: badges.length }}
  />
);
