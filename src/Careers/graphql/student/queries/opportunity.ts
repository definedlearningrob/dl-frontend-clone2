import { gql, TypedDocumentNode } from '@apollo/client';

import { TOpportunity as TBaseOpportunity } from '@dc/resources/types';

export const OPPORTUNITY_QUERY: TypedDocumentNode<TOpportunityData, TOpportunityVariables> = gql`
  query StudentOpportunity($id: ID!, $track: Boolean, $trackVI: Boolean) {
    opportunity(id: $id, track: $track) {
      id
      name
      applicationStatus
      automaticAcceptance
      availableSpots
      creditsOutcomes
      isFavorite
      isRecommended
      description
      imageUrl
      location
      deadline
      periodStart
      periodEnd
      questions {
        id
        question
      }
      virtualInternship(track: $trackVI) {
        id
        status
        requiredExperiences
        readinessSkillsLessons {
          type
          id
          name
          thumbnailUrl
          progress {
            submitted
            total
          }
        }
        experienceOpportunityLessons {
          type
          id
          name
          thumbnailUrl
          description {
            audience
            goal
            introduction
            role
            situation
          }
          progress {
            submitted
            total
          }
        }
        postExperienceLessons {
          type
          id
          name
          thumbnailUrl
          progress {
            submitted
            total
          }
          careerReviewSurvey {
            performed
          }
        }
        calendarLessons {
          type
          id
          name
          thumbnailUrl
          progress {
            submitted
            total
          }
        }
        studentExperienceOpportunityLessons {
          type
          id
          name
          thumbnailUrl
          progress {
            submitted
            total
          }
        }
      }
      opportunityType
      opportunityApplication {
        id
        answers {
          answer
        }
      }
      pathways {
        id
        name
      }
      salaryInformation
      tags
      visibilityScope
      partner {
        id
        name
      }
      imageFitToContainer
    }
  }
`;

export type TOpportunityData = {
  opportunity: TOpportunity;
};

export type TOpportunityVariables = {
  id: string;
  track: boolean;
  trackVI: boolean;
};

type TOpportunity = Pick<
  TBaseOpportunity,
  | 'id'
  | 'name'
  | 'applicationStatus'
  | 'automaticAcceptance'
  | 'availableSpots'
  | 'creditsOutcomes'
  | 'isFavorite'
  | 'isRecommended'
  | 'description'
  | 'imageUrl'
  | 'location'
  | 'deadline'
  | 'periodEnd'
  | 'periodStart'
  | 'questions'
  | 'opportunityType'
  | 'salaryInformation'
  | 'tags'
  | 'virtualInternship'
  | 'visibilityScope'
  | 'opportunityApplication'
  | 'partner'
  | 'imageFitToContainer'
> & {
  pathways: Pick<TBaseOpportunity['pathways'][number], 'id' | 'name'>[];
};
