import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { ReactComponent as Match } from '@dc/svg/match.svg';
import { shapeCourseMetaData } from '@dc/resources/typeDefs';

import { ReactComponent as ArrowIcon } from '@shared/svg/arrow_forward.svg';
import SharedTextHighlighter from '@shared/components/TextHighlighter';
import CourseCard from '@shared/components/CourseCard';
import '@dc/components/Dashboard/RecommendedCourses/RecommendedCard/RecommendedCard.sass';
import { useRole } from '@shared/hooks/useRole';

DashboardRecommendedCard.propTypes = {
  allCoursesPreview: PropTypes.bool,
  className: PropTypes.string,
  course: PropTypes.shape({
    collection: PropTypes.PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    match: PropTypes.number,
    metadata: shapeCourseMetaData,
    name: PropTypes.string,
    pathway: PropTypes.shape({
      name: PropTypes.string,
    }),
    thumbnailUrl: PropTypes.string,
    type: PropTypes.string,
  }),
  filterText: PropTypes.string,
  onEnroll: PropTypes.func,
  taken: PropTypes.bool,
  teacherView: PropTypes.bool,
};

function DashboardRecommendedCard({
  allCoursesPreview,
  className,
  course,
  course: { id, match, metadata, name, pathway, thumbnailUrl, type, collection },
  onEnroll,
  taken,
  teacherView,
  filterText,
  ...attributes
}) {
  const { t } = useTranslation();
  const history = useHistory();
  const { isStudent } = useRole();
  const teacherViewAndTaken = teacherView && taken;

  const handleClick = () => {
    if (taken && teacherView) {
      return;
    }

    if (taken || allCoursesPreview) {
      return history.push(`courses/${id}`);
    }

    onEnroll(course);
  };

  const getButtonText = () => {
    if (allCoursesPreview) {
      return t('dashboard.recommendedCard.goToCourse');
    }

    if (teacherView) {
      return taken
        ? t('dashboard.recommendedCard.alreadyInvited')
        : t('dashboard.recommendedCard.inviteToCourse');
    }

    return taken
      ? t('dashboard.recommendedCard.goToCourse')
      : t('dashboard.recommendedCard.enrollInCourse');
  };

  const filteredAlternativeTitles = useMemo(() => {
    if (metadata.alternativeTitles) {
      const titles = metadata.alternativeTitles.split(',').map((item) => item.trim());

      return titles.filter((title) => {
        const regEx = new RegExp(filterText, 'ig');

        return title.search(regEx) !== -1;
      });
    }
  }, [metadata]);

  const filteredOnetCode = useMemo(() => {
    const regEx = new RegExp(filterText, 'ig');
    if (metadata.onetCode) {
      return metadata.onetCode.search(regEx) !== -1;
    }
  }, [metadata]);

  const TooltipComponent = () => (
    <div>
      {filteredAlternativeTitles?.length > 0 && (
        <>
          <h4>{t('dashboard.recommendedCard.alternativeNames')}</h4>
          {filteredAlternativeTitles.map((title, index, array) => (
            <SharedTextHighlighter key={index} text={filterText} theme='light'>
              <span className='highlightible'>
                {title}
                {index !== array.length - 1 ? '/' : ''}
              </span>
            </SharedTextHighlighter>
          ))}
        </>
      )}
      {filteredOnetCode && (
        <>
          <h4>{t('dashboard.recommendedCard.onetCode')}</h4>
          <SharedTextHighlighter text={filterText} theme='light'>
            <span className='highlightible'>{metadata.onetCode}</span>
          </SharedTextHighlighter>
        </>
      )}
    </div>
  );

  const shouldShowTooltip = useMemo(
    () => !!filterText && (!!filteredAlternativeTitles?.length || filteredOnetCode),
    [filteredAlternativeTitles, filteredOnetCode, filterText]
  );

  const matchInfo = useMemo(() => {
    if (!match || allCoursesPreview) {
      return;
    }

    return {
      icon: Match,
      text: t('dashboard.recommendedCard.match', { percentage: match }),
    };
  }, []);

  return (
    <CourseCard
      additionalInfo={matchInfo}
      backgroundUrl={thumbnailUrl}
      buttonIcon={!teacherViewAndTaken && ArrowIcon}
      buttonLabel={getButtonText()}
      buttonProps={{ 'data-testid': 'enroll-button' }}
      category={pathway?.name}
      className={className}
      collection={collection?.name}
      containerProps={{ 'data-testid': 'recommended-card', ...attributes }}
      isEducationalLabelVisible={teacherView}
      isMiddleSchool={!isStudent && type}
      isTaken={taken}
      searchedText={filterText}
      shouldShowTooltip={shouldShowTooltip}
      title={name}
      tooltip={TooltipComponent}
      onClick={handleClick}
    />
  );
}

export default DashboardRecommendedCard;
