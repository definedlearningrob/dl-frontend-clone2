export type Track = {
  id: string;
  shortDescription: string | null;
  thumbnailUrl: string;
  imageUrl: string;
  grades: string[];
  resourcesCount?: number;
  tasksCount?: number;
} & ({ displayName: string } | { name: string });

export type Catalog = {
  id: string;
  description: string | null;
  thumbnailUrl: string;
  imageUrl: string;
  tracks: Track[];
} & ({ displayName: string } | { name: string });
