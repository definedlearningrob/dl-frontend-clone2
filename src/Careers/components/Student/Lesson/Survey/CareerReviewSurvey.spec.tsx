import { waitFor, screen, within } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { CareerReviewSurvey } from '@dc/components/Student/Lesson/Survey/CareerReviewSurvey';

import {
  createAttemptSpy,
  createCareerReviewSurveyAnswersSpy,
  currentCoursesSpy,
  lessonInCourseSpy,
  mocks,
} from './mocks';

type GetCareerReviewSurveyMockInput = {
  performed?: boolean;
  answers?: string[][];
};

const getCareerReviewSurveyMock = ({
  performed = false,
  answers = [],
}: GetCareerReviewSurveyMockInput) => ({
  version: 2 as const,
  performed,
  questions: [
    {
      answer: answers[0] || [],
      id: '1',
      options: [
        {
          option: 'Yes, definitely',
          step: 1,
        },
        {
          option: 'Definitely not',
          step: 2,
        },
      ],
      question: 'Can blind people see their dreams?',
      type: 'single_choice',
    },
    {
      answer: answers[1] || [],
      id: '2',
      options: [
        {
          option: 'Very Interested',
          step: 1,
        },
        {
          option: 'Not at all Interested',
          step: 2,
        },
        { option: 'Other', step: 3 },
      ],
      question: 'How interested are you in the Pathway this course is a part of?',
      type: 'multiple_choice',
    },
  ],
});

const renderSurvey = (
  mocks: MockedResponse[] = [],
  previewOnly = false,
  careerReviewSurvey: any
) => {
  const lessonMock = {
    careerReviewSurvey,
    resourceId: '1',
  };

  return renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <Route path='courses/:courseId/lessons/:lessonId'>
        <CareerReviewSurvey
          careerReviewSurvey={careerReviewSurvey}
          courseName='Test course name'
          previewOnly={previewOnly}
          resourceId={lessonMock.resourceId}
        />
      </Route>
    </MockedProvider>,
    {
      route: `courses/2/lessons/111`,
    }
  );
};

describe('Career Review Survey', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly as a form', () => {
    const { container } = renderSurvey(mocks, false, getCareerReviewSurveyMock({}));

    expect(container).toMatchSnapshot();
  });

  it('renders correctly as a summary', () => {
    const { container } = renderSurvey(mocks, true, getCareerReviewSurveyMock({}));

    expect(container).toMatchSnapshot();
  });

  it('renders correctly as a summary if survey already performed', () => {
    const answers = [['Yes, definitely'], ['Very Interested', 'Not at all Interested']];

    const { container } = renderSurvey(
      mocks,
      true,
      getCareerReviewSurveyMock({ performed: true, answers })
    );

    expect(container).toMatchSnapshot();
  });

  it('should allow user to retake survey', async () => {
    const answers = [['Yes, definitely'], ['Very Interested', 'Not at all Interested']];

    renderSurvey(mocks, false, getCareerReviewSurveyMock({ performed: true, answers }));

    const retakeButton = await screen.findByRole('button', { name: 'Retake' });

    userEvent.click(retakeButton);

    const confirmationModal = await screen.findByRole('dialog', { name: 'Modal' });

    const modalHeading = screen.getByRole('heading', {
      name: 'Do you want to retake Career Review Survey?',
      level: 4,
    });

    expect(modalHeading).toBeInTheDocument();

    const confirmButton = within(confirmationModal).getByRole('button', { name: 'Retake' });

    userEvent.click(confirmButton);

    await waitFor(() => expect(createAttemptSpy).toHaveBeenCalledTimes(1));

    await waitFor(() => expect(lessonInCourseSpy).toHaveBeenCalledTimes(1));
  });

  it('disables save survey until all questions are not answered', () => {
    renderSurvey(mocks, false, getCareerReviewSurveyMock({}));

    const saveButton = screen.getByRole('button', { name: 'Save' });
    expect(saveButton).not.toBeDisabled();
  });

  it('enables save survey correctly when all questions are answered', async () => {
    renderSurvey(
      mocks,
      false,
      getCareerReviewSurveyMock({
        performed: false,
      })
    );
    const firstAnswerOfSingleChoiceQuestion = screen.getByRole('radio', {
      name: 'Yes, definitely',
    });

    const firstAnswerOfMultiChoiceQuestion = screen.getByRole('checkbox', {
      name: 'Very Interested',
    });

    const saveButton = screen.getByRole('button', { name: 'Save' });

    userEvent.click(firstAnswerOfSingleChoiceQuestion);
    userEvent.click(firstAnswerOfMultiChoiceQuestion);

    userEvent.click(saveButton);

    await waitFor(() => {
      expect(createCareerReviewSurveyAnswersSpy).toBeCalledTimes(1);
    });
    await waitFor(() => {
      expect(currentCoursesSpy).toBeCalledTimes(1);
    });
  });

  it('enables select only one answer in single choice question', async () => {
    renderSurvey(
      mocks,
      false,
      getCareerReviewSurveyMock({
        performed: false,
      })
    );
    const [singleChoiceOption1, singleChoiceOption2] = await screen.findAllByRole('radio');

    userEvent.click(singleChoiceOption1);
    await waitFor(() => {
      expect(singleChoiceOption1).toBeChecked();
    });

    userEvent.click(singleChoiceOption2);
    await waitFor(() => {
      expect(singleChoiceOption2).toBeChecked();
    });

    expect(singleChoiceOption1).not.toBeChecked();

    const saveButton = screen.getByRole('button', { name: 'Save' });
    userEvent.click(saveButton);

    await waitFor(() => {
      expect(createCareerReviewSurveyAnswersSpy).toBeCalledTimes(0);
    });
    await waitFor(() => {
      expect(currentCoursesSpy).toBeCalledTimes(0);
    });
  });

  it('enables select many answers in multi choice question', async () => {
    renderSurvey(
      mocks,
      false,
      getCareerReviewSurveyMock({
        performed: false,
      })
    );
    const [multiChoiceOption1, multiChoiceOption2] = await screen.findAllByRole('checkbox');

    userEvent.click(multiChoiceOption1);
    await waitFor(() => {
      expect(multiChoiceOption1).toBeChecked();
    });

    userEvent.click(multiChoiceOption2);
    await waitFor(() => {
      expect(multiChoiceOption1).toBeChecked();
    });

    await waitFor(() => {
      expect(createCareerReviewSurveyAnswersSpy).toBeCalledTimes(0);
    });
    expect(currentCoursesSpy).toBeCalledTimes(0);
  });

  it('when first answer is selected in multi choice question, then other answers are disabled', async () => {
    renderSurvey(
      mocks,
      false,
      getCareerReviewSurveyMock({
        performed: false,
      })
    );

    const multiChoiceOption1 = screen.getByRole('checkbox', { name: 'Very Interested' });
    const multiChoiceOption2 = screen.getByRole('checkbox', { name: 'Not at all Interested' });
    const multiChoiceOption3 = screen.getByRole('checkbox', { name: 'Other' });

    expect(multiChoiceOption2).not.toBeDisabled();

    userEvent.click(multiChoiceOption1);
    await waitFor(() => {
      expect(multiChoiceOption1).toBeChecked();
    });

    expect(multiChoiceOption2).toBeDisabled();
    expect(multiChoiceOption3).toBeDisabled();

    await waitFor(() => {
      expect(createCareerReviewSurveyAnswersSpy).toBeCalledTimes(0);
    });
    expect(currentCoursesSpy).toBeCalledTimes(0);
  });

  it('when user selects "Other" option in multi choice question, then text area is enabled', async () => {
    renderSurvey(
      mocks,
      false,
      getCareerReviewSurveyMock({
        performed: false,
      })
    );

    const multiChoiceOption3 = screen.getByRole('checkbox', { name: 'Other' });

    userEvent.click(multiChoiceOption3);
    await waitFor(() => {
      expect(multiChoiceOption3).toBeChecked();
    });

    const textArea = screen.getByRole('textbox');

    expect(textArea).toBeEnabled();

    await waitFor(() => {
      expect(createCareerReviewSurveyAnswersSpy).toBeCalledTimes(0);
    });
    expect(currentCoursesSpy).toBeCalledTimes(0);
  });
});
