import { screen } from '@testing-library/react';

import { Statement } from '@shared/components/StudentReport/ProgressDetails/Statement';
import {
  EVALUATION_RESULTS_VALUES,
  EVIDENCE_CONTEXT_KIND,
  EVIDENCE_KIND,
  SERVICE_NAME,
  STATEMENT_QUESTION_TYPE,
} from '@shared/resources/enums';
import { renderWithI18N } from '@shared/utils/renderWithI18N';
import { TPlanGroupStatement } from '@shared/graphql/student/query/studentReportProgressByStudent';

describe('Statement component', () => {
  it('should render required statement correctly', () => {
    const statement = {
      name: 'Test statement',
      isRequired: true,
      results: [],
      question: null,
      evidences: [],
      step: 1,
      id: '3',
    };

    const { container } = renderWithI18N(<Statement statement={statement} />, 'DC');
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.getByText('Test statement')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render statement with results correctly', () => {
    const statement = {
      name: 'Test statement',
      isRequired: false,
      results: [
        { result: EVALUATION_RESULTS_VALUES.COMPLETED, createdAt: '2021-09-01' },
        { result: EVALUATION_RESULTS_VALUES.NOT_STARTED, createdAt: '2021-09-01' },
      ],
      question: null,
      evidences: [],
      step: 1,
      id: '1',
    };

    const { container } = renderWithI18N(<Statement statement={statement} />, 'DC');
    expect(screen.getByText('Completed')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render statement with question correctly', () => {
    const statement = {
      id: '4',
      step: 6,
      name: 'Test statement',
      isRequired: false,
      results: [],
      question: {
        id: '213',
        text: 'Test question',
        questionType: STATEMENT_QUESTION_TYPE.SHORT_TEXT,
        answer: { answer: ['Sample answer'], id: '1' },
        options: [],
      },
      evidences: [],
    };

    const { container } = renderWithI18N(<Statement statement={statement} />, 'DC');
    expect(screen.getByText('Test question')).toBeInTheDocument();
    expect(screen.getByText('Sample answer')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render statement with evidences correctly', () => {
    const statement: TPlanGroupStatement = {
      id: '4',
      step: 6,
      name: 'Test statement',
      isRequired: false,
      results: [],
      question: null,
      evidences: [
        {
          label: 'Schedule 1',
          itemId: '1',
          type: EVIDENCE_KIND.ASSIGNMENT_SUBMISSION,
          contextType: EVIDENCE_CONTEXT_KIND.COURSE,
          service: SERVICE_NAME.CAREERS,
          updatedAt: '2023-12-12T11:05:56Z' as unknown as Date,
          isTeamSubmission: false,
          id: '191',
          rubricScores: null,
        },
        {
          label: 'Software Bug Feedback Form Assignment',
          type: EVIDENCE_KIND.ASSIGNMENT_SUBMISSION,
          contextType: EVIDENCE_CONTEXT_KIND.VIRTUAL_INTERNSHIP,
          service: SERVICE_NAME.CAREERS,
          itemId: '2',
          updatedAt: '2023-08-31T06:52:39Z' as unknown as Date,
          isTeamSubmission: false,
          id: '192',
          rubricScores: null,
        },
        {
          label: 'Schedule 2',
          type: EVIDENCE_KIND.RUBRIC_GRADE,
          contextType: null,
          service: SERVICE_NAME.CAREERS,
          updatedAt: '2023-12-12T11:05:56Z' as unknown as Date,
          itemId: '3',
          isTeamSubmission: false,
          id: null,
          rubricScores: [
            {
              label: 'Sample rubric',
              maxScore: 25,
              currentScore: 12,
            },
          ],
        },
      ],
    };

    const { container } = renderWithI18N(<Statement statement={statement} />, 'DC');
    expect(screen.getByText('Sample rubric')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
