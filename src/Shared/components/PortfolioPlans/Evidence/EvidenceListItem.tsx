import { useTranslation } from 'react-i18next';

import { withoutHtmlTag } from '@dc/utils/withoutHtmlTag';

import { cx } from '@shared/utils/cx';
import { Tooltip } from '@shared/components/Tooltip';
import Checkbox from '@shared/components/Checkbox/Checkbox';
import { PortfolioProjectType } from '@shared/components/Portfolio/types';

import { EvidenceListItemImage } from './EvidenceListItemImage';

type Props = {
  onSelect: () => void;
  selected: boolean;
  imageUrl: string | null;
  title: string;
  subTitle: string;
  description: string;
  isTeamSubmission: boolean;
  projectType: PortfolioProjectType;
};

export const EvidenceListItem = ({
  onSelect,
  selected,
  subTitle,
  title,
  imageUrl,
  description,
  isTeamSubmission,
  projectType,
}: Props) => {
  const { t } = useTranslation();

  const className = cx('bg-white flex gap-sm p-xs cursor-pointer', {
    'hover:bg-neutral-200': !selected,
    'bg-primary-200': selected,
  });

  const label =
    projectType === PortfolioProjectType.VIRTUAL_INTERNSHIP
      ? t('components.evidence.virtualInternshipLabel', { name: title })
      : title;

  return (
    <div className={className} onClick={onSelect}>
      <EvidenceListItemImage
        imageUrl={imageUrl}
        isTeamSubmission={isTeamSubmission}
        projectType={projectType}
        thumbnailUrl={imageUrl}
      />
      <div className='basis-1/3 min-w-0'>
        <Tooltip delayDuration={300} message={label}>
          <div className='text-xxs leading-lg mb-xxs line-clamp-1'>{label}</div>
        </Tooltip>
        <Tooltip delayDuration={300} message={subTitle}>
          <h3 className='text-xs leading-base font-bold line-clamp-3'>{subTitle}</h3>
        </Tooltip>
      </div>
      <div className='basis-2/3 min-w-0'>
        <p className='mb-0 line-clamp-4 xxxl:line-clamp-5 text-font-secondary leading-lg text-xxs'>
          {withoutHtmlTag(description)}
        </p>
      </div>
      <div className='flex justify-center basis-[80px] shrink-0 grow-0'>
        <Checkbox checked={selected} labelClassName='before:!mr-0' readOnly={true} />
      </div>
    </div>
  );
};
