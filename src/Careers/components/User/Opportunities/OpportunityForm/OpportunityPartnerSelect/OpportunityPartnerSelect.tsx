import { useField } from 'formik';
import { SingleValue } from 'react-select';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { PartnerOption, PartnerSelect } from '@dc/components/PartnerSelect/PartnerSelect';
import { VISIBILITY_SCOPE } from '@dc/resources/enums';

export const OpportunityPartnerSelect = () => {
  const { t } = useTranslation();
  const [field, meta, helpers] = useField('partner');
  const [visibilityScopeField, visibilityScopeMeta] = useField('visibilityScope');
  const [isDisabled, setIsDisabled] = useState(false);

  const isGlobalOpportunity = visibilityScopeField.value === VISIBILITY_SCOPE.ALL;

  useEffect(() => {
    setIsDisabled(isGlobalOpportunity);

    if (isGlobalOpportunity) {
      const newPartnerValue =
        visibilityScopeMeta.initialValue === VISIBILITY_SCOPE.ALL ? meta.initialValue : null;
      helpers.setValue(newPartnerValue);
    }
  }, [isGlobalOpportunity]);

  const handleSelect = (newValue: SingleValue<PartnerOption>) => {
    helpers.setValue(newValue);
  };

  return (
    <PartnerSelect
      isClearable={true}
      isDisabled={isDisabled}
      isMulti={false}
      isRequired={false}
      label={t('user.opportunities.form.partner')}
      limitedWidth={true}
      placeholder={t('user.opportunities.form.selectPartner')}
      size='md'
      value={field.value}
      onChange={handleSelect}
    />
  );
};
