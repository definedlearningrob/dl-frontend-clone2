import { compact } from 'lodash-es';
import { useTranslation } from 'react-i18next';

type Props = {
  hasAssessmentResults: boolean;
};

export const FinalReportNavigation = ({ hasAssessmentResults }: Props) => {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      const offset = 100;
      const sectionPosition = section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = sectionPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const navigationItems = compact([
    hasAssessmentResults && {
      id: 'assessment',
      label: t('student.finalReport.navigation.assessment'),
    },
    { id: 'explored', label: t('student.finalReport.navigation.experienced') },
    hasAssessmentResults && {
      id: 'recommended',
      label: t('student.finalReport.navigation.recommended'),
    },
  ]);

  return (
    <ol className='font-bold leading-lg text-primary-500 list-decimal list-inside'>
      {navigationItems.map(({ id, label }) => (
        <li
          key={id}
          className='mb-sm last:mb-0 cursor-pointer '
          onClick={() => scrollToSection(id)}>
          {label}
        </li>
      ))}
    </ol>
  );
};
