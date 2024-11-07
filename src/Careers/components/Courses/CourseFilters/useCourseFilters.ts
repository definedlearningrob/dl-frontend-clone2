import { CourseTypes } from '@graphql/dc/users/types';

import { useFilters } from '@shared/components/FilterProvider/FilterProvider';

type CourseFilters = {
  collectionIdIn?: string[];
  pathwayIdIn: string[];
  typeEq?: CourseTypes;
  searchableColumnsCont: string;
};

export const useCourseFilters = () => useFilters<CourseFilters>();
