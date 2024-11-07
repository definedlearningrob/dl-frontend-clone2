import { useTranslation } from 'react-i18next';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as DLIcon } from '@shared/assets/icons/DLIcon.svg';
import { ReactComponent as DCIcon } from '@shared/assets/icons/DCIcon.svg';
import { ReactComponent as FlagIcon } from '@shared/assets/icons/flag_outlined.svg';
import { ReactComponent as EducationIcon } from '@shared/assets/icons/education_outlined.svg';
import { ReactComponent as TagIcon } from '@shared/assets/icons/tag_icon.svg';

export const TagsTableLegend = () => {
  const { t } = useTranslation();
  const tableLegend = [
    {
      id: 1,
      name: t('reports.tagReport.tagTableLegend.dLLegend'),
      Icon: DCIcon,
      className: 'text-danger-500 bg-danger-100 rounded-xs',
    },
    {
      id: 2,
      name: t('reports.tagReport.tagTableLegend.dCLegend'),
      Icon: DLIcon,
      className: 'text-info-500 bg-info-100 rounded-xs',
    },
    {
      id: 3,
      name: t('reports.tagReport.tagTableLegend.projectLegend'),
      Icon: FlagIcon,
      className: 'text-success-500',
    },
    {
      id: 4,
      name: t('reports.tagReport.tagTableLegend.lessonLegend'),
      Icon: EducationIcon,
      className: 'text-primary-500',
    },
    {
      id: 5,
      name: t('reports.tagReport.tagTableLegend.performanceIndicatorLegend'),
      Icon: TagIcon,
      className: 'text-neutral-700',
    },
  ];

  return (
    <div className='flex gap-base text-neutral-700'>
      {tableLegend.map((item) => (
        <div key={item.id} className='flex gap-xxs items-center'>
          <IconContainer Icon={item.Icon} className={item.className} paddingSize='xxxs' size='sm' />
          <p className='mb-0 text-xxs font-medium leading-lg'>{item.name}</p>
        </div>
      ))}
    </div>
  );
};
