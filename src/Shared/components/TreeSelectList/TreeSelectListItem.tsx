import { isEmpty, uniq, xor } from 'lodash-es';
import { useToggle } from 'react-use';
import { MouseEvent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as ChevronUpIcon } from '@shared/svg/chevron_up.svg';
import { ReactComponent as ChevronDownIcon } from '@shared/svg/chevron_down.svg';
import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import { cx } from '@shared/utils/cx';
import SharedAvatar from '@shared/components/Avatar/Avatar';
import { Tooltip } from '@shared/components/Tooltip';
import { IconButton } from '@shared/components/IconButton/IconButton';

import { flattenOptions } from './helpers';

export interface TreeSelectOption {
  label: string;
  value: string;
  withAvatar?: boolean;
  children: this[];
}

type Props = {
  option: TreeSelectOption;
  selectedValues: string[];
  onChange: (values: string[]) => void;
  nestingLevel?: number;
};

export const TreeSelectListItem = ({
  option,
  selectedValues,
  onChange,
  nestingLevel = 0,
}: Props) => {
  const { t } = useTranslation();
  const [isExpanded, toggleIsExpanded] = useToggle(false);
  const { value, label, children, withAvatar } = option;

  const ExpandIcon = isExpanded ? ChevronUpIcon : ChevronDownIcon;
  const isRootOption = nestingLevel === 0;
  const hasChildren = !isEmpty(children);

  const flattenedChildren = useMemo(() => flattenOptions(children), [children]);

  const hasSelectedChildren = flattenedChildren.some((option) =>
    selectedValues.includes(option.value)
  );

  const getIsSelected = () => {
    if (!hasChildren) {
      return selectedValues.includes(value);
    }

    return flattenedChildren.every((option) => selectedValues.includes(option.value));
  };

  const isSelected = getIsSelected();

  const handleChange = () => {
    if (!hasChildren) {
      onChange(xor(selectedValues, [option.value]));

      return;
    }

    const childrenValues = flattenedChildren.map(({ value }) => value);
    const newValue = isSelected
      ? selectedValues.filter((option) => !childrenValues.includes(option))
      : uniq([...selectedValues, ...childrenValues]);

    onChange(newValue);
  };

  const handleToggleExpanded = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleIsExpanded();
  };

  const optionClasses = cx(
    'flex items-center gap-xs py-xs pr-xs w-full border-b border-neutral-300 cursor-pointer',
    'focus-visible:bg-primary-200 focus-within:bg-primary-200',
    { 'bg-primary-200': isSelected }
  );

  return (
    <>
      <li
        aria-label={label}
        className={optionClasses}
        style={{ paddingLeft: isRootOption ? 8 : nestingLevel * 64 }}
        onClick={handleChange}>
        {hasChildren && (
          <Tooltip
            delayDuration={500}
            message={isExpanded ? t('common.actions.fold') : t('common.actions.expand')}>
            <IconButton
              Icon={ExpandIcon}
              aria-label={isExpanded ? t('common.actions.fold') : t('common.actions.expand')}
              onClick={handleToggleExpanded}
            />
          </Tooltip>
        )}
        <div className='flex items-center'>
          <SharedCheckbox
            checked={isSelected}
            indeterminate={!isSelected && hasSelectedChildren}
            onChange={handleChange}
          />
          <div className='flex items-center gap-xs'>
            {withAvatar && (
              <div className='rounded-full outline outline-1 outline-neutral-300 ml-xs'>
                <SharedAvatar label={label} size='24' theme='light' />
              </div>
            )}
            {label}
          </div>
        </div>
      </li>
      {isExpanded &&
        children.map((option) => (
          <TreeSelectListItem
            key={option.value}
            nestingLevel={nestingLevel + 1}
            option={option}
            selectedValues={selectedValues}
            onChange={onChange}
          />
        ))}
    </>
  );
};
