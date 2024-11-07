import { Opportunity, Partner, Course } from '@graphql/dc/shared/types';
import { useRef } from 'react';
import { Trans } from 'react-i18next';
import clsx from 'classnames';
import { isEmpty } from 'lodash-es';

import { ReactComponent as OpportunityIcon } from '@dc/svg/match.svg';

import { ReactComponent as VirtualInternshipIcon } from '@shared/svg/laptop.svg';
import { ReactComponent as CourseIcon } from '@shared/svg/book_opened.svg';
import { ReactComponent as ChevronRight } from '@shared/svg/chevron_right.svg';
import Image from '@shared/components/Image/Image';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { useIsTruncated } from '@shared/hooks/useIsTruncated';
import { Tooltip } from '@shared/components/Tooltip';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { Badge } from '@shared/components/Badge/Badge';

type Props = Pick<Partner, 'thumbnailUrl' | 'imageUrl' | 'name' | 'about' | 'id'> & {
  opportunities: Pick<Opportunity, 'id' | 'opportunityType'>[];
  courses: Pick<Course, 'id'>[];
};

const cardClassName = clsx(
  'p-xs xxxl:p-x bg-white flex gap-x xxxl:gap-sm rounded-sm group/card transition-colors',
  'border border-neutral-300',
  'focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary-500',
  'hover:outline hover:!outline-1 hover:bg-primary-200 hover:!outline-primary-500 hover:shadow-300'
);

const imageWrapperClassName = clsx(
  'basis-[120px] xxxl:basis-[180px] shrink-0 grow-0 overflow-hidden flex flex-col flex-1 max-h-[98px] xxxl:max-h-[115px] relative rounded-sm',
  'before:absolute before:bg-neutral-800/[32%] before:inset-0',
  'before:group-focus-visible/card:!bg-neutral-800/[16%]',
  'before:group-hover/card:!bg-neutral-800/[16%]'
);

export const PartnerCard = ({
  thumbnailUrl,
  imageUrl,
  name,
  about,
  opportunities,
  id,
  courses,
}: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const nameRef = useRef<HTMLHeadingElement>(null);
  const aboutRef = useRef<HTMLParagraphElement>(null);

  const isNameTruncated = useIsTruncated({ ref: nameRef });
  const isAboutTruncated = useIsTruncated({ ref: aboutRef });

  const virtualInternshipsCount = opportunities.filter(
    ({ opportunityType }) => opportunityType === 'VIRTUAL_INTERNSHIP'
  ).length;

  const opportunitiesCount = opportunities.length - virtualInternshipsCount;

  return (
    <a className={cardClassName} href={`/partner/${id}`}>
      <div className={imageWrapperClassName}>
        <Image className=' object-cover rounded-sm h-full w-full' src={thumbnailUrl || imageUrl} />
      </div>
      <div className='grow'>
        <div className='flex items-center justify-between w-full'>
          <Tooltip disabled={!isNameTruncated} message={name}>
            <h3 ref={nameRef} className='mb-0 mr-base line-clamp-2 text-xs'>
              {name}
            </h3>
          </Tooltip>
          <IconContainer
            Icon={ChevronRight}
            className='rounded-sm group-hover/card:bg-white'
            paddingSize='xxs'
            size={isFullHD ? 'md' : 'base'}
          />
        </div>
        <Tooltip disabled={!isAboutTruncated} message={about}>
          <p
            ref={aboutRef}
            className='line-clamp-2 text-xxs xxxl:text-xs text-font-secondary pr-xs tracking-normal leading-lg mb-xs xxxl:mb-x'>
            {about}
          </p>
        </Tooltip>
        <div className='flex gap-xxs xxxl:gap-xs'>
          {opportunitiesCount > 0 && (
            <Badge
              Icon={OpportunityIcon}
              className='group-hover/card:!bg-white'
              size={isFullHD ? 'base' : 'small'}
              type='primary'>
              <Trans
                i18nKey='partners.card.opportunitiesCount'
                values={{ count: opportunitiesCount }}
              />
            </Badge>
          )}
          {virtualInternshipsCount > 0 && (
            <Badge
              Icon={VirtualInternshipIcon}
              className='group-hover/card:!bg-white'
              size={isFullHD ? 'base' : 'small'}
              type='primary'>
              <Trans
                i18nKey='partners.card.virtualInternshipsCount'
                values={{ count: virtualInternshipsCount }}
              />
            </Badge>
          )}
          {!isEmpty(courses) && (
            <Badge
              Icon={CourseIcon}
              className='group-hover/card:!bg-white'
              size={isFullHD ? 'base' : 'small'}
              type='primary'>
              <Trans i18nKey='partners.card.coursesCount' values={{ count: courses.length }} />
            </Badge>
          )}
        </div>
      </div>
    </a>
  );
};
