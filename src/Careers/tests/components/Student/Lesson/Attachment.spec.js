import { fireEvent, waitFor } from '@testing-library/dom';
import { MockedProvider } from '@apollo/client/testing';

import Attachment from '@dc/components/Student/Lesson/Attachment/Attachment';
import createStudentItemMutation from '@dc/graphql/student/mutations/createStudentItem';
import { LESSON_ITEM_TYPES } from '@dc/resources/constants';
import { renderWithRouter } from '@dc/utils/test';

let createStudentItemMutationCalled = false;

const mocks = [
  {
    request: {
      query: createStudentItemMutation,
      variables: { input: { itemId: '1', itemType: LESSON_ITEM_TYPES.ATTACHMENT } },
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

const attachment = {
  id: '1',
  files: [{ id: '1' }],
};

const renderResearchLink = (props) =>
  renderWithRouter(
    <MockedProvider mocks={mocks}>
      <Attachment attachment={attachment} {...props} />
    </MockedProvider>
  );

describe('StudentLessonAttachment', () => {
  beforeEach(() => {
    createStudentItemMutationCalled = false;
  });

  it('calls create student item query on some of attachment files click', async () => {
    const { getAllByTestId } = renderResearchLink();

    fireEvent.click(getAllByTestId(/attachment-file-link/)[0]);

    await waitFor(() => {
      expect(createStudentItemMutationCalled).toBeTruthy();
    });
  });

  it('calls create student item query on download file button click', async () => {
    const { getAllByTestId } = renderResearchLink();

    fireEvent.click(getAllByTestId(/attachment-file-button/)[0]);

    await waitFor(() => {
      expect(createStudentItemMutationCalled).toBeTruthy();
    });
  });
});
