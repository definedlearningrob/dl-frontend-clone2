import { useTabsContext } from '@shared/components/DeprecatedTabs/DeprecatedTabs';

import { MyProjectTabs } from '../Tabs/Tabs';

import UserCustomizedProjectsList from './CustomizedList/CustomizedList';
import UserAssignedProjectsList from './AssignedList/AssignedList';
import { ArchivedProjectsList } from './ArchivedProjectsList/ArchivedProjectsList';

function UserMyProjectsList() {
  const { tab } = useTabsContext();

  const renderList = () =>
    tab &&
    {
      [MyProjectTabs.ASSIGNED_PROJECTS]: <UserAssignedProjectsList />,
      [MyProjectTabs.CUSTOMIZED_PROJECTS]: <UserCustomizedProjectsList />,
      [MyProjectTabs.ARCHIVED_PROJECTS]: <ArchivedProjectsList />,
    }[tab.id];

  return <>{renderList()}</>;
}

export default UserMyProjectsList;
