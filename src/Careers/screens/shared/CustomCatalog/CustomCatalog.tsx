import { useCustomCatalogQuery } from '@graphql/dc/shared/hooks';
import { useEffect } from 'react';

import { Catalog } from '@shared/components/Catalog';
import { MainContent } from '@shared/components/MainContent/MainContent';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

export const CustomCatalog = () => {
  const { setBackNavButton } = useNavigation();
  const { data, loading } = useCustomCatalogQuery();

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  return (
    <MainContent>
      <Catalog catalog={data?.careersCatalog} isLoading={loading} />
    </MainContent>
  );
};
