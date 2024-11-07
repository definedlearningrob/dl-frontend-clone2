import { Catalog } from '@graphql/dl/users/types';

export const normalizeCatalogData = (catalog: Catalog) => ({
  ...catalog,
  tracks: catalog.tracks.nodes,
});
