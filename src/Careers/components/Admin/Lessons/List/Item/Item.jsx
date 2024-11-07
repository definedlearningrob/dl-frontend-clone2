import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedTableList from '@dc/shared/TableList/TableList';
import useForm from '@dc/hooks/useForm';
import { LESSON_TYPES } from '@dc/resources/constants';
import { shapeLesson } from '@dc/resources/typeDefs';
import { ListItemActions } from '@dc/shared/ListItemActions/ListItemActions';

import SharedImage from '@shared/components/Image/Image';

AdminLessonsListItem.propTypes = {
  lesson: shapeLesson,
};

function AdminLessonsListItem({ lesson }) {
  const { id, name, thumbnailUrl, type } = lesson;
  const { t } = useTranslation();
  const { setRecordToArchive } = useForm();
  const history = useHistory();
  const isSurveyLessonType = type === LESSON_TYPES.CAREER_REVIEW_SURVEY.toLowerCase();

  const onArchiveClick = () => !isSurveyLessonType && setRecordToArchive(lesson);

  const onShowClick = () => history.push(`/admin/lessons/${id}`);

  return (
    <SharedTableList.Row data-testid='lessons-list-item'>
      <SharedTableList.Cell>
        <SharedImage
          alt={t('admin.lessons.list.item.altImage')}
          className='w-[86px] h-lg object-cover'
          src={thumbnailUrl}
        />
      </SharedTableList.Cell>
      <SharedTableList.Cell data-testid='lessons-list-item-name'>{name}</SharedTableList.Cell>
      <SharedTableList.Cell>
        <ListItemActions
          editUrl={`/admin/lesson/${id}/edit`}
          onArchiveClick={onArchiveClick}
          onShowClick={onShowClick}
        />
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
}

export default AdminLessonsListItem;
