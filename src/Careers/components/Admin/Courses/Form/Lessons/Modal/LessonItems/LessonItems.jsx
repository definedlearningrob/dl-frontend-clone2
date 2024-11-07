import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

AdminCoursesFormLessonsModalLessonItems.propTypes = {
  lesson: PropTypes.shape({
    assignments: PropTypes.array,
    attachments: PropTypes.array,
    externalPresentations: PropTypes.array,
    researchLinks: PropTypes.array,
    texts: PropTypes.array,
    videos: PropTypes.array,
    vocabularies: PropTypes.array,
  }),
};

function AdminCoursesFormLessonsModalLessonItems({
  lesson: {
    assignments,
    attachments,
    externalPresentations,
    researchLinks,
    texts,
    videos,
    vocabularies,
  },
}) {
  const { t } = useTranslation();
  const allItems = [
    ...assignments,
    ...attachments,
    ...externalPresentations,
    ...researchLinks,
    ...texts,
    ...videos,
    ...vocabularies,
  ];
  const mappedItems = allItems
    .map((item) => {
      const itemInfo = {
        assignment: { key: 'assetName', type: t('admin.lessons.items.assignment.label') },
        attachment: { key: 'name', type: t('admin.lessons.items.attachment.label') },
        externalpresentation: { key: 'name', type: t('admin.lessons.items.presentation.label') },
        researchlink: { key: 'name', type: t('admin.lessons.items.researchLink.label') },
        text: { key: 'name', type: t('admin.lessons.items.text.label') },
        video: { key: 'name', type: t('admin.lessons.items.video.label') },
        vocabulary: { key: 'term', type: t('admin.lessons.items.vocabulary.label') },
      }[item.__typename.toLowerCase()];

      return { identifier: item[itemInfo.key], type: itemInfo.type, step: item.step };
    })
    .sort((a, b) => a.step - b.step);

  return (
    <ul>
      {mappedItems.map((item) => (
        <li key={item.step || item.identifier} data-testid='modal-lesson-lesson-item'>
          {item.identifier} ({item.type})
        </li>
      ))}
    </ul>
  );
}

export default AdminCoursesFormLessonsModalLessonItems;
