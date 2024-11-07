import { useMutation } from '@apollo/client';

import UPDATE_ENTITY_SETTINGS, {
  TSchoolYearStartDate,
  TUpdateEntitySettingsData,
  TUpdateEntitySettingsVariables,
} from '@shared/graphql/user/mutations/updateSchoolYearStartDate';

export const useUpdateSchoolYearStartDateMutation = () => {
  const [mutate, { loading, error }] = useMutation<
    TUpdateEntitySettingsData,
    TUpdateEntitySettingsVariables
  >(UPDATE_ENTITY_SETTINGS);

  const updateSchoolYearStartDate = (uuid: string, schoolYearStartDate: TSchoolYearStartDate) => {
    mutate({
      variables: {
        input: {
          uuid,
          settings: {
            schoolYearStartDate,
          },
        },
      },
      update(cache) {
        cache.modify({
          id: cache.identify({ uuid: uuid, __typename: 'Entity' }),
          fields: {
            settings(cachedSettings) {
              return {
                ...cachedSettings,
                schoolYearStartDate,
              };
            },
          },
        });
        cache.modify({
          id: cache.identify({ uuid: uuid, __typename: 'EntityData' }),
          fields: {
            settings(cachedSettings) {
              return {
                ...cachedSettings,
                schoolYearStartDate,
              };
            },
          },
        });
      },
    });
  };

  return [updateSchoolYearStartDate, { loading, error }] as const;
};
