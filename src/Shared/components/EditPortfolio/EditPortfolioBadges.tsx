import { FieldArrayRenderProps, useField } from 'formik';

import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import { cx } from '@shared/utils/cx';
import { PortfolioBadgeTooltip } from '@shared/components/PortfolioBadge/PortfolioBadgeTooltip';
import usePortfolioResumesQuery from '@shared/graphql/student/hooks/usePortfolioResumesQuery';
import { BadgeWithCounter } from '@shared/components/Portfolio/BadgeWithCounter/BadgeWithCounter';
import { Tooltip } from '@shared/components/Tooltip';

import { CardWithTitleProps, EditPortfolioCardWithTitle } from './EditPortfolioCard';
import { groupBadgesById } from './helpers';

type Props = CardWithTitleProps & FieldArrayRenderProps;

export const BadgesSection = (props: Props) => {
  const { push, remove, name } = props;

  const { data: resumesData } = usePortfolioResumesQuery();
  const [highlightedBadgeIdsField] = useField(name);

  if (!resumesData) return null;

  const badges = resumesData.portfolio?.sharedResume?.badges || [];

  const handleBadgeSelect = (id: string) => {
    highlightedBadgeIdsField.value.includes(id)
      ? remove(highlightedBadgeIdsField.value.indexOf(id))
      : push(id);
  };

  const groupedBadges = groupBadgesById(badges);

  return (
    <EditPortfolioCardWithTitle {...props}>
      <ul className='grid grid-cols-3 xxxl:grid-cols-4 gap-sm'>
        {groupedBadges.map((badge) => {
          const { id, imageUrl, name, resources } = badge;
          const isSelected = highlightedBadgeIdsField.value.includes(id);

          const buttonClassName = cx(
            'group w-full h-full relative p-sm flex flex-col items-center border border-solid border-neutral-300 rounded-sm gap-xs text-center',
            {
              'hover:bg-neutral-200 hover:border-neutral-400': !isSelected,
              'bg-primary-200 border-primary-500': isSelected,
            }
          );

          return (
            <Tooltip
              key={id}
              contentClassName='!max-w-[450px] w-[256px] !p-0'
              delayDuration={300}
              directChildren={true}
              message={<PortfolioBadgeTooltip badge={badge} />}
              variant='light'>
              <button
                className={buttonClassName}
                role='list-item'
                type='button'
                onClick={() => handleBadgeSelect(id)}>
                <div className='absolute top-xs left-xs'>
                  <SharedCheckbox checked={isSelected} readOnly={true} />
                </div>
                <BadgeWithCounter
                  counter={resources.length}
                  counterClassName={cx({ 'bg-white': isSelected })}
                  imageUrl={imageUrl}
                />
                <div className='text-neutral-800 leading-lg text-xs line-clamp-2 break-all'>
                  {name}
                </div>
              </button>
            </Tooltip>
          );
        })}
      </ul>
    </EditPortfolioCardWithTitle>
  );
};
