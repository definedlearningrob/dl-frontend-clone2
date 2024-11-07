import { createContext, useContext, PropsWithChildren, useState, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash-es';

import { GRADING_ITEM_TYPES } from '@pbl/resources/enums';
import useGradeSubjectsByStatus, {
  TGradeSubjectsData,
} from '@pbl/graphql/user/hooks/useGradeSubjectsByStatus';

import { GradingContextType, PickedStudent } from '../helpers/types';

type Params = {
  projectId: string;
  classId?: string;
  studentId?: string;
  productId?: string;
  checkinId?: string;
  teamId?: string;
};

const routeKeys = {
  [GRADING_ITEM_TYPES.CHECK_IN_QUESTION]: 'checkins',
  [GRADING_ITEM_TYPES.PRODUCT]: 'products',
};

const parseGradeSubjects = (data: TGradeSubjectsData) => [
  ...data.schoolClass.studentsToBeGraded.nodes,
  ...data.schoolClass.teamsToBeGraded,
];
const GradingContext = createContext<GradingContextType>({} as GradingContextType);

type Props = PropsWithChildren<{
  type: GRADING_ITEM_TYPES;
}>;

const GradingProvider = ({ children, type }: Props) => {
  const { checkinId, productId, classId, projectId, studentId, teamId } = useParams<Params>();

  const itemId = (checkinId || productId) as string;
  const subjectId = studentId || teamId;
  const isTeamGrading = !!teamId;

  const history = useHistory();
  const routeKey = routeKeys[type];

  const [pickedStudent, setPickedStudent] = useState<PickedStudent | null>(null);
  const [gradedSubjectIds, setGradedSubjectIds] = useState<Set<string>>(new Set([]));

  const { data, loading, error } = useGradeSubjectsByStatus(projectId, type, itemId, classId);

  // functions
  const gradeItem = () => {
    subjectId &&
      setGradedSubjectIds((gradedSubjectIds) => new Set([...gradedSubjectIds, subjectId]));
  };

  //parsed data
  const subjectsToGrade = useMemo(() => {
    if (data && classId) {
      //@ts-ignore
      return parseGradeSubjects(data);
    }
  }, [data]);
  const hasClassWithStudents = classId && !isEmpty(subjectsToGrade);

  const currentSubjectIndex = useMemo(
    () => subjectsToGrade && subjectsToGrade.findIndex((gradeable) => gradeable.uuid === subjectId),
    [subjectsToGrade, subjectId]
  );

  const gradeableIndexes = useMemo(
    () => ({
      previous: currentSubjectIndex && currentSubjectIndex > 0 ? currentSubjectIndex - 1 : null,
      next:
        currentSubjectIndex !== undefined && currentSubjectIndex < subjectsToGrade!.length - 1
          ? currentSubjectIndex + 1
          : null,
    }),
    [currentSubjectIndex, subjectsToGrade]
  );

  //navigation
  const navigateTo: GradingContextType['navigation']['navigateTo'] = (
    type,
    { classId, subjectId, name }
  ) => {
    //get rid of in favour of useQuery with cache
    name &&
      setPickedStudent({
        uuid: itemId,
        name,
      });
    const routeSuffix = type === 'Student' ? subjectId : `teams/${subjectId}`;

    history.replace(
      `/projects/${projectId}/grading/${routeKey}/${itemId}/${classId}/${routeSuffix}`
    );
  };

  const openSection = (classId: string) => {
    setPickedStudent(null);
    history.replace(`/projects/${projectId}/grading/${routeKey}/${itemId}/${classId}`);
  };

  const goToStudent = (type: 'next' | 'previous') => {
    const neededStudentIndex = gradeableIndexes[type];

    if (hasClassWithStudents && neededStudentIndex !== null) {
      const subject = subjectsToGrade![neededStudentIndex];

      subject &&
        navigateTo(subject.__typename, { classId, subjectId: subject.uuid, name: subject.name });
    }
  };

  return (
    <GradingContext.Provider
      value={{
        navigation: {
          isTeamGrading,
          itemId,
          classId,
          hasNextStudent: gradeableIndexes.next !== null,
          hasPreviousStudent: gradeableIndexes.previous !== null,
          pickedStudent: pickedStudent?.name,
          projectId,
          subjectId,
          navigateTo,
          goToStudent,
          openSection,
        },
        studentsList: {
          data,
          loading,
          error,
        },
        gradeItem,
        gradingType: type,
        localGradedSubjects: gradedSubjectIds,
      }}>
      {children}
    </GradingContext.Provider>
  );
};

export const useGradingContext = () => useContext(GradingContext);

export default GradingProvider;
