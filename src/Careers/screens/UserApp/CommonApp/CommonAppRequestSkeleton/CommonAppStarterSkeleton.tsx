import cx from 'classnames';

import commonApp from '@dc/images/CommonAppLg.svg';

import SharedImage from '@shared/components/Image/Image';
import Card from '@shared/components/Card/Card';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

import styles from './CommonAppStarterSkeleton.module.sass';

const contentCard = cx(styles.contentCard, 'm-base');

export const CommonAppStarterSkeleton = () => (
  <Card className={contentCard}>
    <div className='flex flex-col'>
      <div className='flex mb-base justify-center'>
        <SharedImage src={commonApp} />
      </div>
      <div className='flex flex-col'>
        <div className='flex w-full justify-center pb-base'>
          <SkeletonRectangle height='extra-small' radius='sm' size='lg' />
        </div>
        <div className='flex w-full justify-center pb-base'>
          <SkeletonRectangle height='extra-small' radius='sm' size='lg' />
        </div>
        <div className='flex basis-1/2 justify-center'>
          <SkeletonRectangle height='big' radius='sm' size='lg' />
        </div>
      </div>
    </div>
  </Card>
);
