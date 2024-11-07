import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { TagDetails } from '@dc/components/Admin/TagsManagement/TagDetails/TagDetails';
import { AdminFormWrapper } from '@dc/components/Admin/AdminFormWrapper/AdminFormWrapper';
import { FormActions } from '@dc/components/Admin/FormActions/FormActions';

import Card from '@shared/components/Card/Card';

export const TagForm = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const isCreateMode = history.location.pathname.includes('new');
  const goBackToBadgesList = () => {
    history.push('/admin/performance-indicators');
  };

  const currentActionTitle = isCreateMode
    ? t('admin.performanceIndicators.createPerformanceIndicator')
    : t('admin.performanceIndicators.editPerformanceIndicator');

  return (
    <AdminFormWrapper title={currentActionTitle}>
      <Card>
        <TagDetails />
      </Card>
      <FormActions isLoading={false} onCancel={goBackToBadgesList} />
    </AdminFormWrapper>
  );
};
