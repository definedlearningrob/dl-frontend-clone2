import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { InstitutionSearch } from '@dc/shared/InstitutionSearch';
import { InstitutionFiltersProvider } from '@dc/shared/InstitutionFiltersProvider';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import useUserInfo from '@dc/hooks/useUserInfo';

export const PostSecondaryResults = () => {
  const { userInfo } = useUserInfo<TUserInfo>();

  const hasSomePostSecondaryApplicationsEnabled = userInfo.entities.nodes.some(
    ({ settings }) => settings.postSecondaryApplicationsEnabled
  );

  return (
    <SharedMainContent>
      <InstitutionFiltersProvider
        postSecondaryApplicationsEnabled={hasSomePostSecondaryApplicationsEnabled}>
        <InstitutionSearch isTeacher={true} />
      </InstitutionFiltersProvider>
    </SharedMainContent>
  );
};
