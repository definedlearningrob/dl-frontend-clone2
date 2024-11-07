import { components, ValueContainerProps } from 'react-select';

import { CounselorSelectOption } from '@dc/components/Student/ApplicationsManagement/types';

import SharedAvatar from '@shared/components/Avatar/Avatar';

import styles from './SelectCounselorValueContainer.module.sass';

type Props = ValueContainerProps<CounselorSelectOption, false> & {
  selectProps: any;
};

export const SelectCounselorValueContainer = ({ children, ...props }: Props) => (
  <components.ValueContainer {...props} className='!flex gap-xs'>
    {props.hasValue && (
      <SharedAvatar
        className={styles.avatar}
        label={props.selectProps.inputValue || props.selectProps.value.label}
        size='24'
      />
    )}
    <div className='flex items-center gap-xxxs font-medium text-xs'>{children}</div>
  </components.ValueContainer>
);
