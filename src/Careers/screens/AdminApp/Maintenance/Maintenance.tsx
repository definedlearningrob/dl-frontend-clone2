import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';

import clearCacheQuery from '@dc/graphql/user/mutations/clearCache';
import SharedMainContent from '@dc/shared/MainContent/MainContent';

import SharedButton from '@shared/components/Button/Button';
import { callToast } from '@shared/components/Toaster/Toaster';

function AdminAppMaintenance() {
  const { t } = useTranslation();
  const [mutateClearCache, { loading }] = useMutation(clearCacheQuery);

  const clearCache = async () => {
    try {
      await mutateClearCache({ variables: { input: {} } });

      callToast('success', t('admin.maintenance.cleared'));
    } catch {
      callToast('error', t('admin.maintenance.clearError'));
    }
  };

  return (
    <SharedMainContent>
      <SharedButton isLoading={loading} variant='primary' onClick={clearCache}>
        <>{t('admin.maintenance.clearCache')}</>
      </SharedButton>
    </SharedMainContent>
  );
}

export default AdminAppMaintenance;
