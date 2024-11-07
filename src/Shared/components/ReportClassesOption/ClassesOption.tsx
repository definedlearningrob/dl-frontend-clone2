import { GroupBase, OptionProps, components } from 'react-select';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { ReactComponent as DoneIcon } from '@shared/svg/done.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import { SelectOption } from '@shared/components/Select/Select';

const MAX_VISIBLE_TEACHERS = 4;

export const ClassesOption = <
  Option extends SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: OptionProps<Option, IsMulti, Group> & {
    size: 'sm' | 'md' | 'lg';
    teachersMap: Record<string, string[]>;
  }
) => {
  const { isSelected, size, isMulti, children, teachersMap } = props;

  const { t } = useTranslation();

  const classUuid = props.data.value;

  const hasTeachers = !isEmpty(teachersMap[classUuid]);

  const formatTeacherLabel = (teachers: string[]) => {
    if (!teachers || teachers.length === 0) return '';

    const visibleTeachers = teachers.slice(0, MAX_VISIBLE_TEACHERS);

    if (teachers.length > MAX_VISIBLE_TEACHERS) {
      const remainingCount = teachers.length - visibleTeachers.length;

      return `${visibleTeachers.join(', ')} ${t('reports.andMoreTeachers', {
        count: remainingCount,
      })}`;
    }

    if (visibleTeachers.length === 2) {
      return `${visibleTeachers.join(', ')}`;
    } else if (visibleTeachers.length === 1) {
      return visibleTeachers[0];
    }

    return visibleTeachers.join(', ');
  };

  return (
    <components.Option {...props}>
      <div className='flex items-center'>
        {isMulti && <SharedCheckbox checked={isSelected} className='m-0' readOnly={true} />}
        <div className='flex flex-col gap-xxxs'>
          {children}
          {hasTeachers && (
            <div className='uppercase font-bold text-xxxs'>
              {t('reports.teacher', {
                count: teachersMap[classUuid].length,
                teachersList: formatTeacherLabel(teachersMap[classUuid]),
              })}
            </div>
          )}
        </div>
      </div>

      {isSelected && !isMulti && (
        <IconContainer Icon={DoneIcon} paddingSize='none' size={size === 'sm' ? 'sm' : 'base'} />
      )}
    </components.Option>
  );
};
