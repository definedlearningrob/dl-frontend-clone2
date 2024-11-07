import Select, { SingleValue } from 'react-select';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import { CounselorSelectOption } from '@dc/components/Student/ApplicationsManagement/types';
import { SelectCounselorOptionComponent } from '@dc/components/Student/ApplicationsManagement/SelectCounselorOptionComponent';
import { SelectCounselorValueContainer } from '@dc/components/Student/ApplicationsManagement/SelectCounselorValueContainer';
import { SelectSingleCounselorValue } from '@dc/components/Student/ApplicationsManagement/SelectSingleCounselorValue/SelectSingleCounselorValue';

import SharedAvatar from '@shared/components/Avatar/Avatar';

import styles from './SelectCounselorList.module.sass';

type Props = {
  allowCounselorSelection: boolean;
  counselorsOptions: CounselorSelectOption[];
};

export const SelectCounselorList = ({ allowCounselorSelection, counselorsOptions }: Props) => {
  const { t } = useTranslation();
  const [field, , helpers] = useField('counselor');

  const handleChange = (value: SingleValue<CounselorSelectOption>) => {
    helpers.setValue(value);
  };

  const submitOption = (
    <div className='flex items-center gap-xs text-xs select-none'>
      <SharedAvatar label={field.value?.label} size='32' />
      <p className='m-0'>
        {field.value?.label}
        {t('student.postSecondary.applicationsSection.modal.preSelected')}
      </p>
    </div>
  );

  return (
    <>
      <label className={styles.label} htmlFor='counselor'>
        {t(
          `student.postSecondary.applicationsSection.modal.${
            allowCounselorSelection ? 'searchCounselor' : 'yourCounselor'
          }`
        )}
      </label>
      {allowCounselorSelection ? (
        <Select
          {...field}
          className={styles.select}
          components={{
            Option: SelectCounselorOptionComponent,
            ValueContainer: SelectCounselorValueContainer,
            SingleValue: SelectSingleCounselorValue,
            IndicatorSeparator: null,
          }}
          data-showAvatar={true}
          id='counselor'
          isSearchable={true}
          menuPortalTarget={document.body}
          menuPosition='fixed'
          name='counselor'
          options={counselorsOptions}
          placeholder={t('student.postSecondary.applicationsSection.modal.pickCounselor')}
          onChange={handleChange}
        />
      ) : (
        submitOption
      )}
    </>
  );
};
