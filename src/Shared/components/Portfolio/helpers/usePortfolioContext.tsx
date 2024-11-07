import { ApolloError } from '@apollo/client';
import { createContext, ReactNode, useContext, useState } from 'react';

import usePortfolioProjectsQuery from '@shared/graphql/student/hooks/usePortfolioProjectsQuery';
import useStudentPortfolioQuery, {
  TPortfolioProjectsData,
} from '@shared/graphql/user/hooks/useStudentPortfolioQuery';
import { PORTFOLIO_PROJECT_TYPES } from '@shared/resources/enums';
import { type TCurrentUserInfo } from '@shared/components/Portfolio/types';
import useQueryParams from '@shared/hooks/useQueryParams';

type Tabs = {
  projectType: PORTFOLIO_PROJECT_TYPES;
  setProjectType: (type: PORTFOLIO_PROJECT_TYPES) => void;
};

type FetchMoreArgs = {
  variables: {
    first?: number;
    after?: string;
  };
};

type PortfolioProjectsPageInfo = {
  endCursor?: string;
};

type PortfolioProjects = {
  error?: ApolloError;
  loading: boolean;
  projects: TPortfolioProjectsData | undefined;
  projectType: PORTFOLIO_PROJECT_TYPES;
  portfolioProjectsPageInfo: PortfolioProjectsPageInfo | undefined;
  fetchMorePortfolioProjects: (args: FetchMoreArgs) => void;
};

type ModifiedPersonalProjectData = {
  isDeleteProjectModalOpen: boolean;
  isUpdateProjectModalOpen: boolean;
  projectId: string | null;
};

type CreatePortfolioProject = {
  setShowCreatePersonalProjectModal: (value: boolean) => void;
  showCreatePersonalProjectModal: boolean;
};

type ModifyPersonalProject = {
  modifyPersonalProjectData: ModifiedPersonalProjectData;
  setModifyPersonalProjectData: (data: ModifiedPersonalProjectData) => void;
};

export type StudentInfo = {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  uuid: string;
};

type PortfolioContextType = {
  createPortfolioProject: CreatePortfolioProject;
  isUser?: boolean;
  studentInfo: StudentInfo;
  modifyPersonalProject: ModifyPersonalProject;
  portfolioProjects: PortfolioProjects;
  tabs: Tabs;
  userInfo: TCurrentUserInfo;
};

type Props = {
  children: ReactNode;
  studentId?: string;
  userInfo: TCurrentUserInfo;
  studentInfo: StudentInfo;
};

const PortfolioContext = createContext<PortfolioContextType>({} as PortfolioContextType);

const PortfolioProvider = ({ children, studentInfo, studentId, userInfo }: Props) => {
  const isUser = !!studentId;
  const [showCreatePersonalProjectModal, setShowCreatePersonalProjectModal] = useState(false);
  const [modifyPersonalProjectData, setModifyPersonalProjectData] =
    useState<ModifiedPersonalProjectData>({
      isDeleteProjectModalOpen: false,
      isUpdateProjectModalOpen: false,
      projectId: null,
    });

  const {
    params: { tabId },
  } = useQueryParams<{ tabId?: PORTFOLIO_PROJECT_TYPES }>();

  const [projectType, setProjectType] = useState<PORTFOLIO_PROJECT_TYPES>(
    tabId || PORTFOLIO_PROJECT_TYPES.CAREERS
  );

  const isResumeTab = projectType === PORTFOLIO_PROJECT_TYPES.RESUME;

  const properPortfolioProjects = studentId
    ? useStudentPortfolioQuery({
        studentUuid: studentId,
        type: projectType,
        first: 10,
        skip: isResumeTab,
      })
    : usePortfolioProjectsQuery({
        type: projectType,
        first: 10,
        skip: isResumeTab,
      });
  // QUERIES
  const {
    fetchMore: fetchMorePortfolioProjects,
    pageInfo: portfolioProjectsPageInfo,
    projects: portfolioProjects,
    loading: portfolioProjectsLoading,
    error: portfolioProjectsError,
  } = properPortfolioProjects;

  return (
    <PortfolioContext.Provider
      value={{
        createPortfolioProject: {
          setShowCreatePersonalProjectModal,
          showCreatePersonalProjectModal,
        },
        modifyPersonalProject: {
          modifyPersonalProjectData,
          setModifyPersonalProjectData,
        },
        portfolioProjects: {
          projects: portfolioProjects,
          loading: portfolioProjectsLoading,
          error: portfolioProjectsError,
          projectType: projectType || PORTFOLIO_PROJECT_TYPES.CAREERS,
          fetchMorePortfolioProjects,
          portfolioProjectsPageInfo,
        },
        tabs: {
          projectType,
          setProjectType,
        },
        isUser,
        userInfo,
        studentInfo,
      }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolioContext = () => useContext(PortfolioContext);

export default PortfolioProvider;
