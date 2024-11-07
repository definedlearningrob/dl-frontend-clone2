import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { ReactComponent as GlobalIcon } from '@dc/svg/global.svg';

import { Tooltip } from '@shared/components/Tooltip';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

type Props = {
  entities: { name: string | null; uuid: string }[];
  isGlobal?: boolean;
};

export const EntitiesCell = ({ entities, isGlobal }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  if (isGlobal) {
    return (
      <div className='flex justify-center'>
        <IconContainer
          Icon={GlobalIcon}
          className='bg-neutral-200 rounded-full'
          paddingSize='xxs'
          size={isFullHD ? 'base' : 'sm'}
        />
      </div>
    );
  }

  if (entities.length === 1) {
    return <div>{entities[0].name}</div>;
  }

  const entitiesListNames = entities?.map((entity) => entity.name).join(', ');

  return (
    <Tooltip disabled={isEmpty(entities)} message={entitiesListNames}>
      {t('user.partners.entities', { count: entities?.length })}
    </Tooltip>
  );
};
