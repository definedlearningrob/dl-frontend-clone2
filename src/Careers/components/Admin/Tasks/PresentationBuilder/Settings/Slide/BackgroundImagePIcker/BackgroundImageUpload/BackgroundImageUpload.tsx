import { useState } from 'react';

import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import DroppableArea from '@shared/components/DropableArea/DropableArea';

import styles from './BackgroundImageUpload.module.sass';

function BackgroundImageUpload() {
  const { currentSlide, handleSlideBackgroundImageUpload } = usePresentationBuilder();
  const [isLoading, setIsLoading] = useState(false);
  const backgroundImage = currentSlide?.backgroundImage;

  const handleOnDrop = async (passedFiles: File[]) => {
    const [passedFile] = passedFiles;
    const replacedFileName = passedFile.name.replace(/_|(?:\.(?![^.]+$)|[^\w.])+/g, '');

    const newFileToUpload = new File(passedFiles, replacedFileName, {
      lastModified: passedFile.lastModified,
      type: passedFile.type,
    });

    if (newFileToUpload) {
      setIsLoading(true);
      await handleSlideBackgroundImageUpload(newFileToUpload);
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.dropImageWrapper}>
      <DroppableArea
        accept='.jpg, .jpeg'
        assetType='image'
        dropText='admin.tasks.presentation.uploadImage'
        isLoading={isLoading}
        multiple={false}
        //@ts-ignore 👀 no clue
        value={backgroundImage ?? []}
        onDrop={handleOnDrop}
      />
    </section>
  );
}

export default BackgroundImageUpload;
