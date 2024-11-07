import cx from 'classnames';
import { components, OptionProps } from 'react-select';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { CounselorSelectOption } from '@dc/components/Student/ApplicationsManagement/types';

import SharedAvatar from '@shared/components/Avatar/Avatar';
import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as DoneIcon } from '@shared/svg/done.svg';

import styles from './SelectCounselorOptionComponent.module.sass';

type BaseOptionProps = OptionProps<CounselorSelectOption, false>;

export const SelectCounselorOptionComponent = ({ children, ...props }: BaseOptionProps) => {
  const { t } = useTranslation();
  const { initialValues } = useFormikContext<{ counselor: { value: string } }>();
  const isSelectedCounselor = isEmpty(initialValues.counselor)
    ? false
    : initialValues.counselor.value === props.data.value;
  const optionIsSelected = props.isSelected;
  const optionClassNames = cx(
    '!flex gap-xs items-center',
    'font-medium !text-xs',
    'hover:bg-neutral-200 hover:!text-font-primary',
    'active:!bg-neutral-200 active:!text-font-primary',
    {
      '!text-primary-500 !bg-transparent hover:!bg-neutral-200 hover:!text-primary-500':
        optionIsSelected,
    }
  );

  return (
    <components.Option {...props} className={optionClassNames}>
      <SharedAvatar label={props.data.label} size='24' />
      <span className='flex items-center gap-xxs flex-grow'>
        {children}
        {isSelectedCounselor && (
          <span className='!text-font-secondary font-regular text-xs flex content-between items-center flex-grow'>
            {t('student.postSecondary.applicationsSection.modal.preSelected')}
            <SharedIcon className={styles.selectedIcon} icon={<DoneIcon />} size='xs' />
          </span>
        )}
      </span>
    </components.Option>
  );
};
