import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import PathwayCard from '@dc/components/Onboarding/Result/PathwayCard/PathwayCard';
import { pathwayShape } from '@dc/resources/typeDefs';

OnboardingResultPathwayOptions.propTypes = {
  pathways: PropTypes.shape({
    additionalPathways: PropTypes.arrayOf(pathwayShape),
    recommendedPathways: PropTypes.arrayOf(pathwayShape),
  }),
  selectedPathway: pathwayShape,
  setSelectedPathway: PropTypes.func,
};

function OnboardingResultPathwayOptions({ pathways, selectedPathway, setSelectedPathway }) {
  const pathwaySectionRef = useRef(null);
  const { t } = useTranslation();
  const recommendedPathways = [...pathways.recommendedPathways, ...pathways.additionalPathways];

  useEffect(() => {
    setTimeout(() => {
      if (pathwaySectionRef?.current) {
        pathwaySectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }, []);

  const renderRecommendedPathways = () =>
    recommendedPathways.map((pathway) => (
      <PathwayCard
        key={pathway.id}
        pathway={pathway}
        selectedPathway={selectedPathway}
        setSelectedPathway={setSelectedPathway}
      />
    ));

  return (
    <div ref={pathwaySectionRef} className='assessment-result__pathway-options-wrapper'>
      <section className='pathway-options' data-testid='pathway-options' id='pathway-section'>
        <div className='pathway-options__content-wrapper'>
          <h2 className='pathway-options__title'>
            {t('student.onboarding.assessment.result.pathwaysSection.title')}
          </h2>
          <p className='pathway-options__description'>
            {t('student.onboarding.assessment.result.pathwaysSection.subtitles')}
          </p>
          <div className='pathway-options__cards'>{renderRecommendedPathways()}</div>
        </div>
      </section>
    </div>
  );
}

export default OnboardingResultPathwayOptions;
