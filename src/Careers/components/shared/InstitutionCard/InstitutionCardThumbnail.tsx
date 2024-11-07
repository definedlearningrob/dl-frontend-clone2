import defaultThumbnail from '@shared/assets/images/institution-fallback-image.jpeg';
import SharedImage from '@shared/components/Image/Image';

import styles from './InstitutionCard.module.sass';

type Props = {
  thumbnailUrl: string | null;
  alt: string;
};

export const InstitutionCardThumbnail = ({ thumbnailUrl, alt }: Props) => (
  <SharedImage
    alt={alt}
    className={styles.image}
    fallbackSrc={defaultThumbnail}
    src={thumbnailUrl || defaultThumbnail}
  />
);
