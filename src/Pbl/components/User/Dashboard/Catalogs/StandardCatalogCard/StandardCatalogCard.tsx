import React from 'react';

import { TCatalog } from '@pbl/graphql/user/queries/dashboardCatalog';

import Card from '../Card/Card';

type Props = {
  isSingleCard: boolean;
  catalog: TCatalog;
  selectedCatalogData: TCatalog;
  setSelectedCatalogData: React.Dispatch<React.SetStateAction<TCatalog>>;
};

function UserDashboardStandardCatalogsCard({
  catalog,
  selectedCatalogData,
  setSelectedCatalogData,
  isSingleCard,
}: Props) {
  const { displayName, id, courses, tasksCount, tracksCount } = catalog;
  const handleCatalogSelection = () => {
    setSelectedCatalogData(catalog);
  };

  return (
    <Card
      coursesCount={courses?.nodesCount}
      displayName={displayName}
      id={id}
      isSingleCard={isSingleCard}
      projectsCount={courses?.nodesCount}
      selectedCatalogData={selectedCatalogData}
      tasksCount={tasksCount}
      tracksCount={tracksCount}
      onClick={handleCatalogSelection}
    />
  );
}

export default UserDashboardStandardCatalogsCard;
