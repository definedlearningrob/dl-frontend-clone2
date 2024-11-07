import { ReactComponent as Placeholder } from '@dc/images/card-placeholder.svg';

import defaultThumbnail from '@shared/assets/images/default-thumbnail.svg';
import SharedImage from '@shared/components/Image/Image';

import styles from './LessonCard.module.sass';

type Props = {
  imageUrl?: string;
  alt: string;
};

export const LessonCardImage = ({ imageUrl, alt }: Props) => {
  if (imageUrl) {
    return (
      <SharedImage
        alt={alt}
        className={styles.image}
        fallbackSrc={defaultThumbnail}
        src={imageUrl}
      />
    );
  }

  return <Placeholder className={styles.defaultImage} />;
};
