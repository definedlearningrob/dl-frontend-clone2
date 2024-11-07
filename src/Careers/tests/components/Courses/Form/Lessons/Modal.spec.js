import { waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import LessonModal from '@dc/components/Admin/Courses/Form/Lessons/Modal/Modal';
import lessonQuery from '@dc/graphql/user/queries/lesson';
import { lessonMock } from '@dc/tests/mocks/userMocks';
import { renderWithI18N } from '@dc/utils/test';

let lessonQueryCalled = false;

const mocks = [
  {
    request: {
      query: lessonQuery,
      variables: {
        id: '1',
        track: false,
      },
    },
    result: () => {
      lessonQueryCalled = true;

      return {
        data: { lesson: lessonMock },
      };
    },
  },
  {
    request: {
      query: lessonQuery,
      variables: {
        id: '2',
        track: false,
      },
    },
    result: () => {
      lessonQueryCalled = true;

      return {
        data: { lesson: { ...lessonMock, type: 'project' } },
      };
    },
  },
];

const renderLessonModal = (props) => {
  const utils = renderWithI18N(
    <MockedProvider mocks={mocks}>
      <LessonModal isOpen={true} lessonId='1' {...props} />
    </MockedProvider>
  );

  return { ...utils };
};

describe('AdminCoursesFormLessonsModal', () => {
  beforeEach(() => {
    lessonQueryCalled = false;
  });

  it('calls lesson query on lesson more info', async () => {
    renderLessonModal();

    await waitFor(() => {
      expect(lessonQueryCalled).toBe(true);
    });
  });

  it('shows lesson info properly', async () => {
    const { getByTestId, queryByTestId } = renderLessonModal();

    await waitFor(() => {
      expect(getByTestId(/modal-lesson-name/)).toHaveTextContent('First');
      expect(getByTestId(/modal-lesson-type/)).toHaveTextContent('Pathway');
      expect(queryByTestId(/modal-lesson-introduction/)).not.toBeInTheDocument();
    });
  });

  it('shows lesson info properly', async () => {
    const { getByTestId, queryByTestId } = renderLessonModal();

    await waitFor(() => {
      expect(getByTestId(/modal-lesson-name/)).toHaveTextContent('First');
      expect(getByTestId(/modal-lesson-type/)).toHaveTextContent('Pathway');
      expect(queryByTestId(/modal-lesson-introduction/)).not.toBeInTheDocument();
    });
  });

  it('shows description on lesson project type', async () => {
    const { getByTestId } = renderLessonModal({ lessonId: '2' });

    await waitFor(() => {
      expect(getByTestId(/modal-lesson-name/)).toHaveTextContent('First');
      expect(getByTestId(/modal-lesson-type/)).toHaveTextContent('Project');
      expect(getByTestId(/modal-lesson-introduction/)).toHaveTextContent('introduction');
      expect(getByTestId(/modal-lesson-goal/)).toHaveTextContent('goal');
      expect(getByTestId(/modal-lesson-role/)).toHaveTextContent('role');
      expect(getByTestId(/modal-lesson-audience/)).toHaveTextContent('audience');
      expect(getByTestId(/modal-lesson-situation/)).toHaveTextContent('situation');
    });
  });

  it('shows lesson items properly', async () => {
    const { getAllByTestId } = renderLessonModal({ lessonId: '2' });

    await waitFor(() => {
      const lessonItems = getAllByTestId(/modal-lesson-lesson-item/);

      expect(lessonItems[0]).toHaveTextContent('Asset name (Assignment)');
      expect(lessonItems[1]).toHaveTextContent('Attachment name (Attachment)');
      expect(lessonItems[2]).toHaveTextContent('Name (Research Link)');
      expect(lessonItems[3]).toHaveTextContent('Text name (Text)');
      expect(lessonItems[4]).toHaveTextContent('Video name (Video)');
      expect(lessonItems[5]).toHaveTextContent('Term (Vocabulary)');
      expect(lessonItems[6]).toHaveTextContent('Name (Presentation)');
    });
  });
});
