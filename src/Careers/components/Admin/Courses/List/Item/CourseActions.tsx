import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { TCourse } from '@dc/graphql/user/queries/course';
import useForm from '@dc/hooks/useForm';

import { Tooltip } from '@shared/components/Tooltip';
import { ReactComponent as DuplicateIcon } from '@shared/svg/duplicate.svg';
import { ReactComponent as EditIcon } from '@shared/svg/edit.svg';
import { ReactComponent as ArchiveIcon } from '@shared/svg/delete_outlined.svg';
import { ReactComponent as ShowIcon } from '@shared/svg/eye.svg';
import { IconButton } from '@shared/components/IconButton/IconButton';

type Props = {
  course: TCourse;
};

export const CourseActions = ({ course }: Props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { setRecordToArchive, setRecordToDuplicate } = useForm();

  const onEditClick = () => {
    history.push(`/admin/courses/${course.id}/edit`);
  };

  const onArchiveClick = () => {
    setRecordToArchive(course);
  };

  const onShowClick = () => {
    history.push(`/admin/courses/${course.id}`);
  };

  const onDuplicateClick = () => {
    setRecordToDuplicate(course);
  };

  return (
    <div className='flex gap-xs ml-xs'>
      <Tooltip message={t('common.actions.show')}>
        <IconButton
          Icon={ShowIcon}
          aria-label={t('common.actions.show')}
          size='md'
          variant='primary-outlined'
          onClick={onShowClick}
        />
      </Tooltip>
      <Tooltip message={t('common.actions.edit')}>
        <IconButton
          Icon={EditIcon}
          aria-label={t('common.actions.edit')}
          size='md'
          variant='primary-outlined'
          onClick={onEditClick}
        />
      </Tooltip>
      <Tooltip message={t('common.actions.duplicate')}>
        <IconButton
          Icon={DuplicateIcon}
          aria-label={t('common.actions.duplicate')}
          size='md'
          variant='primary-outlined'
          onClick={onDuplicateClick}
        />
      </Tooltip>
      <Tooltip message={t('common.actions.archive')}>
        <IconButton
          Icon={ArchiveIcon}
          aria-label={t('common.actions.archive')}
          size='md'
          variant='danger-outlined'
          onClick={onArchiveClick}
        />
      </Tooltip>
    </div>
  );
};
