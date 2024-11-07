import { createContext, ReactNode, useContext, useState } from 'react';

type Standard = {
  label: string;
  uuid: string;
};

type SearchState = {
  selectedSetId: string;
  selectedSubject: string;
  selectedGrade: string;
  selectedStandard: Standard;
};

export type SearchContext = {
  standardsSearchState: SearchState;
  setStandardsSearchState: (state: (prevState: SearchState) => SearchState) => void;
};

const StandardsSearchContext = createContext<SearchContext>({} as SearchContext);

type Props = {
  children: ReactNode;
};

export const StandardsSearchProvider = (props: Props) => {
  const [standardsSearchState, setStandardsSearchState] = useState<SearchState>({
    selectedSetId: '',
    selectedSubject: '',
    selectedGrade: '',
    selectedStandard: { label: '', uuid: '' },
  });

  return (
    <StandardsSearchContext.Provider
      value={{
        standardsSearchState,
        setStandardsSearchState,
      }}>
      {props.children}
    </StandardsSearchContext.Provider>
  );
};

const useStandardSearch = () => useContext(StandardsSearchContext);
export default useStandardSearch;
