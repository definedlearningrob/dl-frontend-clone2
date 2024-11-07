import { useEffect } from 'react';

import { extractImgTags, extractUuid } from '@shared/utils/editor';

type THookProps = {
  observable: string;
  oldValues: string[];
  updateStateFn: (newValue: string[]) => void;
};

/* We are adding all new images that appeared during editing of intruducion in order to remove those ones
     that are not presented in the final saving payload/input.
*/

const useImageUpdate = ({ observable, oldValues, updateStateFn }: THookProps) => {
  useEffect(() => {
    const allImageUuidsFromCurrentValue = Array.from(extractImgTags(observable)).map((image) =>
      extractUuid(image)
    );

    const newImageUuidsThatAppeared = allImageUuidsFromCurrentValue.filter(
      (uuid) => !oldValues.includes(uuid)
    );

    updateStateFn([...oldValues, ...newImageUuidsThatAppeared]);
  }, [observable]);
};

export default useImageUpdate;
