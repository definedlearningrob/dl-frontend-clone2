/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import LessonItems from '@dc/components/Admin/Courses/Form/Lessons/Modal/LessonItems/LessonItems';
import lessonQuery from '@dc/graphql/user/queries/lesson';
import { getLessonLabel } from '@dc/utils/lessons';
import { LESSON_TYPES } from '@dc/resources/constants';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import SharedImage from '@shared/components/Image/Image';
import SharedModal from '@shared/components/Modal/Modal';
import { cleanInjection } from '@shared/utils/cleanInjection';

AdminCoursesFormLessonsModal.propTypes = {
  isOpen: PropTypes.bool,
  lessonId: PropTypes.string,
  onClose: PropTypes.func,
};

function AdminCoursesFormLessonsModal({ isOpen, lessonId, onClose }) {
  const { t } = useTranslation();

  const renderDescription = (description) => (
    <>
      <h3 className='admin-preview-modal-heading'>{t('admin.lessons.introduction')}</h3>
      <p
        dangerouslySetInnerHTML={cleanInjection(description.introduction)}
        data-testid='modal-lesson-introduction'
      />
      <h3 className='admin-preview-modal-heading'>{t('admin.lessons.goal')}</h3>
      <p
        dangerouslySetInnerHTML={cleanInjection(description.goal)}
        data-testid='modal-lesson-goal'
      />
      <h3 className='admin-preview-modal-heading'>{t('admin.lessons.role')}</h3>
      <p
        dangerouslySetInnerHTML={cleanInjection(description.role)}
        data-testid='modal-lesson-role'
      />
      <h3 className='admin-preview-modal-heading'>{t('admin.lessons.audience')}</h3>
      <p
        dangerouslySetInnerHTML={cleanInjection(description.audience)}
        data-testid='modal-lesson-audience'
      />
      <h3 className='admin-preview-modal-heading'>{t('admin.lessons.situation')}</h3>
      <p
        dangerouslySetInnerHTML={cleanInjection(description.situation)}
        data-testid='modal-lesson-situation'
      />
    </>
  );

  return (
    <div data-testid='lesson-modal'>
      <SharedModal isOpen={isOpen} onDismiss={onClose}>
        <SharedModal.Header>
          <SharedModal.Heading>{t('admin.courses.lessons.moreInfoTitle')}</SharedModal.Heading>
        </SharedModal.Header>
        <SharedModal.Body>
          <SharedDataLoader
            options={{
              variables: {
                id: lessonId,
                track: false,
              },
            }}
            query={lessonQuery}>
            {({ lesson }) => (
              <>
                <div className='courses__lesson__modal-image'>
                  <SharedImage
                    alt={t('admin.lessons.list.item.altImage')}
                    fallbackSrc={lesson.imageUrl}
                    src={lesson.thumbnailUrl}
                  />
                </div>
                <h3 className='admin-preview-modal-heading'>{t('common.fields.common.name')}</h3>
                <p data-testid='modal-lesson-name'>{lesson.name}</p>
                <h3 className='admin-preview-modal-heading'>{t('admin.lessons.type')}</h3>
                <p data-testid='modal-lesson-type'>{getLessonLabel(t, lesson)}</p>
                {lesson.type === LESSON_TYPES.PROJECT.toLowerCase() &&
                  renderDescription(lesson.description)}
                <h3 className='admin-preview-modal-heading'>{t('admin.lessons.lessonItems')}</h3>
                <LessonItems lesson={lesson} />
              </>
            )}
          </SharedDataLoader>
        </SharedModal.Body>
        <SharedModal.Footer>
          <SharedModal.Button variant='primary' onClick={onClose}>
            {t('common.actions.close')}
          </SharedModal.Button>
        </SharedModal.Footer>
      </SharedModal>
    </div>
  );
}

export default AdminCoursesFormLessonsModal;
