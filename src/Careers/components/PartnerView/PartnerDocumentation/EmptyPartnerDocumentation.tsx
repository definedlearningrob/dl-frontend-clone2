import { useTranslation } from 'react-i18next';

import { ReactComponent as EmptyDocumentationImage } from '@dc/images/documentation_files.svg';

import { EmptyPartnerSection } from '../EmptyPartnerSection';

export const EmptyPartnerDocumentation = () => {
  const { t } = useTranslation();

  return (
    <EmptyPartnerSection
      Image={EmptyDocumentationImage}
      description={t('partners.noDocumentationFiles')}
      title={t('partners.documentationNotFound')}
    />
  );
};
