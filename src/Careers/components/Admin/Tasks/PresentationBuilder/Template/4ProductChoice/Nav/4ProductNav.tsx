import cx from 'classnames';

import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';

import SharedButton from '@shared/components/Button/Button';

import TextItem from '../../Shared/TextItem/Basic/Basic';

import Image from './4ProductNavImage';
import styles from './Nav.module.sass';

type Props = {
  slide: TTaskPresentationSlide;
  slides?: TTaskPresentationSlide[];
  handleSelectSlideContent?: (object: { id: string; type: string }) => void;
};

function AdminTasksPresentationBuilderTemplate4ProductChoiceNav({ slide: { content } }: Props) {
  const [
    mainTitle,
    firstProductDescription,
    secondProductDescription,
    thirdProductDescription,
    fourthProductDescription,
  ] = content.texts;
  const [firstLink, secondLink, thirdLink, fourthLink] = content.links;
  const textClasses = cx(styles.textWrapper, styles.alignLeft, styles.noMargin);

  return (
    <main>
      <div className='titleContainer'>
        <TextItem item={mainTitle} />
      </div>

      <div className={styles.flex}>
        <Image content={content} imageContentId='1' />
        <div className={styles.contentWrapper}>
          <div className={styles.description}>
            <TextItem className={textClasses} item={firstProductDescription} />
          </div>
        </div>
        {firstLink && (
          <SharedButton className={styles.button} variant='primary'>
            {firstLink.text}
          </SharedButton>
        )}
      </div>

      <div className={styles.flex}>
        <Image content={content} imageContentId='2' />
        <div className={styles.contentWrapper}>
          <div className={styles.description}>
            <TextItem className={textClasses} item={secondProductDescription} />
          </div>
        </div>
        {secondLink && (
          <SharedButton className={styles.button} variant='primary'>
            {firstLink.text}
          </SharedButton>
        )}
      </div>

      <div className={styles.flex}>
        <Image content={content} imageContentId='3' />
        <div className={styles.contentWrapper}>
          <div className={styles.description}>
            <TextItem className={textClasses} item={thirdProductDescription} />
          </div>
        </div>
        {thirdLink && (
          <SharedButton className={styles.button} variant='primary'>
            {thirdLink.text}
          </SharedButton>
        )}
      </div>

      <div className={styles.flex}>
        <Image content={content} imageContentId='4' />
        <div className={styles.contentWrapper}>
          <div className={styles.description}>
            <TextItem className={textClasses} item={fourthProductDescription} />
          </div>
        </div>
        {fourthLink && (
          <SharedButton className={styles.button} variant='primary'>
            {fourthLink.text}
          </SharedButton>
        )}
      </div>
    </main>
  );
}

export default AdminTasksPresentationBuilderTemplate4ProductChoiceNav;
