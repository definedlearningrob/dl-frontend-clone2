import { CatalogCard } from './CatalogCard';
import { TrackList } from './TrackList';

import type { Catalog as CatalogType } from './types';

type Props = {
  catalog: CatalogType | undefined | null;
  isLoading?: boolean;
};

export const Catalog = ({ catalog, isLoading }: Props) => (
  <div className='flex flex-col gap-base'>
    <CatalogCard catalog={catalog} isLoading={isLoading} />
    <TrackList isLoading={isLoading} tracks={catalog?.tracks} />
  </div>
);
