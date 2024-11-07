import { ReactNode, createContext, useContext, useState } from 'react';

import { schoolYearsOptions } from '@shared/utils/schoolYear';

import useUserInfo from './useUserInfo';

type ReportsContext = {
  reportStartYear: number;
  setReportStartYear: (year: number) => void;
};

const ReportProviderContext = createContext({} as ReportsContext);

type Props = {
  children: ReactNode;
};

export function ReportsProvider({ children }: Props) {
  const { userInfo } = useUserInfo();

  const [reportStartYear, setReportStartYear] = useState(() => {
    const currentSchoolYear = schoolYearsOptions.find(
      (item) => item.value === userInfo?.currentSchoolYear
    );

    return currentSchoolYear?.value || schoolYearsOptions[0].value;
  });

  return (
    <ReportProviderContext.Provider
      value={{
        reportStartYear,
        setReportStartYear,
      }}>
      {children}
    </ReportProviderContext.Provider>
  );
}

export const useReports = () => {
  const { reportStartYear, setReportStartYear } = useContext(ReportProviderContext);

  return {
    reportStartYear,
    setReportStartYear,
  };
};
