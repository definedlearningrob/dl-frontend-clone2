import { isEmpty } from 'lodash-es';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { TaskResourcesDocument } from '@graphql/shared/shared/hooks';

import StudentResources from '@pbl/components/Project/StudentResources/StudentResources';
import TeachingResources from '@pbl/components/User/Project/TeachingResources/TeachingResources';
import { ProjectFiles } from '@pbl/components/Project/Files/Files';
import usePublicProjectQuery from '@pbl/graphql/public/hooks/usePublicProjectQuery';
import { TRootState } from '@pbl/redux/reducers';

import SharedModal from '@shared/components/Modal/Modal';
import EmptyState from '@shared/components/EmptyState/EmptyState';
import { useRole } from '@shared/hooks/useRole';
import { Tabs } from '@shared/components/Tabs/Tabs';
import Card from '@shared/components/Card/Card';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { handleError } from '@shared/utils/handleError';
import useQueryParams from '@shared/hooks/useQueryParams';

type Props = {
  isOpen: boolean;
  projectId?: string;
  taskId?: string;
  onDismiss: () => void;
};
type Tab = {
  tabId: string;
  label: string;
};

export const ResourcesModal = ({ isOpen, projectId, taskId, onDismiss }: Props) => {
  const { t } = useTranslation();
  const { isStudent } = useRole();
  const { projectId: shareId, targetRole } = useParams<{ projectId: string; targetRole: string }>();
  const { user } = useSelector((state: TRootState) => state.session);
  const {
    params: { code },
  } = useQueryParams<{ code: string }>();

  const correctId = taskId || projectId;
  const correctQuery =
    !isEmpty(shareId) && !isEmpty(code) && !user
      ? usePublicProjectQuery(shareId, code)
      : useQuery(TaskResourcesDocument, {
          variables: { id: correctId },
        });

  const { data, error, loading } = correctQuery;

  if (loading) {
    return (
      <SharedModal isOpen={isOpen} onDismiss={onDismiss}>
        <div className='h-[theme(layout.containerHeight)] flex justify-center'>
          <SharedLoadingSpinner size='small' />
        </div>
      </SharedModal>
    );
  }

  if (error) {
    handleError(error);

    return null;
  }

  if (!data) {
    return null;
  }

  const task = data.task || data.project;

  const shouldShowProjectFiles = !isEmpty(task.files);

  const tabs = [
    {
      ...(!isEmpty(task.studentResources) && {
        tabId: 'studentResources',
        label: t('project.studentResources'),
      }),
    },
    {
      ...(!isEmpty(task.teachingResources) &&
        !(isStudent || targetRole === 'student') && {
          tabId: 'teachingResources',
          label: t('user.project.teachingResources'),
        }),
    },
    {
      ...(shouldShowProjectFiles && {
        tabId: 'files',
        label: t('project.filesDownloads'),
      }),
    },
  ].filter((tab) => !isEmpty(tab)) as Tab[];

  const noContent =
    isEmpty(task.teachingResources) && isEmpty(task.studentResources) && isEmpty(task.files);

  return (
    <SharedModal isOpen={isOpen} onDismiss={onDismiss}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('common.fields.common.resources')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body className='[&>*]:max-h-full [&>*]:flex [&>*]:flex-col resources-modal'>
        {noContent ? (
          <EmptyState className='p-base xxxl:p-md' heading={t('project.emptyState.noResources')} />
        ) : (
          <Tabs defaultTabId={tabs[0]?.tabId}>
            <Tabs.List tabs={tabs} withPadding={true} withQueryParams={false} />
            <Card className='flex-1 overflow-y-auto p-0' withoutPadding={true}>
              {tabs.map((tab) => (
                <Tabs.Content key={tab.tabId} tabId={tab.tabId}>
                  <div>
                    {tab.tabId === 'studentResources' && task.studentResources && (
                      <StudentResources studentResources={task.studentResources} />
                    )}
                    {tab.tabId === 'teachingResources' && task.teachingResources && (
                      <TeachingResources teachingResources={task.teachingResources} />
                    )}
                    {tab.tabId === 'files' && shouldShowProjectFiles && (
                      <ProjectFiles files={task.files} isEditing={false} />
                    )}
                  </div>
                </Tabs.Content>
              ))}
            </Card>
          </Tabs>
        )}
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary' onClick={onDismiss}>
          {t('common.actions.close')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
