import cx from 'classnames';

import { PostSecondaryContent } from '@dc/components/PostSecondary';
import MainContent from '@dc/shared/MainContent/MainContent';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';
import useUserInfo from '@dc/hooks/useUserInfo';

import styles from './PostSecondary.module.sass';

export const PostSecondary = () => {
  const { userInfo } = useUserInfo<TStudentInfo>();

  const applicationsEnabled = userInfo.postSecondaryApplicationsEnabled;

  const mainContentClassName = cx(styles.mainContent, {
    [styles.limitedHeight]: applicationsEnabled,
  });

  return (
    <MainContent className={mainContentClassName}>
      <PostSecondaryContent applicationsEnabled={applicationsEnabled} />
    </MainContent>
  );
};
