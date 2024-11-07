import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { TagsManagementTable } from '@dc/components/Admin/TagsManagement/TagsManagementTable';

import SharedButton from '@shared/components/Button/Button';

export const TagsManagementContent = () => {
  const { t } = useTranslation();

  return (
    <div className='px-base pt-base pb-sm'>
      <div className='flex items-center gap-sm mb-md'>
        <h5 className='flex-1 mb-0 text-sm'>{t('admin.performanceIndicators.title')}</h5>
        <Link to='/admin/performance-indicators/new'>
          <SharedButton data-testid='admin-new-badge-button' size='md' variant='primary'>
            {t('admin.performanceIndicators.addNew')}
          </SharedButton>
        </Link>
      </div>
      <TagsManagementTable />
    </div>
  );
};
