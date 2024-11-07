import { MockedProvider } from '@apollo/client/testing';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';

import { LessonCheckInItems } from '@dc/components/VirtualInternship/VirtualInternshipLesson/LessonCheckInItems/LessonCheckInItems';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { CREATE_CHECKIN_QUESTION_ANSWER } from '@dc/graphql/student/mutations/createCheckInQuestionAnswer';
import { UPDATE_CHECKIN_QUESTION_ANSWER } from '@dc/graphql/student/mutations/updateCheckInQuestionAnswer';
import cacheConfig from '@dc/graphql/cacheConfig';

import { TCheckInQuestionAnswer } from '@shared/components/CheckIns/types';

type Answer = Pick<TCheckInQuestionAnswer, 'id' | 'answer'>;

const mockedCheckInItems = (answers: Answer[] = new Array(3).fill(null)) => [
  {
    __typename: 'CheckInGroup',
    displayName: 'Lesson 1 Check-ins',
    id: '3',
    questions: [
      {
        __typename: 'CheckInQuestion',
        answer: answers[0],
        id: '5',
        question: 'Whats your name?',
        step: 1,
      },
      {
        __typename: 'CheckInQuestion',
        answer: answers[1],
        id: '6',
        question: 'How are you?',
        step: 2,
      },
    ],
    step: 1,
  },
  {
    __typename: 'CheckInQuestion',
    answer: answers[2],
    id: '4',
    question: 'Whats your question?',
    step: 1,
  },
];

const lessonId = 864;

const createCheckInSpy = jest.fn();
const updateCheckInSpy = jest.fn();

const mocks = [
  {
    request: {
      query: CREATE_CHECKIN_QUESTION_ANSWER,
      variables: {
        input: {
          answer: 'John Doe',
          lessonId: `${lessonId}`,
          checkInQuestionId: '5',
        },
      },
    },
    result: () => {
      createCheckInSpy();

      return {
        data: {
          createCheckInQuestionAnswer: {
            checkInQuestionAnswer: {
              answer: 'John Doe',
              id: 'temp',
              __typename: 'CheckInQuestionAnswer',
            },
          },
          __typename: 'CreateCheckInQuestionAnswerMutationPayload',
        },
      };
    },
  },

  {
    request: {
      query: UPDATE_CHECKIN_QUESTION_ANSWER,
      variables: {
        input: {
          answer: 'Adam Snow and Tom Onion',
          id: '9999',
        },
      },
    },
    result: () => {
      updateCheckInSpy();

      return {
        data: {
          updateCheckInQuestionAnswer: {
            checkInQuestionAnswer: {
              answer: 'Adam Snow and Tom Onion',
              id: 'temp',
              __typename: 'CheckInQuestionAnswer',
            },
          },
          __typename: 'CreateCheckInQuestionAnswerMutationPayload',
        },
      };
    },
  },
];

// @ts-ignore
const renderCheckInItems = (mocks, mockedCheckInItems, userType?: 'user' | 'student') => {
  let initialState;

  if (userType) {
    initialState = {
      session: {
        user: {
          type: userType,
        },
        loginError: {},
      },
    };
  }

  return renderWithRouterAndReduxProvider(
    <Route path='/opportunities/:opportunityId/virtual-internship/lesson/:lessonId'>
      <MockedProvider cache={cacheConfig} mocks={mocks}>
        <LessonCheckInItems checkInItems={mockedCheckInItems} />
      </MockedProvider>
    </Route>,
    {
      route: `/opportunities/6/virtual-internship/lesson/${lessonId}`,
      initialState,
    }
  );
};

describe('LessonCheckInItems', () => {
  it('should render properly', () => {
    const { container } = renderCheckInItems(mocks, mockedCheckInItems(), 'student');

    expect(container).toHaveTextContent('Lesson 1 Check-ins');

    expect(container).toMatchSnapshot();
  });

  it(`when user is logged in - input should be enabled`, () => {
    renderCheckInItems(mocks, mockedCheckInItems(), 'student');

    const firstQuestion = screen.getByLabelText('Whats your name?');

    expect(firstQuestion).toBeEnabled();
  });

  it(`when user it not logged in - input should be disabled`, () => {
    renderCheckInItems(mocks, mockedCheckInItems());

    const firstQuestion = screen.getByLabelText('Whats your name?');

    expect(firstQuestion).toBeDisabled();
  });

  it('should add checkin answer', async () => {
    renderCheckInItems(mocks, mockedCheckInItems(), 'student');

    const firstQuestionForm = screen.getByLabelText('Whats your name?').closest('form');

    const firstQuestion = screen.getByLabelText('Whats your name?');

    userEvent.click(firstQuestion);

    userEvent.paste(firstQuestion, 'John Doe');

    expect(firstQuestion).toHaveValue('John Doe');

    const saveButton = within(firstQuestionForm!).getByRole('button', { name: 'Save' });

    expect(createCheckInSpy).toBeCalledTimes(0);

    userEvent.click(saveButton);

    await waitFor(() => {
      expect(createCheckInSpy).toBeCalledTimes(1);
    });
  });

  it('should edit check-in answer', async () => {
    const answer = {
      answer: 'Adam Snow',
      checkInQuestionId: '5',
      id: '9999',
      studentId: '1234',
      grade: null,
      __typename: 'CheckInQuestionAnswer',
    };

    renderCheckInItems(mocks, mockedCheckInItems([answer]), 'student');

    const firstQuestionForm = screen.getByLabelText('Whats your name?').closest('form');
    const firstQuestion = screen.getByLabelText('Whats your name?');

    const editButton = within(firstQuestionForm!).getByRole('button', { name: 'Edit' });

    expect(firstQuestion).toBeDisabled();
    expect(firstQuestion).toHaveValue('Adam Snow');

    userEvent.click(editButton);

    expect(firstQuestion).toBeEnabled();

    userEvent.paste(firstQuestion, ' and Tom Onion');

    expect(firstQuestion).toHaveValue('Adam Snow and Tom Onion');

    const saveButton = within(firstQuestionForm!).getByRole('button', { name: 'Save' });

    expect(updateCheckInSpy).toHaveBeenCalledTimes(0);

    userEvent.click(saveButton);

    const updatedEditButton = await within(firstQuestionForm!).findByRole('button', {
      name: 'Edit',
    });

    expect(updatedEditButton).toBeInTheDocument();

    await waitFor(() => {
      expect(updateCheckInSpy).toHaveBeenCalledTimes(1);
    });

    expect(firstQuestion).toBeDisabled();
  });
});
