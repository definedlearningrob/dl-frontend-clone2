import { useQuery } from '@apollo/client';

import {
  CHECK_IN_QUESTIONS_LIBRARY,
  TLibraryCheckinsData,
  TLibraryCheckinsVariables,
} from '@pbl/graphql/user/queries/checkInQuestions';

type Params = {
  filter?: {
    questionCont: string;
  };
  perPage?: number;
  page?: number;
  skip?: boolean;
};

const MAX_QUESTIONS_PER_PAGE = 15;

export const useCheckInQuestionsLibraryQuery = ({
  filter,
  perPage = MAX_QUESTIONS_PER_PAGE,
  page = 1,
  skip,
}: Params) =>
  useQuery<TLibraryCheckinsData, TLibraryCheckinsVariables>(CHECK_IN_QUESTIONS_LIBRARY, {
    skip,
    variables: {
      filter,
      page,
      perPage,
    },
  });
