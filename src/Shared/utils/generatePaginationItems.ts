export type PaginationItem = number | '...';

export const generatePaginationItems = (pagesCount: number, currentPage: number) => {
  if (pagesCount === 0) {
    return [];
  }

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  const currentPageIndex = currentPage - 1;
  const shouldAddBeginningDots = currentPageIndex > 2;
  const shouldAddEndDots = currentPageIndex < pages.length - 4;
  const beginningIndexSlice = currentPageIndex === 0 ? 0 : currentPageIndex - 1;

  const arrayWithNeededNumbers = [
    1,
    ...pages.slice(beginningIndexSlice, currentPageIndex + 3),
    pages.length,
  ];
  const withRemovedDuplicates = [
    ...Array.from(new Set(arrayWithNeededNumbers)),
  ] as PaginationItem[];

  if (shouldAddBeginningDots) {
    withRemovedDuplicates.splice(1, 0, '...');
  }

  if (shouldAddEndDots) {
    withRemovedDuplicates.splice(withRemovedDuplicates.length - 1, 0, '...');
  }

  return withRemovedDuplicates;
};
