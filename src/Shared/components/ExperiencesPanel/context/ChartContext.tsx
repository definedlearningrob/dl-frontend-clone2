import React, { createContext, useCallback, useContext, useState, useMemo, ReactNode } from 'react';
import { isNull, sumBy } from 'lodash-es';
import { useParams } from 'react-router-dom';

import { TCareerExperience } from '@shared/graphql/student/query/careerExperiences';
import { useCareerExperienceQuery } from '@shared/graphql/shared/hooks/useCareerExperienceQuery';
import { TSubmissions } from '@shared/graphql/student/query/careerExperience';

type HoverSource = null | 'chart' | 'legend';

type ChartContextType = {
  hoveredIndex: null | number;
  selectedIndex: null | number;
  hoverSource: HoverSource;
  setHoveredIndex: React.Dispatch<React.SetStateAction<null | number>>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<null | number>>;
  setHoverSource: React.Dispatch<React.SetStateAction<HoverSource>>;
  activeElement: TCareerExperience | null;
  chartValue?: number;
  toggleSelectedElement: (index: number) => void;
  hasActiveCell: boolean;
  isActiveCell: (index: number) => void;
  data: TCareerExperience[];
  singleExperienceData?: TSubmissions;
  experienceLoading: boolean;
};

type Props = {
  children: ReactNode;
  data: TCareerExperience[];
  isStudent?: boolean;
};

const ChartContext = createContext({} as ChartContextType);

export const ChartProvider = ({ children, data, isStudent = false }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const [hoverSource, setHoverSource] = useState<HoverSource>(null);
  const { uuid } = useParams<{ uuid: string }>();
  const [fetchExperience, { data: singleExperienceData, loading: experienceLoading }] =
    useCareerExperienceQuery({ isStudent });

  const hasActiveCell = !isNull(hoveredIndex) || !isNull(selectedIndex);
  const activeIndex = selectedIndex ?? hoveredIndex;

  const activeElement = useMemo(() => {
    if (!hasActiveCell) {
      return null;
    }

    return data[activeIndex!];
  }, [hasActiveCell, activeIndex]);

  const chartValue = useMemo(() => {
    if (!hasActiveCell) {
      return sumBy(data, 'submissionsCount');
    }
    if (!activeElement) {
      return;
    }

    return activeElement!.submissionsCount;
  }, [activeElement, hasActiveCell]);

  const toggleSelectedElement = useCallback(
    (index) => {
      const isSelecting = selectedIndex !== index;
      setSelectedIndex(isSelecting ? index : null);

      if (isSelecting) {
        fetchExperience({ variables: { id: data[index].clusterId, uuid } });
      }
    },
    [selectedIndex]
  );

  const isActiveCell = useCallback(
    (index) => hasActiveCell && activeIndex === index,
    [activeIndex, hasActiveCell]
  );

  return (
    <ChartContext.Provider
      value={{
        hoverSource,
        singleExperienceData,
        experienceLoading,
        setHoverSource,
        data,
        hoveredIndex,
        setHoveredIndex,
        activeElement,
        chartValue,
        toggleSelectedElement,
        hasActiveCell,
        isActiveCell,
        selectedIndex,
        setSelectedIndex,
      }}>
      {children}
    </ChartContext.Provider>
  );
};

export const useChartContext = () => useContext(ChartContext);
