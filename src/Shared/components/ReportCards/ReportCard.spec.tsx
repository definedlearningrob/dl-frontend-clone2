import { screen } from '@testing-library/react';

import { ReportType } from '@shared/resources/enums';
import { ReactComponent as InfoIcon } from '@shared/assets/icons/info_outlined.svg';
import { renderWithRouter } from '@shared/utils/test';
import { REPORT_PATHS } from '@shared/resources/constants';

import { ReportCard } from './ReportCard';

describe('ReportCard', () => {
  it('renders with big image when isBig is true', () => {
    const { container } = renderWithRouter(
      <ReportCard
        description='Test Description'
        image='test.jpg'
        isBig={true}
        title='Test Title'
        type={ReportType.CAREER_REVIEW_SURVEY}
      />
    );

    const image = screen.getByTitle('Test Title');
    expect(image).toHaveAttribute('src', 'test.jpg');

    expect(container).toMatchSnapshot();
  });

  it('renders with icon when isBig is false', () => {
    const { container } = renderWithRouter(
      <ReportCard
        Icon={InfoIcon}
        description='Test Description'
        isBig={false}
        title='Test Title'
        type={ReportType.CAREER_REVIEW_SURVEY}
      />
    );

    const icon = screen.getByTestId('report-card-icon');
    expect(icon).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('renders title and description correctly', () => {
    renderWithRouter(
      <ReportCard
        description='Test Description'
        title='Test Title'
        type={ReportType.CAREER_REVIEW_SURVEY}
      />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  describe('has correct link to', () => {
    it.each(Object.keys(ReportType))('%s report', (reportType) => {
      renderWithRouter(
        <ReportCard
          description='Test Description'
          title='Test Title'
          type={reportType as ReportType}
        />
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', `/reports/${REPORT_PATHS[reportType as ReportType]}`);
    });
  });
});
