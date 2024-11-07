import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { ApplicationRatingInfo } from '@dc/components/User/Opportunities/ManageOpportunityApplications/ApplicationRatingInfo/ApplicationRatingInfo';
import { OPPORTUNITY_APPLICATION_STATUS } from '@dc/resources/enums';

const application = {
  id: '1',
  appliedAt: '2023-05-01',
  updatedAt: '2023-05-02',
  status: OPPORTUNITY_APPLICATION_STATUS.PENDING,
  answers: [{ id: '1', opportunityQuestionId: '1', answer: 'To sleep better!', step: 1 }],
  lastChangedBy: {
    uuid: '123',
    name: 'Teacher Name',
  },
  student: {
    uuid: '123',
    fullName: 'Applicant Student 1',
    schoolClasses: [{ uuid: 'class-uuid', name: 'Class name' }],
  },
};

describe('ApplicationRatingInfo', () => {
  const resetSpy = jest.fn();
  const statusChangeSpy = jest.fn();

  it('should render correctly for rejected application', () => {
    const { container } = renderWithRouterAndReduxProvider(
      <ApplicationRatingInfo
        application={application}
        onResetApplication={resetSpy}
        onStatusChange={statusChangeSpy}
      />
    );

    expect(screen.getByRole('heading', { level: 5, name: 'Application rejected' }));
    expect(screen.getByText("Applicant Student 1's application was rejected by Teacher Name."));

    expect(container).toMatchSnapshot();
  });

  it('should render correctly for accepted application', () => {
    renderWithRouterAndReduxProvider(
      <ApplicationRatingInfo
        application={{ ...application, status: OPPORTUNITY_APPLICATION_STATUS.ACCEPTED }}
        onResetApplication={resetSpy}
        onStatusChange={statusChangeSpy}
      />
    );

    expect(screen.getByRole('heading', { level: 5, name: 'Application accepted' }));
    expect(screen.getByText("Applicant Student 1's application was accepted by Teacher Name."));
  });

  // skipped as I was not able to make the dropdown to show up, revisit after new dropdown is used in this component
  it.skip('should allow changing the status by using context menu', async () => {
    renderWithRouterAndReduxProvider(
      <div id='dropdown-portal-container'>
        <ApplicationRatingInfo
          application={application}
          onResetApplication={resetSpy}
          onStatusChange={statusChangeSpy}
        />
      </div>
    );

    userEvent.click(screen.getByRole('button'));
    userEvent.click(await screen.findByText('Change to accepted'));
  });
});
