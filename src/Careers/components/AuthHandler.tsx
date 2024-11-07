import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import { authorizeAction } from '@dc/redux/session/actions';
import useUserInfo from '@dc/hooks/useUserInfo';

import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

type Props = { type: 'user' | 'student' };

function AuthHandler({ type }: Props) {
  const { search } = useLocation();
  const { logout, userInfo } = useUserInfo();
  const history = useHistory();
  const dispatch = useDispatch();
  const params = new URLSearchParams(search);
  const authToken = params.get('code');

  useEffect(() => {
    if (userInfo && !authToken) {
      logout();
    }

    const authorize = async () => {
      if (authToken) {
        await dispatch(authorizeAction(authToken, type));
      }

      history.replace(params.get('post_auth') || '/');
    };

    authorize();
  }, [authToken, type, dispatch, history]);

  return <SharedLoadingSpinner size='full-screen' />;
}

export default memo(AuthHandler);
