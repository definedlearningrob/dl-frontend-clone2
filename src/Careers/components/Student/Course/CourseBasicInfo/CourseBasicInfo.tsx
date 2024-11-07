import cx from 'classnames';

import { InjectedContent } from '@shared/components/IncjectedContent/InjectedContent';

import styles from './CourseBasicInfo.module.sass';

type Props = {
  description: string;
  name: string;
  pathway: {
    name: string;
  };
};

export const CourseBasicInfo = ({ name, pathway, description }: Props) => (
  <>
    {pathway && (
      <div className='flex mb-xs' data-testid='course-pathway-badges'>
        <div className='font-bold text-xxs py-xxs px-xs bg-white whitespace-nowrap rounded-lg radius-lg mb-xs'>
          {pathway.name}
        </div>
      </div>
    )}
    <h3 data-testid='course-heading'>{name}</h3>
    <InjectedContent
      className={cx('text-neutral-700 mb-base', styles.description)}
      content={description}
      dataTestId='course-description'
    />
  </>
);
