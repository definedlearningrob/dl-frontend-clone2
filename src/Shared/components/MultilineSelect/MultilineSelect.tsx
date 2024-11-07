import {
  ChangeEvent,
  useMemo,
  useRef,
  RefObject,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { debounce, isEmpty } from 'lodash-es';

import { cx } from '@shared/utils/cx';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as SearchIcon } from '@shared/svg/search.svg';
import { SelectedValueChip } from '@shared/components/MultilineSelect/SelectedValueChip';
import { InputLabel } from '@shared/components/InputLabel/InputLabel';

export interface Option {
  label: string;
  value: string;
}

type MultiLineSelectProps = {
  value: string[];
  options: Option[];
  onRemove: (value: string) => void;
  onSearch: (value: string) => void;
  label: string;
  placeholder: string;
  className?: string;
  textInputRef?: RefObject<HTMLInputElement> & { clearInput: () => void };
  isRequired?: boolean;
};

export type MultilineSelectRef = { clearTextInput: () => void; focusTextInput: () => void };

export const MultilineSelect = forwardRef<MultilineSelectRef, MultiLineSelectProps>(
  (
    { value, label, options, onRemove, onSearch, placeholder, className, isRequired },
    forwardRef
  ) => {
    const [searchValue, setSearchValue] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);

    const clearTextInput = () => {
      setSearchValue('');
    };

    const focusTextInput = () => {
      inputRef.current?.focus();
    };

    useImperativeHandle(
      forwardRef,
      () => ({
        clearTextInput,
        focusTextInput,
      }),
      [focusTextInput, clearTextInput]
    );

    const hasSelectedValues = !isEmpty(value);

    const normalizedOptions = useMemo(
      () =>
        // eslint-disable-next-line react/prop-types
        options.reduce((acc, option) => {
          acc[option.value] = option;

          return acc;
        }, {} as Record<string, Option>),
      [options]
    );

    // Bug in eslint-plugin-react@7.23.2, to remove after package update
    // eslint-disable-next-line react/prop-types
    const selectedOptions = value.map((item) => normalizedOptions[item]);

    const debouncedSearch = useMemo(() => debounce(onSearch, 500), []);

    const handleChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
      debouncedSearch(event.target.value);
    };

    const wrapperClassname = cx(
      'flex items-center flex-wrap gap-xxs xxxl:gap-xs',
      'bg-white transition-colors border rounded-sm max-h-[122px] scrollbar',
      'border-neutral-300 hover:border-neutral-400 focus-within:!border-primary-500 px-xs py-xxs'
    );

    return (
      <label className={cx('flex flex-col gap-xs mb-sm', className)}>
        <InputLabel isRequired={isRequired} isSmall={false}>
          {label}
        </InputLabel>
        <div className={wrapperClassname}>
          {selectedOptions.map((option) => (
            <SelectedValueChip key={option!.value} option={option!} onRemove={onRemove} />
          ))}
          {!hasSelectedValues && (
            <IconContainer Icon={SearchIcon} className='text-neutral-400' paddingSize='none' />
          )}
          <input
            ref={inputRef}
            className='flex-1 min-w-md outline-none text-xs placeholder:text-font-secondary bg-white leading-[32px]'
            id='multiline-input'
            placeholder={hasSelectedValues ? '' : placeholder}
            value={searchValue}
            onChange={handleChangeSearchValue}
          />
        </div>
      </label>
    );
  }
);
