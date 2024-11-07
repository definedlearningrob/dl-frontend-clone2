import cx from 'classnames';

import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import SharedButton from '@shared/components/Button/Button';

import TextItem from '../../Shared/TextItem/Basic/Basic';

import Image from './5ProductNavImage';
import styles from './Nav.module.sass';

type Props = {
  slide: TTaskPresentationSlide;
  slides?: TTaskPresentationSlide[];
  handleSelectSlideContent?: (object: { id: string; type: string }) => void;
};

function FiveProductNav({ slide: { content } }: Props) {
  const [
    mainTitle,
    firstProductDescription,
    secondProductDescription,
    thirdProductDescription,
    fourthProductDescription,
    fifthProductDescription,
  ] = content.texts;
  const { isOnDark } = usePresentationBuilder();
  const [firstLink, secondLink, thirdLink, fourthLink, fifthLink] = content.links;
  const titleClasses = cx(styles.title, 'titleContainer');
  const textClasses = cx(styles.textWrapper, styles.alignLeft, styles.noMargin);
  const linkClasses = cx(styles.button, {
    [styles.onDark]: isOnDark,
  });

  return (
    <main className={styles.products}>
      <div className={titleClasses}>
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
          <SharedButton className={linkClasses} variant={isOnDark ? 'primary-outlined' : 'primary'}>
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
          <SharedButton className={linkClasses} variant={isOnDark ? 'primary-outlined' : 'primary'}>
            {secondLink.text}
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
          <SharedButton className={linkClasses} variant={isOnDark ? 'primary-outlined' : 'primary'}>
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
          <SharedButton className={linkClasses} variant={isOnDark ? 'primary-outlined' : 'primary'}>
            {fourthLink.text}
          </SharedButton>
        )}
      </div>

      <div className={styles.flex}>
        <Image content={content} imageContentId='5' />
        <div className={styles.contentWrapper}>
          <div className={styles.description}>
            <TextItem className={textClasses} item={fifthProductDescription} />
          </div>
        </div>
        {fifthLink && (
          <SharedButton className={linkClasses} variant={isOnDark ? 'primary-outlined' : 'primary'}>
            {fifthLink.text}
          </SharedButton>
        )}
      </div>
    </main>
  );
}

export default FiveProductNav;
