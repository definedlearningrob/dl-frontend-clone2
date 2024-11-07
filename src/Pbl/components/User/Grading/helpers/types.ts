import { ApolloError, MutationFunctionOptions } from '@apollo/client';

import { GRADING_ITEM_TYPES } from '@pbl/resources/enums';
import { TGradeSubjectsData } from '@pbl/graphql/user/hooks/useGradeSubjectsByStatus';
import {
  TGradeSubmisisonMutationVariables,
  TGradeSubmissionMutationData,
} from '@pbl/graphql/user/hooks/useGradeCheckinMutation';
import { TStudentsAssginedToProjectData } from '@pbl/graphql/user/hooks/useStudentsAssignedToProject';
import { TStudent, TTeam } from '@pbl/graphql/user/queries/gradeSubjectsByStatus';

export type GradeCheckinsOptions = Omit<
  MutationFunctionOptions<TGradeSubmissionMutationData, TGradeSubmisisonMutationVariables>,
  'variables'
>;

export type GradingContextType = {
  navigation: {
    itemId: string;
    isTeamGrading?: boolean;
    classId?: string;
    subjectId?: string;
    hasNextStudent: boolean;
    hasPreviousStudent: boolean;
    projectId: string;
    pickedStudent?: PickedStudent['name'];
    navigateTo: (
      type: TTeam['__typename'] | TStudent['__typename'],
      config: {
        classId: string;
        subjectId: string;
        name: string;
      }
    ) => void;
    goToStudent: (type: 'next' | 'previous') => void;
    openSection: (classId: string) => void;
  };
  gradingType: GRADING_ITEM_TYPES;
  gradeItem: () => void;
  localGradedSubjects: Set<string>;
  studentsList: {
    data: TGradeSubjectsData | TStudentsAssginedToProjectData | undefined;
    loading: boolean;
    error: ApolloError | undefined;
  };
};

export type PickedStudent = {
  uuid: string;
  name: string;
};
