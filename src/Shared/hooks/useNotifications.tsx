import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  Dispatch,
} from 'react';

import { TStudentInfo as DCStudentInfo } from '@dc/graphql/student/queries/userInfo';

import { TStudentInfo } from '@pbl/graphql/student/queries/userInfo';

type Props = {
  userInfo: TStudentInfo | DCStudentInfo;
  children: ReactNode;
};

type NotificationsState = {
  announcements: number;
  general: number;
};

type NotificationsContext = {
  unreadNotifications: NotificationsState;
  setUnreadNotifications: Dispatch<SetStateAction<NotificationsState>>;
};

const NotificationsContext = createContext<NotificationsContext>({
  unreadNotifications: { general: 0, announcements: 0 },
} as NotificationsContext);

export const NotificationsProvider = (props: Props) => {
  const { userInfo, children } = props;
  const [unreadNotifications, setUnreadNotifications] = useState<NotificationsState>({
    announcements: 0,
    general: 0,
  });

  useEffect(() => {
    if (userInfo) {
      const isDCStudent = 'unreadAnnouncementsCount' in userInfo;

      setUnreadNotifications({
        announcements: isDCStudent ? userInfo?.unreadAnnouncementsCount : 0,
        general: userInfo?.unreadNotificationsCount,
      });
    }
  }, [userInfo]);

  return (
    <NotificationsContext.Provider value={{ unreadNotifications, setUnreadNotifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};

function useNotifications() {
  const { unreadNotifications, setUnreadNotifications } = useContext(NotificationsContext);

  const setupUnreadNotifications = (field: 'general' | 'announcements', number: number) =>
    setUnreadNotifications((unreadNotificationsState) => ({
      ...unreadNotificationsState,
      [field]: number,
    }));

  return {
    unreadNotifications,
    setUnreadNotifications: setupUnreadNotifications,
  };
}

export default useNotifications;
