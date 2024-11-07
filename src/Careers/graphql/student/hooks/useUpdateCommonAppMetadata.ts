import { useMutation } from '@apollo/client';

import UPDATE_COMMON_APP_METADATA, {
  TUpdateCommonAppMetadataData,
  TUpdateCommonAppMetadataVariables,
} from '@dc/graphql/student/mutations/updateCommonAppMetadata';

type Params = {
  applicantId: number;
};

export const useUpdateCommonAppMetadata = () => {
  const [mutate, { loading, error }] = useMutation<
    TUpdateCommonAppMetadataData,
    TUpdateCommonAppMetadataVariables
  >(UPDATE_COMMON_APP_METADATA);

  const updateCommonAppMetadata = async ({ applicantId }: Params) => {
    await mutate({
      variables: {
        input: {
          commonAppMetadataAttributes: {
            applicantId,
          },
        },
      },
    });
  };

  return [updateCommonAppMetadata, { loading, error }] as const;
};
