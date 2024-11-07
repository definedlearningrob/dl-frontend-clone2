export type Project = {
  description: string;
  displayName: string;
  id: string;
  imageUrl: string;
  step: number;
  thumbnailUrl: string;
};

export type Lesson = {
  description: string;
  displayName: string;
  id: string;
  imageUrl: string;
  projects: Project[];
  step: number;
  thumbnailUrl: string;
};
