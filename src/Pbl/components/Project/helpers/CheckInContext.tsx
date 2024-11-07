import { isEmpty, sortBy } from 'lodash-es';
import React, { useCallback, useContext, useMemo, useRef } from 'react';

import { TCheckInQuestion, TCheckInGroup } from '@pbl/components/Project/types';
import { TTeam } from '@pbl/graphql/student/fragments/projectFragment';

export type CheckInContextType = {
  addToItemsRef: (element: HTMLDivElement) => void;
  allQuestions: TCheckInQuestion[];
  allVisibleQuestions: TCheckInQuestion[];
  projectIsAssigned: boolean;
  checkInGroups?: TCheckInGroup[];
  checkInQuestions?: TCheckInQuestion[];
  handleScrollTo: (index: number) => void;
  allCheckInItems: (TCheckInGroup | TCheckInQuestion)[];
  team?: TTeam;
};

const CheckInContext = React.createContext({} as CheckInContextType);

type Props = {
  projectIsAssigned: boolean;
  children: React.ReactNode;
  checkInGroups?: TCheckInGroup[];
  checkInQuestions?: TCheckInQuestion[];
  team?: TTeam;
};

export const CheckInProvider = ({
  children,
  checkInGroups,
  checkInQuestions,
  team,
  projectIsAssigned,
}: Props) => {
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const allCheckInItems = useMemo(() => {
    const filteredCheckInGroups =
      checkInGroups?.filter((checkInGroup) => !isEmpty(checkInGroup.questions)) ?? [];

    return sortBy([...filteredCheckInGroups, ...(checkInQuestions || [])], 'step');
  }, [checkInGroups, checkInQuestions]);

  const allQuestions = useMemo(
    () =>
      allCheckInItems.flatMap((checkIn) => ('questions' in checkIn ? checkIn.questions : checkIn)),
    [allCheckInItems]
  );

  const allVisibleQuestions = useMemo(
    () => allQuestions.filter((question) => !question.isHidden),
    [allQuestions]
  );

  const handleScrollTo = useCallback((index: number) => {
    const elementPosition = index - 1;

    itemsRef.current[elementPosition].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  const addToItemsRef = useCallback((element: HTMLDivElement) => {
    if (element && element !== null && !itemsRef.current.includes(element)) {
      itemsRef.current.push(element);
    }
  }, []);

  return (
    <CheckInContext.Provider
      value={{
        projectIsAssigned,
        addToItemsRef,
        allQuestions,
        allVisibleQuestions,
        handleScrollTo,
        checkInGroups,
        checkInQuestions,
        allCheckInItems,
        team,
      }}>
      {children}
    </CheckInContext.Provider>
  );
};

export const useCheckIns = () => useContext(CheckInContext);
