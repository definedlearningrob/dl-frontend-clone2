import { useMutation } from '@apollo/client';

import DELETE_PUBLIC_RESOURCES, {
  type TDeletePublicResourcesData,
  type TDeletePublicResourcesVariables,
} from '@shared/graphql/user/mutations/deletePublicResources';
import { ASSET_TYPE } from '@shared/resources/enums';
import { extractImageUuidsFromHtml } from '@shared/utils/editor';

const useDeleteImages = () => {
  const [deleteImages, { loading, error }] = useMutation<
    TDeletePublicResourcesData,
    TDeletePublicResourcesVariables
  >(DELETE_PUBLIC_RESOURCES);

  const deleteImagesFromBucket = async (uuids: string[]) => {
    try {
      await deleteImages({ variables: { input: { uuids, type: ASSET_TYPE.IMAGE } } });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  /* We compare final saving payload images with all of the images that were uploaded during edition
     in order to delete those ones that are not needed.
   */

  const getRemovedImages = (currentValue: string, allPreviousImages: string[]) => {
    const saveValueImageUuids = extractImageUuidsFromHtml(currentValue);
    const imageUuidsToRemove = allPreviousImages.filter(
      (uuid) => !saveValueImageUuids.includes(uuid)
    );

    return imageUuidsToRemove;
  };

  return { deleteImages: deleteImagesFromBucket, getRemovedImages, loading, error };
};
export default useDeleteImages;
