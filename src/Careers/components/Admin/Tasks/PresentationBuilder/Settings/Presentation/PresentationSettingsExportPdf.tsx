import { useTranslation } from 'react-i18next';

import SharedButton from '@shared/components/Button/Button';
import { usePresentationState } from '@shared/hooks/usePresentationState';

function AdminTasksPresentationBuilderSettingsPresentationSettingsExportPdf() {
  const { t } = useTranslation();
  const { presentationState } = usePresentationState();
  const handleExportPDF = () => {
    const newWindow = window.open(
      `/admin/tasks/${presentationState.taskId}/presentation-print/?print-pdf`,
      '_blank'
    );

    newWindow?.focus();
  };

  return (
    <SharedButton
      className='settings__content__export-pdf-button'
      data-testid='preview-button'
      size='sm'
      type='button'
      variant='primary-outlined'
      onClick={handleExportPDF}>
      {t('admin.tasks.presentation.exportPdf')}
    </SharedButton>
  );
}

export default AdminTasksPresentationBuilderSettingsPresentationSettingsExportPdf;
