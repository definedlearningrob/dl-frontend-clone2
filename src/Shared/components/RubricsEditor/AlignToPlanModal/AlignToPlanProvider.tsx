import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import {
  TPlan,
  TPlansData,
  TPlanStatement,
} from '@dc/graphql/user/queries/plansWithAlignmentStatement';

type Props = {
  children: ReactNode;
  headingId: string;
};

export type Statement = {
  planName: string;
  groupName: string;
  statement: TPlanStatement;
};

type AlignToPlanFiltersContextType = {
  data?: TPlansData;
  setKeyword: (value: string) => void;
  isDisabledAlignButton: boolean;
  setData: (value: TPlansData) => void;
  setIsDisabledAlignButton: (value: boolean) => void;
  headingId: string;
  setHeadingId?: (value: string) => void;
  currentFilters: {
    nameCont?: string;
  };
};

const initialFiltersState = {
  nameCont: '',
};

const initialPlansState = {
  plans: {
    nodesCount: 0,
    pagesCount: 0,
    nodes: [] as TPlan[],
    rubricHeadingId: '',
    headingId: '',
  },
};

const AlignToPlanFiltersContext = createContext<AlignToPlanFiltersContextType>({
  data: initialPlansState,
  isDisabledAlignButton: true,
  headingId: '',
  setData: () => {},
  setKeyword: () => {},
  setIsDisabledAlignButton: () => {},
  setHeadingId: () => {},
  currentFilters: initialFiltersState,
});

export const AlignToPlanProvider = ({ children, headingId }: Props) => {
  const [nameCont, setNameCont] = useState('');
  const [data, setData] = useState<TPlansData>(initialPlansState);
  const [isDisabledAlignButton, setIsDisabledAlignButton] = useState(true);
  const value = useMemo(
    () => ({
      data,
      isDisabledAlignButton,
      headingId,
      setData,
      setIsDisabledAlignButton,
      setKeyword: setNameCont,
      currentFilters: {
        nameCont,
      },
    }),
    [nameCont, data, isDisabledAlignButton, headingId]
  );

  return (
    <AlignToPlanFiltersContext.Provider value={value}>
      {children}
    </AlignToPlanFiltersContext.Provider>
  );
};

export const useAlignToPlan = () => {
  const context = useContext(AlignToPlanFiltersContext);

  if (!context) {
    throw new Error('useAlignToPlanFilters must be used within a AlignToPlanProvider');
  }

  return context;
};
