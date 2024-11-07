import cx from 'classnames';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { xor } from 'lodash-es';

import SharedCheckbox from '@shared/components/Checkbox/Checkbox';

import { QuickFiltersButton } from './QuickFiltersButton';
import styles from './QuickFilters.module.sass';

type Props = {
  showDropdown: boolean | null;
  tags: string[] | undefined;
  selectedTags: string[] | undefined;
  isExpanded: boolean;
  toggleIsExpanded: () => void;
  onTagsUpdate: (tags: string[]) => void;
};

export const QuickFilters = ({
  showDropdown,
  tags,
  selectedTags,
  isExpanded,
  toggleIsExpanded,
  onTagsUpdate,
}: Props) => {
  const dropdownClasses = cx(
    'mt-xs py-xxs rounded-xs bg-white border border-neutral-300',
    styles.dropdown
  );

  const shouldDisplayDropdown = tags && showDropdown;

  if (!shouldDisplayDropdown) {
    return (
      <QuickFiltersButton
        indicator={selectedTags?.length}
        isExpanded={isExpanded}
        onClick={toggleIsExpanded}
      />
    );
  }

  const handleChangeTag = (tag: string) => {
    const previousTags = selectedTags ?? [];
    const updatedTags = xor(previousTags, [tag]);
    onTagsUpdate(updatedTags);
  };

  return (
    <DropdownMenu.Root modal={false} open={isExpanded}>
      <DropdownMenu.Trigger asChild={true}>
        <div>
          <QuickFiltersButton
            indicator={selectedTags?.length}
            isExpanded={isExpanded}
            onClick={toggleIsExpanded}
          />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align='end'
          className={dropdownClasses}
          onPointerDownOutside={toggleIsExpanded}>
          {tags?.map((tag) => {
            const isChecked = selectedTags?.includes(tag);

            return (
              <DropdownMenu.CheckboxItem
                key={tag}
                checked={isChecked}
                className='cursor-pointer px-sm py-xs text-xs flex gap-xxs items-center'
                onCheckedChange={() => handleChangeTag(tag)}>
                <SharedCheckbox checked={isChecked} readOnly={true} />
                {tag}
              </DropdownMenu.CheckboxItem>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
