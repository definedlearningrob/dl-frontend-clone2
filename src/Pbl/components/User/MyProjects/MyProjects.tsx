import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { useTaskTemplates } from '@pbl/graphql/user/hooks/useTaskTemplates';
import { NewCustomizedProject } from '@pbl/components/User/Project/NewCustomizedProject/NewCustomizedProject';
import UserAssignedProjectsList from '@pbl/components/User/MyProjects/List/AssignedList/AssignedList';
import UserCustomizedProjectsList from '@pbl/components/User/MyProjects/List/CustomizedList/CustomizedList';
import { ArchivedProjectsList } from '@pbl/components/User/MyProjects/List/ArchivedProjectsList/ArchivedProjectsList';

import SharedCard from '@shared/components/Card/Card';
import SharedButton from '@shared/components/Button/Button';
import { ReactComponent as AddIcon } from '@shared/assets/icons/add.svg';
import { useToggle } from '@shared/hooks/useToggle';
import { Tabs } from '@shared/components/Tabs/Tabs';

import { MyProjectTabs } from './Tabs/Tabs';

const UserMyProjects = () => {
  const { t } = useTranslation();
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useToggle(false);
  const { data } = useTaskTemplates();

  const tabs = useMemo(
    () =>
      Object.values(MyProjectTabs).map((tab) => ({
        label: t(`user.myProjects.${tab}`),
        tabId: tab,
      })),
    [MyProjectTabs]
  );

  if (!data) return null;

  return (
    <SharedCard className='flex flex-col bg-white relative h-full' withoutPadding={true}>
      <Tabs className='flex flex-col min-h-0' defaultTabId={MyProjectTabs.CUSTOMIZED_PROJECTS}>
        <SharedCard.Header withPadding={true}>
          <div className='grow'>
            <div className='flex justify-between pb-xs items-center mb-sm'>
              <SharedCard.Title>{t('user.myProjects.projects')}</SharedCard.Title>
              {!isEmpty(data.taskTemplates) && (
                <SharedButton
                  Icon={AddIcon}
                  size='sm'
                  type='button'
                  variant='primary'
                  onClick={setIsCustomizeModalOpen}>
                  {t('user.myProjects.createNewProject')}
                </SharedButton>
              )}
            </div>
            <Tabs.List fullWidth={true} tabs={tabs} withPadding={false} />
          </div>
        </SharedCard.Header>

        <SharedCard.Body className='min-h-0'>
          <Tabs.Content tabId={MyProjectTabs.ASSIGNED_PROJECTS}>
            <div className='min-h-0'>
              <UserAssignedProjectsList />
            </div>
          </Tabs.Content>
          <Tabs.Content tabId={MyProjectTabs.CUSTOMIZED_PROJECTS}>
            <div>
              <UserCustomizedProjectsList />
            </div>
          </Tabs.Content>
          <Tabs.Content tabId={MyProjectTabs.ARCHIVED_PROJECTS}>
            <div>
              <ArchivedProjectsList />
            </div>
          </Tabs.Content>
        </SharedCard.Body>
      </Tabs>

      {isCustomizeModalOpen && (
        <NewCustomizedProject
          isOpen={isCustomizeModalOpen}
          tasks={data}
          onDismiss={setIsCustomizeModalOpen}
        />
      )}
    </SharedCard>
  );
};

export default UserMyProjects;
