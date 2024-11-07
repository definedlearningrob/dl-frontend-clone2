import useProjectInfoForCheckinGrade from '@pbl/graphql/user/hooks/useProjectInfoForCheckinGrade';
import useProjectInfoForProductGrade from '@pbl/graphql/user/hooks/useProjectInfoForProductGrade';
import { GRADING_ITEM_TYPES } from '@pbl/resources/enums';

const useProjectInfo = (projectId: string, itemId: string, itemType: GRADING_ITEM_TYPES) => {
  const {
    data: checkinData,
    loading: checkinLoading,
    error: checkinError,
  } = useProjectInfoForCheckinGrade(projectId, itemId, itemType === GRADING_ITEM_TYPES.PRODUCT);

  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useProjectInfoForProductGrade(
    projectId,
    itemId,
    itemType === GRADING_ITEM_TYPES.CHECK_IN_QUESTION
  );

  return {
    data: checkinData || productData,
    loading: checkinLoading || productLoading,
    error: checkinError || productError,
  };
};

export default useProjectInfo;
