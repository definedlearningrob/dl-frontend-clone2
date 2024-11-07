import * as Accordion from '@radix-ui/react-accordion';

import { renderWithI18N } from '@shared/utils/renderWithI18N';
import { TPlanGroup } from '@shared/graphql/student/query/studentReportProgressByStudent';
import {
  EVALUATION_RESULTS_VALUES,
  EVIDENCE_KIND,
  SERVICE_NAME,
  STATEMENT_QUESTION_TYPE,
} from '@shared/resources/enums';

import { PlanGroupAccordionItem } from './PlanGroupAccordionItem';

const groupMock: TPlanGroup = {
  id: '80',
  name: 'NV - PERFORMANCE STANDARD 1.1 : DEMONSTRATE KNOWLEDGE OF THE HISTORY OF THE GRAPHIC  DESIGN FIELD ',
  step: 1,
  displayName: '',
  description:
    '<p>This performance standard and its performance indicators relate back to Content Standard 1.0: Demonstrate Knowledge of the Graphics Industry.&nbsp;</p>',
  statements: [
    {
      id: '196',
      step: 1,
      results: [
        {
          createdAt: '2023-11-28T09:41:08Z',
          result: EVALUATION_RESULTS_VALUES.COMPLETED,
        },
      ],
      name: '1.1.1 Research technologies that advanced graphic design ',
      isRequired: true,
      question: {
        id: '1',
        text: 'short text question',
        questionType: STATEMENT_QUESTION_TYPE.SHORT_TEXT,
        options: [],
        answer: {
          id: '1',
          answer: ['sample answer'],
        },
      },
      evidences: [
        {
          label: 'Schedule ',
          type: EVIDENCE_KIND.RUBRIC_GRADE,
          contextType: null,
          itemId: null,
          service: SERVICE_NAME.CAREERS,
          updatedAt: '2023-12-12T11:05:56Z' as unknown as Date,
          isTeamSubmission: false,
          id: null,
          rubricScores: [
            {
              label: 'sample rubric',
              maxScore: 25,
              currentScore: 25,
            },
          ],
        },
      ],
    },
  ],
};

describe('PlanGroupAccordionItem', () => {
  it('should render loading state correctly', () => {
    const { container } = renderWithI18N(
      <Accordion.Root collapsible={true} type='single'>
        <Accordion.Item value='item-1'>
          <PlanGroupAccordionItem group={groupMock} isExpanded={false} isLoading={true} />,
        </Accordion.Item>
      </Accordion.Root>,
      'DC'
    );

    expect(container).toMatchSnapshot();
  });

  it('should render not expanded item correctly', () => {
    const { container } = renderWithI18N(
      <Accordion.Root collapsible={true} type='single'>
        <Accordion.Item value='item-1'>
          <PlanGroupAccordionItem group={groupMock} isExpanded={false} isLoading={false} />,
        </Accordion.Item>
      </Accordion.Root>,
      'DC'
    );

    expect(container).toMatchSnapshot();
  });

  it('should render expanded item correctly', () => {
    const { container } = renderWithI18N(
      <Accordion.Root collapsible={true} type='single'>
        <Accordion.Item value='item-1'>
          <PlanGroupAccordionItem group={groupMock} isExpanded={true} isLoading={false} />,
        </Accordion.Item>
      </Accordion.Root>,
      'DC'
    );

    expect(container).toMatchSnapshot();
  });
});
