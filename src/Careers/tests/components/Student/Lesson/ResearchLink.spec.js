import { fireEvent, waitFor } from '@testing-library/dom';
import { MockedProvider } from '@apollo/client/testing';

import ResearchLink from '@dc/components/Student/Lesson/ResearchLink/ResearchLink';
import createStudentItemMutation from '@dc/graphql/student/mutations/createStudentItem';
import { LESSON_ITEM_TYPES } from '@dc/resources/constants';
import { renderWithRouter } from '@dc/utils/test';

let createStudentItemMutationCalled = false;

const mocks = [
  {
    request: {
      query: createStudentItemMutation,
      variables: { input: { itemId: '1', itemType: LESSON_ITEM_TYPES.RESEARCHLINK } },
    },
    result: () => {
      createStudentItemMutationCalled = true;

      return {
        data: {
          createStudentItem: {
            status: 'ok',
          },
        },
      };
    },
  },
];

const researchLink = {
  id: '1',
};

const renderResearchLink = (props) =>
  renderWithRouter(
    <MockedProvider mocks={mocks}>
      <ResearchLink researchLinks={[researchLink]} {...props} />
    </MockedProvider>
  );

describe('StudentLessonResearchLink', () => {
  beforeEach(() => {
    createStudentItemMutationCalled = false;
  });

  it('calls create student item query on research link click', async () => {
    const { getAllByTestId } = renderResearchLink();

    fireEvent.click(getAllByTestId(/research-link-link/)[0]);

    await waitFor(() => {
      expect(createStudentItemMutationCalled).toBeTruthy();
    });
  });
});
