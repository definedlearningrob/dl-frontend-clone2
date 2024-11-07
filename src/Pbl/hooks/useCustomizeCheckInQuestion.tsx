import { createContext, ReactNode, useContext, useState } from 'react';

import useUserInfo from '@pbl/hooks/useUserInfo';
import { type TUserInfo } from '@pbl/graphql/user/queries/userInfo';
import { type TCheckInQuestion } from '@pbl/components/Project/types';

type TContextProps = {
  editCheckInQuestionMode: boolean;
  editedCheckInQuestionId: string | null;
  isCheckInQuestionOwner: boolean;
  questionIndex: number;
  toggleEditCheckInQuestionMode: () => void;
  turnOffEditCheckInQuestionMode: () => void;
};

const CustomizeCheckInQuestionContext = createContext<TContextProps>({
  editCheckInQuestionMode: false,
  editedCheckInQuestionId: null,
  isCheckInQuestionOwner: false,
  questionIndex: 1,
  toggleEditCheckInQuestionMode: () => {},
  turnOffEditCheckInQuestionMode: () => {},
});

type TProviderProps = {
  checkInQuestion?: TCheckInQuestion;
  children: ReactNode;
};

export function CustomizeCheckInQuestionProvider({ checkInQuestion, children }: TProviderProps) {
  const { userInfo } = useUserInfo<TUserInfo>();
  const [editCheckInQuestionMode, setEditCheckInQuestionMode] = useState(false);
  const isCheckInQuestionOwner = checkInQuestion?.owner?.uuid === userInfo?.uuid;
  const editedCheckInQuestionId = checkInQuestion?.id || null;
  const questionIndex = checkInQuestion?.questionIndex || 1;

  const turnOffEditCheckInQuestionMode = () => setEditCheckInQuestionMode(false);
  const toggleEditCheckInQuestionMode = () =>
    setEditCheckInQuestionMode((checkInQuestionMode) => !checkInQuestionMode);

  return (
    <CustomizeCheckInQuestionContext.Provider
      value={{
        editCheckInQuestionMode,
        editedCheckInQuestionId,
        isCheckInQuestionOwner,
        questionIndex,
        toggleEditCheckInQuestionMode,
        turnOffEditCheckInQuestionMode,
      }}>
      {children}
    </CustomizeCheckInQuestionContext.Provider>
  );
}

export const useCustomizeCheckInQuestion = () => useContext(CustomizeCheckInQuestionContext);

export default useCustomizeCheckInQuestion;
