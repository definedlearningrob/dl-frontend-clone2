import { useTranslation } from 'react-i18next';

import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';

export const AdminCheckinGroupsFormDetails = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className='flex gap-base !mb-0'>
        <SharedFormTextInput isRequired={true} label={t('common.fields.common.name')} name='name' />
        <SharedFormTextInput
          isRequired={false}
          label={t('common.fields.common.displayName')}
          name='displayName'
        />
      </div>
    </>
  );
};
