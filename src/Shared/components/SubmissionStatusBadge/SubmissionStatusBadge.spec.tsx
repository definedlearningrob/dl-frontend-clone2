import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';

import i18n from '@dc/i18n';

import { SubmissionStatusBadge } from '@shared/components/SubmissionStatusBadge/SubmissionStatusBadge';

import { SUBMISSION_STATUS } from './SubmissionStatus';

const cases = [
  { status: SUBMISSION_STATUS.NOT_STARTED, expected: 'Not started' },
  { status: SUBMISSION_STATUS.SUBMITTED, expected: 'Submitted' },
  { status: SUBMISSION_STATUS.NOT_ACCEPTED, expected: 'Not accepted' },
  { status: SUBMISSION_STATUS.ACCEPTED, expected: 'Accepted' },
  { status: SUBMISSION_STATUS.DRAFT, expected: 'Draft' },
  { status: SUBMISSION_STATUS.GRADED, expected: 'Graded' },
];

const renderSubmissionStatusBadge = (status: SUBMISSION_STATUS, statusLabel?: string) =>
  render(
    <I18nextProvider i18n={i18n}>
      <SubmissionStatusBadge status={status} statusLabel={statusLabel} />
    </I18nextProvider>
  );

describe('SubmissionStatusBadge', () => {
  cases.map((singleCase) => {
    it(`should render ${singleCase.expected} with ${singleCase.status} status`, () => {
      renderSubmissionStatusBadge(singleCase.status);
      expect(screen.getByText(singleCase.expected)).toBeInTheDocument();
    });
  });

  it('should render badge with custom label', () => {
    const statusLabel = 'Graded 18/20';
    renderSubmissionStatusBadge(SUBMISSION_STATUS.GRADED, statusLabel);
    expect(screen.getByText(statusLabel)).toBeInTheDocument();
  });
});
