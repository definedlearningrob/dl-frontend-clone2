import { differenceBy, isEmpty, size } from 'lodash-es';
import { InputActionMeta } from 'react-select';

type ValuesTypes = {
  value: string;
  label: string;
};

export const noChangesInForm = (
  source: Array<ValuesTypes>,
  target: Array<ValuesTypes>,
  iteratee: string
): boolean => size(source) === size(target) && isEmpty(differenceBy(source, target, iteratee));

export const onInputChange = (
  value: string,
  action: InputActionMeta,
  setter: (value: string) => void
) => {
  if (action.action === 'input-change') {
    setter(value);
  }
};

export const fetchMoreResults = async ({
  currentPage,
  fetchMore,
  pagesCount = 0,
  searchName,
  setCurrentPage,
}: {
  currentPage: number;
  fetchMore: (variables: any) => void;
  pagesCount?: number;
  searchName: string;
  setCurrentPage: (value: number) => void;
}) => {
  const hasNextPage = pagesCount > currentPage;
  const newPage = ++currentPage;

  if (!hasNextPage) return;

  await setCurrentPage(newPage);

  await fetchMore({
    variables: {
      filter: { displayNameCont: searchName },
      page: currentPage,
      infiniteScroll: true,
    },
  });
};
