import CatalogCardContent from '@pbl/components/User/Dashboard/Catalogs/Card/CatalogCardContent';
import { TCatalog } from '@pbl/graphql/user/queries/dashboardCatalog';

type Props = {
  tasksCount?: number;
  tracksCount?: number;
  coursesCount?: number;
  projectsCount?: number;
  displayName?: string;
  id: string;
  selectedCatalogData: TCatalog;
  onClick: () => void;
  isSingleCard?: boolean;
};

const UserDashboardCatalogsCard = ({
  coursesCount,
  projectsCount,
  displayName,
  tasksCount,
  tracksCount,
  id,
  selectedCatalogData,
  onClick,
  isSingleCard,
}: Props) => {
  const primaryCount = isSingleCard ? tracksCount : coursesCount;
  const secondaryCount = isSingleCard ? tasksCount : projectsCount;

  return (
    <CatalogCardContent
      displayName={displayName}
      isActive={id === selectedCatalogData.id}
      primaryCount={primaryCount || 0}
      secondaryCount={secondaryCount || 0}
      onClick={onClick}
    />
  );
};

export default UserDashboardCatalogsCard;
