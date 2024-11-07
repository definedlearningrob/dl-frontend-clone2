import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { Badge } from '@shared/components/Badge/Badge';

export const EvidenceCounter = () => {
  const [evidenceField] = useField('evidence');
  const { t } = useTranslation();

  if (isEmpty(evidenceField.value)) {
    return null;
  }

  return (
    <Badge size='big' type='primary'>
      {t('components.evidence.evidenceCount', { count: evidenceField.value.length })}
    </Badge>
  );
};
