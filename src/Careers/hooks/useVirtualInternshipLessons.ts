import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

import { useOpportunityQuery } from '@dc/graphql/student/hooks/useOpportunityQuery';

type Params = {
  skip?: boolean;
};

const CALENDAR_LESSON_COUNT = 4;

export const useVirtualInternshipLessons = ({ skip }: Params = {}) => {
  const { opportunityId } = useParams<{ opportunityId: string }>();
  const { data } = useOpportunityQuery({ id: opportunityId, skip, track: false });

  return useMemo(() => {
    if (!data) {
      return {};
    }

    const {
      postExperienceLessons,
      requiredExperiences,
      experienceOpportunityLessons,
      readinessSkillsLessons,
      studentExperienceOpportunityLessons,
      calendarLessons,
      id: virtualInternshipId,
    } = data.opportunity.virtualInternship!;

    const mergedStudentExperienceOpportunities = [
      ...studentExperienceOpportunityLessons,
      ...Array<null>(
        Math.max(0, requiredExperiences - studentExperienceOpportunityLessons.length)
      ).fill(null),
    ];

    return {
      virtualInternshipId,
      readinessSkills: {
        lessons: readinessSkillsLessons,
        indexOffset: CALENDAR_LESSON_COUNT + postExperienceLessons.length + requiredExperiences + 1,
      },
      experienceOpportunity: {
        lessons: experienceOpportunityLessons,
        requiredExperiences,
      },
      studentExperienceOpportunity: {
        requiredExperiences,
        lessons: mergedStudentExperienceOpportunities,
        indexOffset: CALENDAR_LESSON_COUNT + 1,
      },
      postExperience: {
        lessons: postExperienceLessons,
        indexOffset: CALENDAR_LESSON_COUNT + requiredExperiences + 1,
      },
      calendar: {
        lessons: calendarLessons,
        indexOffset: 1,
      },
    };
  }, [data]);
};
