/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import Card from '@dc/components/Student/Lesson/shared/Card/Card';
import createStudentItemMutation from '@dc/graphql/student/mutations/createStudentItem';
import LessonItemButton from '@dc/components/Student/Lesson/shared/Button/Button';
import { LESSON_ITEM_TYPES } from '@dc/resources/constants';

import { ReactComponent as LinkIcon } from '@shared/svg/link.svg';
import debounce from '@shared/utils/debounce';

StudentLessonResearchLink.propTypes = {
  previewOnly: PropTypes.bool,
  researchLinks: PropTypes.arrayOf(
    PropTypes.shape({
      __typename: PropTypes.string,
      author: PropTypes.string,
      displayName: PropTypes.string,
      id: PropTypes.string,
      resourceLink: PropTypes.string,
      sourceName: PropTypes.string,
    })
  ),
};

function StudentLessonResearchLink({ previewOnly, researchLinks }) {
  const generatedUUID = researchLinks[0].__typename + researchLinks[0].id;
  const { t } = useTranslation();
  const [createItem] = useMutation(createStudentItemMutation);
  const linkRef = useRef();

  const handleOpenLink = () => linkRef.current.click();

  const createStudentItem = (id) => () =>
    createItem({
      variables: {
        input: {
          itemId: id,
          itemType: LESSON_ITEM_TYPES.RESEARCHLINK,
        },
      },
    });

  return (
    <Card
      data-testid='lesson-item-research-link'
      id={generatedUUID}
      title={t('student.lesson.items.researchLink')}>
      {researchLinks.map(({ author, displayName, resourceLink, sourceName, id }) => (
        <div key={id} className='research-link-item' data-testid='research-link-item'>
          <div className='research-link-item__content'>
            <h3 className='research-link-item__title'>{displayName}</h3>
            <a
              ref={linkRef}
              className='research-link-item__link'
              data-testid='research-link-link'
              href={resourceLink}
              rel='noopener noreferrer'
              target='_blank'
              onClick={!previewOnly ? debounce(createStudentItem(id), 700) : () => {}}>
              {resourceLink}
            </a>
            <p className='research-link-item__source'>
              {author}, {sourceName}
            </p>
          </div>
          <LessonItemButton icon={<LinkIcon />} onClick={handleOpenLink} />
        </div>
      ))}
    </Card>
  );
}

export default StudentLessonResearchLink;
