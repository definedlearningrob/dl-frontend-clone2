import { useToggle } from 'react-use';
import { castArray, compact, flatMapDeep, isEmpty, uniqBy } from 'lodash-es';
import { GroupBase, OptionProps } from 'react-select';
import { MouseEvent, useMemo } from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { ReactComponent as ChevronDownIcon } from '@shared/svg/chevron_down.svg';
import { ReactComponent as ChevronUpIcon } from '@shared/svg/chevron_up.svg';
import { getIncludesText } from '@shared/utils/getIncludesText';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';

import SharedCheckbox from '../Checkbox/Checkbox';

import { TreeSelectOption } from './TreeSelect';

export const TreeMenuOption = <Option extends TreeSelectOption, Group extends GroupBase<Option>>(
  props: OptionProps<Option, true, Group> & {
    isRootSelectable?: boolean;
    manualFiltering?: boolean;
  }
) => {
  const { t } = useTranslation();
  const [isExpanded, toggleIsExpanded] = useToggle(false);

  const {
    data,
    selectProps: { inputValue, value: selectValue },
    options,
    isRootSelectable,
    manualFiltering,
  } = props;

  const { label, value, children } = data;

  const flattenedChildren = useMemo(
    () =>
      flatMapDeep(children, (option) => ({
        ...option,
        children: [],
      })),
    [children]
  );

  const matchesSearchedText = getIncludesText(label, inputValue);
  const hasMatchingOption = flattenedChildren.some((option) =>
    getIncludesText(option.label, inputValue)
  );

  const isRootOption = options.some((option) => 'value' in option && option.value === value);
  const selectedOptions = compact(castArray(selectValue));
  const selectedValues = selectedOptions.map((option) => option.value);

  const isSelected = useMemo(() => {
    const isOptionSelected = selectedValues.includes(value);

    if (isRootSelectable) {
      return isOptionSelected;
    }

    return isRootOption
      ? flattenedChildren.every(
          (option) =>
            selectedValues.includes(option.value) || !getIncludesText(option.label, inputValue)
        )
      : isOptionSelected;
  }, [options, selectValue, inputValue, flattenedChildren]);

  const shouldBeDisplayed = useMemo(() => {
    if (manualFiltering) {
      return true;
    }

    return isEmpty(inputValue) || matchesSearchedText || hasMatchingOption;
  }, [manualFiltering, inputValue, flattenedChildren, label]);

  if (!shouldBeDisplayed) {
    return null;
  }

  const handleSelect = () => {
    const displayedChildren = flattenedChildren.filter((option) =>
      getIncludesText(option.label, inputValue)
    );
    const newValue =
      isRootSelectable || !isRootOption
        ? uniqBy([...selectedOptions, ...displayedChildren, { ...data, children: [] }], 'value')
        : uniqBy([...selectedOptions, ...displayedChildren], 'value');

    props.setValue(newValue, 'select-option', data);
  };

  const handleDeselect = () => {
    if (isRootSelectable || !isRootOption) {
      const newValue = selectedOptions.filter((selectedOption) => selectedOption.value !== value);
      props.setValue(newValue, 'deselect-option', data);

      return;
    }

    const selectedChildrenValues = flattenedChildren
      .filter(
        (option) =>
          selectedValues.includes(option.value) && getIncludesText(option.label, inputValue)
      )
      .map((option) => option.value);

    const newValue = selectedOptions.filter(
      (selectedOption) => !selectedChildrenValues.includes(selectedOption.value)
    );
    props.setValue(newValue, 'deselect-option', data);
  };

  const handleSelectChange = () => {
    if (isSelected) {
      handleDeselect();
    } else {
      handleSelect();
    }
  };

  const hasChildren = !isEmpty(children);
  const hasSelectedChildren =
    hasChildren && flattenedChildren.some((option) => selectedValues.includes(option.value));
  const shouldDisplayExpandButton =
    hasChildren && (manualFiltering || isEmpty(inputValue) || hasMatchingOption);
  const ExpandIcon = isExpanded ? ChevronUpIcon : ChevronDownIcon;

  const handleExpandMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleIsExpanded();
  };

  return (
    <>
      <div
        className='flex justify-between items-center p-xs text-xs cursor-pointer leading-base hover:bg-primary-200'
        onClick={handleSelectChange}>
        <div
          className={cx('flex items-center gap-xs mr-xs', {
            'text-primary-500': isSelected,
          })}>
          <SharedCheckbox
            checked={isSelected}
            indeterminate={!isSelected && hasSelectedChildren}
            readOnly={true}
          />
          {label}
        </div>
        {shouldDisplayExpandButton && (
          <DeprecatedIconButton
            aria-label={t('common.actions.expand')}
            className='!p-0 text-primary-500'
            icon={<ExpandIcon />}
            size='sm'
            onClick={handleExpandMenu}
          />
        )}
      </div>
      {isExpanded && (
        <div className='pl-sm'>
          {children.map((option) => (
            <TreeMenuOption key={option.value} {...props} data={option as Option} />
          ))}
        </div>
      )}
    </>
  );
};
