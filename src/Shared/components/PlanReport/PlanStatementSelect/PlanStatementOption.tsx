import { GroupBase, OptionProps } from 'react-select';
import { useTranslation } from 'react-i18next';

import { Option } from '@shared/components/Select';
import { Kicker } from '@shared/components/Kicker';
import { cx } from '@shared/utils/cx';

export type SelectOption = {
  label: string;
  value: string;
  isRequired?: boolean;
  question: {
    text: string;
    options: { option: string; id: string }[];
  } | null;
};

export const PlanStatementOption = <
  Option extends SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: OptionProps<Option, IsMulti, Group> & { size: 'sm' | 'md' | 'lg' }
) => {
  const { t } = useTranslation();
  const { children, data, size } = props;

  const kickerClasses = cx('!mb-0 !leading-lg', {
    '!mb-xxs': size === 'lg',
    '!mb-xxxs': size === 'md',
  });

  return (
    <Option {...props}>
      {data.isRequired && (
        <Kicker className={kickerClasses} size='sm' variant='secondary'>
          {t('sharedCommon.required')}
        </Kicker>
      )}
      {children}
    </Option>
  );
};
