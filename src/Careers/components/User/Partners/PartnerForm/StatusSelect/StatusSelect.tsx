import { useTranslation } from 'react-i18next';
import { useField } from 'formik';

import { PUBLISHING_STATUSES } from '@dc/resources/constants';

import { Select } from '@shared/components/Select';

export const StatusSelect = () => {
  const { t } = useTranslation();
  const [statusField, statusMeta, statusHelpers] = useField('status');
  const errorMessage = statusMeta.error && statusMeta.touched ? statusMeta.error : undefined;
  const { value } = statusField;
  const partnerStatusesOptions = [
    { value: PUBLISHING_STATUSES.DRAFT, label: t('common.publishingStatuses.draft') },
    { value: PUBLISHING_STATUSES.PUBLISHED, label: t('common.publishingStatuses.published') },
  ];

  return (
    <Select
      errorMessage={errorMessage}
      isRequired={true}
      label={t('user.partners.form.statusLabel')}
      name='status'
      options={partnerStatusesOptions}
      value={partnerStatusesOptions.find((option) => option.value === value) || null}
      onChange={(newValue) => statusHelpers.setValue(newValue?.value)}
    />
  );
};
