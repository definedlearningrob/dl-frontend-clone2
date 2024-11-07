import { MultiValueRemoveProps, components } from 'react-select';

import { ReactComponent as ClearIcon } from '@shared/svg/clear.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import { SelectOption } from '@shared/components/Select';

import styles from '../SelectList.module.sass';

export const ChipRemoveButton = (props: MultiValueRemoveProps<SelectOption, true>) => (
  <components.MultiValueRemove {...props}>
    <SharedIcon className={styles.removeIcon} icon={<ClearIcon />} size='sm' />
  </components.MultiValueRemove>
);
