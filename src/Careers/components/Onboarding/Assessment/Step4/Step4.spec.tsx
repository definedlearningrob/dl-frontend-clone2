import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { MemoryHistory, createMemoryHistory } from 'history';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import cacheConfig from '@dc/graphql/cacheConfig';
import {
  assessmentProgressMock,
  createAnswer1Spy,
  createAnswer2Spy,
  createAnswer3Spy,
  createAnswer4Spy,
  createAnswer5Spy,
  finishAssessmentSpy,
  step4Mocks,
} from '@dc/components/Onboarding/Assessment/Step4/Step4.mocks';
import { AssessmentProvider } from '@dc/hooks/useAssessment';

import { Step4 } from './Step4';

describe('Step 4 - post-assessment career review survey', () => {
  const renderStep4 = ({
    history,
    mocks = [],
  }: { history?: MemoryHistory; mocks?: MockedResponse[] } = {}) =>
    renderWithRouterAndReduxProvider(
      <MockedProvider cache={cacheConfig} mocks={[...mocks, userInfoMock]}>
        <UserInfoProvider>
          <Route path='/onboarding/assessment/step/:stepNumber/question/:questionNumber'>
            <AssessmentProvider assessment={assessmentProgressMock}>
              <Step4 assessmentType='sas' isFirstQuestion={true} />
            </AssessmentProvider>
          </Route>
        </UserInfoProvider>
      </MockedProvider>,
      { history }
    );

  it('should render info page correctly', () => {
    const history = createMemoryHistory({
      initialEntries: ['/onboarding/assessment/step/4/question/1'],
    });

    const { container } = renderStep4({ history, mocks: step4Mocks });

    const heading = screen.getByRole('heading', {
      name: 'Section 4: Career Review Survey',
      level: 2,
    });

    const beginButton = screen.getByRole('button', { name: 'Begin' });

    expect(heading).toBeInTheDocument();
    expect(beginButton).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should go through whole survey correctly', async () => {
    const history = createMemoryHistory({
      initialEntries: ['/onboarding/assessment/step/4/question/1'],
    });

    renderStep4({ history, mocks: step4Mocks });

    const heading = screen.getByRole('heading', {
      name: 'Section 4: Career Review Survey',
      level: 2,
    });

    const beginButton = screen.getByRole('button', { name: 'Begin' });

    expect(heading).toBeInTheDocument();
    expect(beginButton).toBeInTheDocument();

    userEvent.click(beginButton);

    // QUESTION 1

    expect(
      await screen.findByRole('heading', { name: 'Do you know what career you want to pursue?' })
    ).toBeInTheDocument();

    const question1answer1 = screen.getByRole('radio', { name: 'I have no idea' });
    const question1answer2 = screen.getByRole('radio', {
      name: "I've thought about it, but I'm not sure",
    });
    const question1answer3 = screen.getByRole('radio', { name: 'I have a general idea' });
    const question1answer4 = screen.getByRole('radio', {
      name: 'I know the career I want to pursue',
    });

    expect(question1answer1).toBeInTheDocument();
    expect(question1answer2).toBeInTheDocument();
    expect(question1answer3).toBeInTheDocument();
    expect(question1answer4).toBeInTheDocument();

    await act(async () => {
      userEvent.click(question1answer1);
    });

    const nextButtonAfterQuestion1 = screen.getByRole('button', { name: 'Next Question' });

    userEvent.click(nextButtonAfterQuestion1);

    await waitFor(() => expect(createAnswer1Spy).toHaveBeenCalledTimes(1));

    // QUESTION 2

    expect(
      await screen.findByRole('heading', {
        name: 'Which of the following personal preferences or traits matter to you when you think about choosing a career?',
      })
    ).toBeInTheDocument();

    const question2Answers = [
      screen.getByRole('checkbox', {
        name: "I haven't thought about choosing a career",
      }),
      screen.getByRole('checkbox', {
        name: 'Subjects I like or dislike in school',
      }),
      screen.getByRole('checkbox', {
        name: 'My interests (things that I enjoy)',
      }),
      screen.getByRole('checkbox', {
        name: 'My values (things that are important to me)',
      }),
      screen.getByRole('checkbox', {
        name: 'My abilities (things I do well)',
      }),
      screen.getByRole('checkbox', {
        name: 'Other',
      }),
    ];

    question2Answers.forEach((answer) => {
      expect(answer).toBeInTheDocument();
    });

    userEvent.click(question2Answers[1]);
    userEvent.click(question2Answers[2]);
    userEvent.click(question2Answers[5]);

    const otherAnswerField = screen.getByPlaceholderText('For me the most matter...');

    userEvent.paste(otherAnswerField, 'Test answer');

    const nextButtonAfterQuestion2 = screen.getByRole('button', { name: 'Next Question' });

    userEvent.click(nextButtonAfterQuestion2);
    await waitFor(() => expect(createAnswer2Spy).toHaveBeenCalledTimes(1));

    // QUESTION 3
    expect(
      await screen.findByRole('heading', {
        name: 'What do you know about the career(s) you are considering?',
      })
    ).toBeInTheDocument();

    const question3answers = [
      screen.getByRole('checkbox', {
        name: 'I have no idea what career I want to pursue',
      }),
      screen.getByRole('checkbox', {
        name: 'I know what a person does in the career(s)',
      }),
      screen.getByRole('checkbox', {
        name: 'I know what courses I need to take in high school',
      }),
      screen.getByRole('checkbox', {
        name: 'I know what I need to study in college or trade school',
      }),
      screen.getByRole('checkbox', {
        name: 'I know how much money I could make',
      }),
      screen.getByRole('checkbox', {
        name: 'I know how easy or hard it is to get a job in the field',
      }),
      screen.getByRole('checkbox', {
        name: 'I know what I need to do to enter this career',
      }),
      screen.getByRole('checkbox', {
        name: 'Other',
      }),
    ];

    question3answers.forEach((answer) => {
      expect(answer).toBeInTheDocument();
    });

    await act(async () => {
      userEvent.click(question3answers[0]);
    });

    const disabledAnswers = question3answers.slice(1, 7);

    disabledAnswers.forEach((answer) => {
      expect(answer).toBeDisabled();
    });

    const nextButtonAfterQuestion3 = screen.getByRole('button', { name: 'Next Question' });

    userEvent.click(nextButtonAfterQuestion3);

    await waitFor(() => expect(createAnswer3Spy).toHaveBeenCalledTimes(1));

    //QUESTION 4

    expect(
      await screen.findByRole('heading', {
        name: 'Which of the following have career-related projects helped you to do?',
      })
    ).toBeInTheDocument();

    const question4answers = [
      screen.getByRole('checkbox', {
        name: "I've never done a project related to a career",
      }),
      screen.getByRole('checkbox', {
        name: 'They have helped me learn about different career options',
      }),
      screen.getByRole('checkbox', {
        name: 'They have helped me learn about what people in specific careers do',
      }),
      screen.getByRole('checkbox', {
        name: 'They have helped me learn about which careers I like and dislike',
      }),
      screen.getByRole('checkbox', {
        name: 'They have helped me to decide courses I should consider taking in school',
      }),
      screen.getByRole('checkbox', {
        name: 'Other',
      }),
    ];

    question4answers.forEach((answer) => {
      expect(answer).toBeInTheDocument();
    });

    await act(async () => {
      userEvent.click(question4answers[4]);
    });

    const nextButtonAfterQuestion4 = screen.getByRole('button', { name: 'Next Question' });

    userEvent.click(nextButtonAfterQuestion4);

    await waitFor(() => expect(createAnswer4Spy).toHaveBeenCalledTimes(1));

    // QUESTION 5
    expect(
      await screen.findByRole('heading', {
        name: 'How far along are you in your planning for after high school?',
      })
    ).toBeInTheDocument();

    const question5answers = [
      screen.getByRole('radio', {
        name: "I haven't started thinking about my plan yet. (No Plan)",
      }),
      screen.getByRole('radio', {
        name: "I'm interested in 3 or more options. (Early Planning)",
      }),
      screen.getByRole('radio', {
        name: "I'm choosing between 2 options. (Narrowed Planning)",
      }),
      screen.getByRole('radio', {
        name: 'I have a solid plan for after high school. (Focused Planning)',
      }),
      screen.getByRole('radio', {
        name: "I have a plan and I'm already taking steps to make it happen. (Advanced Planning)",
      }),
    ];

    question5answers.forEach((answer) => {
      expect(answer).toBeInTheDocument();
    });

    await act(async () => {
      userEvent.click(question5answers[1]);
    });

    const nextButtonAfterQuestion5 = screen.getByRole('button', { name: 'Next Question' });

    userEvent.click(nextButtonAfterQuestion5);

    await waitFor(() => expect(createAnswer5Spy).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(finishAssessmentSpy).toHaveBeenCalledTimes(1));
  });
});
