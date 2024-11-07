import { useState } from 'react';

import { extractImageUuidsFromHtml } from '@shared/utils/editor';

const useImagesPresence = (initialValue: string) => {
  const initialUuids = extractImageUuidsFromHtml(initialValue);

  const [allImagesUsed, setAllImagesUsed] = useState<string[]>(initialUuids);

  const setImagesUsedWithUuuidExtract = (value: string) => {
    const uuids = extractImageUuidsFromHtml(value);
    setAllImagesUsed(uuids);
  };

  return {
    allImagesUsed,
    setImagesUsedWithUuuidExtract,
    setAllImagesUsed,
  };
};

export default useImagesPresence;
