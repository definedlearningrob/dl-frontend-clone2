import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';
import { StandardSet } from '@graphql/dl/public/types';

import CheckIns from '@pbl/components/Project/CheckIns/CheckIns';
import Introduction from '@pbl/components/Project/Introduction/Introduction';
import PublicProducts from '@pbl/components/SharedResources/Student/Project/Products/ProductsLoader';
import Standards from '@pbl/components/Project/Standards/Standards';
import StudentProducts from '@pbl/components/Student/Project/Products/ProductsLoader';
import StudentResources from '@pbl/components/Project/StudentResources/StudentResources';
import TeachingResources from '@pbl/components/User/Project/TeachingResources/TeachingResources';
import { UserProductsLoader } from '@pbl/components/User/Project/ProductsLoader';
import { ProjectTabs } from '@pbl/components/Project/Tabs/Tabs';
import { TCheckInGroup, TCheckInQuestion, TDefinedCareer } from '@pbl/components/Project/types';
import { PROJECT_USER_TYPES } from '@pbl/resources/enums';
import DefinedCareersConnectionTab from '@pbl/components/Project/DefinedCareersConnectionTab';
import { CheckInProvider } from '@pbl/components/Project/helpers/CheckInContext';
import { TTeam } from '@pbl/graphql/student/fragments/projectFragment';

import EmptyState from '@shared/components/EmptyState/EmptyState';
import { useTabsContext } from '@shared/components/DeprecatedTabs/DeprecatedTabs';

type UserProjectDetailsProps = {
  assignedAt?: string | null;
  checkInGroups: TCheckInGroup[];
  checkInQuestions: TCheckInQuestion[];
  courses: TDefinedCareer[];
  introduction: string;
  projectName: string;
  studentResources: string;
  teachingResources?: string;
  team?: TTeam;
  type: PROJECT_USER_TYPES;
  standardSets?: StandardSet[];
};

function ProjectDetails(props: UserProjectDetailsProps) {
  const {
    assignedAt,
    checkInGroups,
    checkInQuestions,
    courses,
    introduction,
    studentResources,
    teachingResources,
    team,
    type,
    standardSets,
  } = props;
  const { t } = useTranslation();
  const { tab } = useTabsContext();

  const Products = {
    [PROJECT_USER_TYPES.PUBLIC]: PublicProducts,
    [PROJECT_USER_TYPES.USER]: UserProductsLoader,
    [PROJECT_USER_TYPES.STUDENT]: StudentProducts,
  }[type];

  const renderDetails = () =>
    tab &&
    {
      [ProjectTabs.INTRODUCTION]: <Introduction introduction={introduction} />,
      [ProjectTabs.PRODUCTS]: <Products assignedAt={assignedAt} />,
      [ProjectTabs.CHECK_INS]: (
        <CheckInProvider
          checkInGroups={checkInGroups}
          checkInQuestions={checkInQuestions}
          projectIsAssigned={!isEmpty(assignedAt)}
          team={team}>
          <CheckIns type={type} />
        </CheckInProvider>
      ),
      [ProjectTabs.RESOURCES]: (
        <>
          {isEmpty(teachingResources) && isEmpty(studentResources) && (
            <EmptyState
              className='p-base xxxl:p-md'
              heading={t('project.emptyState.noResources')}
            />
          )}
          {teachingResources && <TeachingResources teachingResources={teachingResources} />}
          {studentResources && <StudentResources studentResources={studentResources} />}
        </>
      ),
      [ProjectTabs.STANDARDS]: <Standards standardSets={standardSets} />,
      [ProjectTabs.DEFINED_CAREERS]: <DefinedCareersConnectionTab courses={courses} type={type} />,
    }[tab.id];

  return <section className='user-project__details'>{renderDetails()}</section>;
}

export default ProjectDetails;
