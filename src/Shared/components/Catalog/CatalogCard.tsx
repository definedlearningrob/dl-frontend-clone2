import { useToggle } from 'react-use';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import SharedCard from '@shared/components/Card/Card';
import SharedImage from '@shared/components/Image/Image';
import Button from '@shared/components/Button/Button';
import { ReactComponent as ChevronDownIcon } from '@shared/svg/chevron_down.svg';
import { ReactComponent as ChevronUpIcon } from '@shared/svg/chevron_up.svg';
import { cx } from '@shared/utils/cx';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { InjectedContent } from '@shared/components/IncjectedContent/InjectedContent';
import { useIsTruncated } from '@shared/hooks/useIsTruncated';

import { Catalog as BaseCatalog } from './types';
import { CatalogCardSkeleton } from './CatalogCardSkeleton';

type Catalog = Pick<BaseCatalog, 'id' | 'description' | 'thumbnailUrl' | 'imageUrl'> &
  ({ displayName: string } | { name: string });

type Props = {
  catalog: Catalog | undefined | null;
  isLoading?: boolean;
};

export const CatalogCard = ({ catalog, isLoading }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const catalogDescriptionRef = useRef<HTMLParagraphElement>(null);
  const [isExpanded, toggleIsExpanded] = useToggle(false);
  const isTruncated = useIsTruncated({ ref: catalogDescriptionRef, isLoading });

  if (isLoading) {
    return <CatalogCardSkeleton />;
  }

  if (!catalog) {
    return null;
  }

  const { thumbnailUrl, description } = catalog;

  const buttonLabel = isExpanded ? t('common.actions.showLess') : t('common.actions.showMore');
  const catalogName = 'displayName' in catalog ? catalog.displayName : catalog.name;

  return (
    <SharedCard className='flex gap-base xxxl:gap-md'>
      <SharedImage
        className='rounded-sm h-[180px] xxxl:h-[240px] basis-[320px] xxxl:basis-[426px] shrink-0 grow-0 object-cover'
        src={thumbnailUrl}
      />
      <div className='flex flex-col gap-sm xxxl:gap-base'>
        <h4 className='text-base xxxl:text-lg mb-0'>{catalogName}</h4>
        {description && (
          <InjectedContent
            ref={catalogDescriptionRef}
            className={cx('text-xxs xxxl:text-xs leading-lg text-font-secondary', {
              'line-clamp-6': !isExpanded,
            })}
            content={description}
          />
        )}
        {(isTruncated || isExpanded) && (
          <Button
            Icon={isExpanded ? ChevronUpIcon : ChevronDownIcon}
            className='self-start hover:!no-underline'
            contentClassName='text-primary-500 '
            iconClassName='text-primary-500'
            size={isFullHD ? 'md' : 'sm'}
            variant='link'
            onClick={toggleIsExpanded}>
            {buttonLabel}
          </Button>
        )}
      </div>
    </SharedCard>
  );
};
