import { useTranslation } from 'react-i18next';

import imagePlaceholder from '@shared/assets/images/default-thumbnail.svg';
import SharedImage from '@shared/components/Image/Image';
import { useAverageBackgroundColor } from '@shared/hooks/useAverageBackgroundColor';
import { BadgeGroupedById } from '@shared/resources/types';
import { Kicker } from '@shared/components/Kicker';

type Props = {
  badge: BadgeGroupedById;
};

export const PortfolioBadgeTooltip = ({ badge }: Props) => {
  const { t } = useTranslation();

  const { imageRef, wrapperRef } = useAverageBackgroundColor();

  const { name, imageUrl, resources, description } = badge;

  return (
    <>
      <div className='p-x'>
        <div
          ref={wrapperRef}
          className='overflow-hidden rounded-sm flex justify-center mb-xs py-sm bg-neutral-200'>
          <div className='w-[80px] h-[80px] z-highest'>
            <SharedImage
              ref={imageRef}
              className='z-higher h-full object-cover mx-auto'
              fallbackSrc={imagePlaceholder}
              src={imageUrl}
            />
          </div>
          {resources.length > 1 && (
            <div className='z-higher bg-white text-primary-500 absolute top-x right-x rounded rounded-lg px-xs py-xxs leading-lg font-medium text-xxs'>
              x{resources.length}
            </div>
          )}
        </div>
        <h5 className='text-font-primary text-xs mb-xs leading-base'>{name}</h5>
        <p className='mb-0 leading-base text-xxs line-clamp-2'>{description}</p>
      </div>
      <div className='px-x py-xs bg-neutral-200 border border-neutral-300 rounded-b-xs'>
        <Kicker size='sm'>{t('portfolio.creator.unlockedIn')}</Kicker>
        <ul className='list-disc list-outside w-full pl-base'>
          {resources.map((resource) => (
            <li
              key={resource.id}
              className='text-xxs leading-lg text-font-primary whitespace-pre-wrap'
              id={resource.id}>
              {resource.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
