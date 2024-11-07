import SM from 'react-horizontal-scrolling-menu';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import EmptyPlaceholder from '@shared/components/EmptyData/EmptyPlaceholder';
import { ReactComponent as TeamIcon } from '@shared/svg/team.svg';
import { cx } from '@shared/utils/cx';

import { CarouselArrow } from './Arrow/Arrow';
import styles from './Carousel.module.sass';

//@ts-ignore
const ScrollMenu = SM.default ? SM.default : SM;

type SharedCarouselProps = {
  className?: string;
  data?: ReactElement[];
  emptyPlaceholder?: ReactElement;
  backgroundColor?: 'white' | 'neutral';
};

const SharedCarousel = ({
  data,
  emptyPlaceholder,
  backgroundColor = 'neutral',
  className,
}: SharedCarouselProps) => {
  const { t } = useTranslation();

  if (isEmpty(data)) {
    return (
      emptyPlaceholder || (
        <EmptyPlaceholder icon={<TeamIcon />} text={t('components.carousel.empty')} />
      )
    );
  }

  const isBackgroundNeutral = backgroundColor === 'neutral';

  return (
    <div className={cx(styles.list, className)}>
      <ScrollMenu
        alignCenter={false}
        arrowLeft={
          <div
            className={cx('left-arrow relative h-full flex items-center', styles.leftArrowWrapper, {
              [styles.neutralBackgroundLeft]: isBackgroundNeutral,
              [styles.whiteBackgroundLeft]: !isBackgroundNeutral,
            })}>
            <CarouselArrow direction='left' />
          </div>
        }
        arrowRight={
          <div
            className={cx(
              'right-arrow relative h-full flex items-center',
              styles.rightArrowWrapper,
              {
                [styles.neutralBackgroundRight]: isBackgroundNeutral,
                [styles.whiteBackgroundRight]: !isBackgroundNeutral,
              }
            )}>
            <CarouselArrow direction='right' />
          </div>
        }
        data={data}
        dragging={false}
        hideSingleArrow={true}
        wheel={false}
      />
    </div>
  );
};

export default SharedCarousel;
