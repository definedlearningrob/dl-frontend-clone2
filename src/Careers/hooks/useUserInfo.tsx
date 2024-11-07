import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useApolloClient, useLazyQuery } from '@apollo/client';

import studentInfoQuery, {
  TStudentInfo,
  TStudentInfoData,
} from '@dc/graphql/student/queries/userInfo';
import userInfoQuery, { TUserInfo, TUserInfoData } from '@dc/graphql/user/queries/userInfo';
import { impersonateAction, logoutAction } from '@dc/redux/session/actions';
import { ROLES } from '@dc/resources/constants';
import { SessionState } from '@dc/redux/session/reducer';

type TContextState = THookState & {
  setState: Dispatch<SetStateAction<THookState>>;
  pollInterval: number;
  setPollInterval: (interval: number) => void;
};

type THookState = {
  userInfo: TUserInfo | TStudentInfo | null;
  loading: boolean;
};
const UserInfoContext = createContext({} as TContextState);

type Props = { value?: { userInfo: TUserInfo | TStudentInfo }; children: ReactNode };

// eslint-disable-next-line no-undef
const defaultPollInterval = import.meta.env.VITE_POLLING_INTERVAL as any as number;

export function UserInfoProvider({ value, children }: Props) {
  const [pollInterval, setPollInterval] = useState(defaultPollInterval);
  const [{ userInfo, loading }, setState] = useState<THookState>({
    userInfo: value ? value.userInfo : null,
    loading: true,
  });

  return (
    <UserInfoContext.Provider
      value={{ userInfo, loading, pollInterval, setPollInterval, setState, ...value }}>
      {children}
    </UserInfoContext.Provider>
  );
}

function useUserInfo<T extends TUserInfo | TStudentInfo>() {
  const { loading, setState, userInfo, pollInterval, setPollInterval } =
    useContext(UserInfoContext);

  const { user } = useSelector(({ session }: { session: SessionState }) => session);
  const query = user?.type === 'student' ? studentInfoQuery : userInfoQuery;
  const dispatch = useDispatch();
  const client = useApolloClient();

  const [queryUser] = useLazyQuery<TUserInfoData | TStudentInfoData>(query, {
    // eslint-disable-next-line no-undef
    pollInterval,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (user && !userInfo) {
      // this variables are wrong, only to force refetch of userinfo
      queryUser({ variables: { username: user.username } }).then((response) => {
        if (response.data) {
          setState({ userInfo: response.data.userInfo, loading: false });
        }
      });
    }
  }, [user]);

  const [refreshUser] = useLazyQuery<TUserInfoData | TStudentInfoData>(query, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => setState({ userInfo: data.userInfo, loading: false }),
  });

  const logout = async () => {
    setState({ userInfo: null, loading: false });
    dispatch(logoutAction());

    await client.clearStore();
  };

  const impersonateStart = async (userType: 'User' | 'Student', studentUuid: string) => {
    setState({ userInfo: null, loading: true });
    await dispatch(impersonateAction('start', userType, studentUuid));
    await client.clearStore();
  };

  const impersonateStop = async () => {
    setState({ userInfo: null, loading: true });
    await dispatch(impersonateAction('stop'));
    await client.clearStore();
  };

  const stopPolling = () => setPollInterval(86400000);
  const startPolling = (interval = defaultPollInterval) => setPollInterval(interval);

  const isSelf = (uuid: string) => uuid === userInfo?.uuid;

  return {
    loading,
    isSelf,
    refreshUser,
    isSystemAdminUser: getRole(userInfo) === ROLES.SYSTEM_ADMIN,
    userInfo: userInfo as T,
    logout,
    impersonateStart,
    startPolling,
    impersonateStop,
    stopPolling,
  };
}

export const getRole = (userInfo: TUserInfo | TStudentInfo | null) => {
  if (!userInfo) return undefined;

  if ('role' in userInfo) {
    return userInfo.role;
  }

  return undefined;
};

export default useUserInfo;
