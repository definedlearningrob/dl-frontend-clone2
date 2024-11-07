import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { PostSecondary } from '@dc/screens/StudentApp/PostSecondary/PostSecondary';
import { PostSecondaryResults } from '@dc/screens/StudentApp/PostSecondaryResults/PostSecondaryResults';
import { Institution } from '@dc/screens/shared/Institution';
import { PostSecondaryApplicationManagement } from '@dc/screens/StudentApp/PostSecondaryApplicationManagement/PostSecondaryApplicationManagement';
import { InstitutionFiltersProvider } from '@dc/shared/InstitutionFiltersProvider';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';

import { useFeatureFlags } from '@shared/components/FeatureProvider';

export const PostSecondaryRoutes = () => {
  const { path } = useRouteMatch();

  const { POST_SECONDARY_ON } = useFeatureFlags();

  const { userInfo } = useUserInfo<TStudentInfo>();

  if (!POST_SECONDARY_ON) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <InstitutionFiltersProvider
        postSecondaryApplicationsEnabled={userInfo.postSecondaryApplicationsEnabled}>
        <Switch>
          <Route component={PostSecondary} exact={true} path={path} />
          <Route component={PostSecondaryResults} exact={true} path={`${path}/search`} />
        </Switch>
      </InstitutionFiltersProvider>
      <Switch>
        <Route
          exact={true}
          path={`${path}/institutions/:id`}
          render={() => <Institution isTeacher={false} />}
        />
        <Route
          component={PostSecondaryApplicationManagement}
          exact={true}
          path={`${path}/manage-applications`}
        />
      </Switch>
    </>
  );
};
