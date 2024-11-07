import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithI18N } from '@dc/utils/test';
import { AssignmentGrading } from '@dc/components/User/Student/GradingModal/AssignmentGrading/AssignmentGrading';

import { RubricProvider } from '@shared/components/Rubrics/RubricProvider';
import { RUBRIC_TYPE } from '@shared/components/Rubrics/utils/enums';
import { defaultRubricData } from '@shared/components/Rubrics/utils/defaultRubricData';

const assignment = {
  displayName: 'Assignment name',
  description: 'Assignment description',
  rubrics: [],
  id: '1',
  submission: null,
};

const defaultRubric = { ...defaultRubricData, id: '1', name: 'Default name', pointsAvailable: 10 };

describe('AssignmentGrading', () => {
  it('should render correctly without submission', () => {
    const { container } = renderWithI18N(
      <RubricProvider rubric={defaultRubric} type={RUBRIC_TYPE.GRADER}>
        <AssignmentGrading assignment={assignment} />
      </RubricProvider>
    );

    expect(screen.getByText('Assignment name')).toBeInTheDocument();
    expect(screen.getByText('Student has not submitted any files yet.')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with submission', () => {
    const assignmentWithSubmission = {
      ...assignment,
      submission: {
        files: [
          {
            id: '1',
            filename: 'filename',
            url: 'url',
            previewUrl: 'previewUrl',
            attachmentUrl: 'attachmentUrl',
          },
          {
            id: '2',
            filename: 'filename 2',
            url: 'url2',
            previewUrl: 'previewUrl2',
            attachmentUrl: 'attachmentUrl2',
          },
        ],
      },
    };
    const { container } = renderWithI18N(
      <RubricProvider rubric={defaultRubric} type={RUBRIC_TYPE.GRADER}>
        <AssignmentGrading assignment={assignmentWithSubmission} />
      </RubricProvider>
    );

    userEvent.click(screen.getByText('Files'));

    expect(screen.getByText('filename')).toBeInTheDocument();
    expect(screen.getByText('filename 2')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
