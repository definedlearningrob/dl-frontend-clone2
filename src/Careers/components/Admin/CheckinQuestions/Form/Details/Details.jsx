import { useTranslation } from 'react-i18next';

import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';

function AdminCheckinsFormDetails() {
  const { t } = useTranslation();

  return (
    <SharedFormTextInput
      data-testid='checkin-question-input'
      isRequired={true}
      label={t('common.fields.common.name')}
      name='question'
    />
  );
}

export default AdminCheckinsFormDetails;
