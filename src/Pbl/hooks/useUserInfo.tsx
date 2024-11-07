import { useReducer, createContext, useContext, Dispatch, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useApolloClient, useLazyQuery, useQuery } from '@apollo/client';
import { useUpdateEffect } from 'react-use';

import { impersonateAction } from '@pbl/redux/session/actions';
import studentInfoQuery, {
  TStudentInfo,
  TStudentInfoData,
} from '@pbl/graphql/student/queries/userInfo';
import userInfoQuery, { TUserInfoData } from '@pbl/graphql/user/queries/userInfo';
import { logoutAction } from '@pbl/redux/session/actions';
import { Roles } from '@pbl/resources/enums';
import { SessionState } from '@pbl/redux/session/reducer';
import { TUserInfo } from '@pbl/graphql/user/queries/userInfo';

type TContextState = THookState & {
  setState: Dispatch<THookState>;
};

type THookState = {
  userInfo: TUserInfo | TStudentInfo | null;
  loading: boolean;
};

const UserInfoContext = createContext({} as TContextState);

const userReducer = (currentState: THookState, newState: THookState) => ({
  ...currentState,
  ...newState,
});

type Props = { value?: Object; children: ReactNode };

export function UserInfoProvider({ value, children }: Props) {
  const [{ userInfo, loading }, setState] = useReducer(userReducer, {
    userInfo: null,
    loading: true,
  });

  return (
    <UserInfoContext.Provider value={{ userInfo, loading, setState, ...value }}>
      {children}
    </UserInfoContext.Provider>
  );
}

function useUserInfo<T extends TUserInfo | TStudentInfo>() {
  const { loading, setState, userInfo } = useContext(UserInfoContext);
  const { user } = useSelector(({ session }: { session: SessionState }) => session);
  const query = user?.type === 'student' ? studentInfoQuery : userInfoQuery;
  const setUserInfo = (data: TUserInfo | TStudentInfo | null) =>
    setState({ userInfo: data, loading: false });
  const dispatch = useDispatch();
  const client = useApolloClient();

  const setLoading = (loading: boolean) => setState({ userInfo, loading });

  const onCompletedQuery = (userInfo: TUserInfo | TStudentInfo) => {
    if ('role' in userInfo) {
      const isSystemAdmin = userInfo?.role === Roles.SYSTEM_ADMIN;
      const newUserInfo = {
        ...userInfo,
        isSystemAdmin,
      };

      setUserInfo(newUserInfo);
    } else {
      setUserInfo(userInfo);
    }
  };

  const { data, loading: userInfoLoading } = useQuery<TUserInfoData | TStudentInfoData>(query, {
    // this variables are wrong, only to force refetch of userinfo
    variables: { username: user?.username },
    skip: !user,
    notifyOnNetworkStatusChange: true,
  });

  useUpdateEffect(() => {
    if (data) {
      onCompletedQuery(data.userInfo);
    }
  }, [userInfoLoading]);

  const [refreshUser] = useLazyQuery<TUserInfoData | TStudentInfoData>(query, {
    onCompleted: ({ userInfo }) => onCompletedQuery(userInfo),
    fetchPolicy: 'network-only',
  });

  const logout = async () => {
    dispatch(logoutAction());
    setUserInfo(null);

    await client.clearStore();
  };

  const impersonateStart = async (studentUuid: string) => {
    setUserInfo(null);
    setLoading(true);
    await dispatch(impersonateAction('start', studentUuid));
    await client.clearStore();
  };

  const impersonateStop = async () => {
    setUserInfo(null);
    setLoading(true);
    await dispatch(impersonateAction('stop'));
    await client.clearStore();
  };

  return {
    loading,
    refreshUser,
    userInfo: userInfo as T,
    impersonateStart,
    impersonateStop,
    logout,
  };
}

export const getOptionalRole = (userInfo: TUserInfo | TStudentInfo | null) => {
  if (!userInfo) return undefined;

  if ('role' in userInfo) {
    return userInfo.role;
  }

  return undefined;
};

export default useUserInfo;
