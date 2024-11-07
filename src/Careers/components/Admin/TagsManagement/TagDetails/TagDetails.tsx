import { useTranslation } from 'react-i18next';
import { useField } from 'formik';

import FormTextInput from '@shared/components/FormTextInput/FormTextInput';
import SharedCheckbox from '@shared/components/Checkbox/Checkbox';

export const TagDetails = () => {
  const { t } = useTranslation();
  const [isDefaultInput, , isDefaultHelpers] = useField('isDefault');

  const handleDefaultTypeChange = () => {
    isDefaultHelpers.setValue(!isDefaultInput.value);
  };

  return (
    <div className='flex flex-col gap-sm'>
      <FormTextInput
        isRequired={true}
        label={t('admin.performanceIndicators.performanceIndicatorName')}
        name='name'
        placeholder={t('admin.performanceIndicators.enterName')}
        type='text'
      />
      <SharedCheckbox
        checked={isDefaultInput.value}
        label={t('admin.performanceIndicators.defaultPerformanceIndicator')}
        labelClassName='text-xs'
        onChange={handleDefaultTypeChange}
      />
    </div>
  );
};
