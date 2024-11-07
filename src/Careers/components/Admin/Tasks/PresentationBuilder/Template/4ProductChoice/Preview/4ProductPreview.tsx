import cx from 'classnames';

import type {
  TTaskPresentationLink,
  TTaskPresentationSlide,
} from '@dc/graphql/user/queries/taskPresentation';

import SharedButton from '@shared/components/Button/Button';

import TextItem from '../../Shared/TextItem/Basic/Basic';

import Image from './4ProductPreviewImage';
import styles from './Preview.module.sass';

type Props = {
  slide: TTaskPresentationSlide;
  handleSelectSlideContent?: (object: { id: string; type: string }) => void;
  slides?: TTaskPresentationSlide[];
};

function AdminTasksPresentationBuilderTemplate4ProductChoicePreview({
  slide: { content },
  slides,
}: Props) {
  const [
    mainTitle,
    firstProductDescription,
    secondProductDescription,
    thirdProductDescription,
    fourthProductDescription,
  ] = content.texts;
  const getLink = (id: string) =>
    content.links.find((link: TTaskPresentationLink) => link.contentId === id);

  const flattenSlides = slides
    ? slides.reduce(
        (acc: TTaskPresentationSlide[], slide: TTaskPresentationSlide) => [
          ...acc,
          slide,
          ...slide.subslides,
        ],
        []
      )
    : [];

  const isValidIndex = (index: number) => index !== -1;

  const firstLink = getLink('1');
  const secondLink = getLink('2');
  const thirdLink = getLink('3');
  const fourthLink = getLink('4');

  const indexOfFirstLinkSlide = flattenSlides?.findIndex(
    (slide) => slide.id === firstLink?.targetId
  );
  const indexOfSecondLinkSlide = flattenSlides?.findIndex(
    (slide) => slide.id === secondLink?.targetId
  );
  const indexOfThirdLinkSlide = flattenSlides?.findIndex(
    (slide) => slide.id === thirdLink?.targetId
  );
  const indexOfFourthLinkSlide = flattenSlides?.findIndex(
    (slide) => slide.id === fourthLink?.targetId
  );

  const textClasses = cx(styles.textWrapper, styles.alignLeft, styles.noMargin);
  const titleClasses = cx(styles.titleWrapper, 'titleContainer');

  return (
    <main>
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
        {firstLink && isValidIndex(indexOfFirstLinkSlide) && (
          <a className={styles.btnWrapper} href={`#/${indexOfFirstLinkSlide}`}>
            <SharedButton variant='primary'>{firstLink.text}</SharedButton>
          </a>
        )}
      </div>

      <div className={styles.flex}>
        <Image content={content} imageContentId='2' />
        <div className={styles.contentWrapper}>
          <div className={styles.description}>
            <TextItem className={textClasses} item={secondProductDescription} />
          </div>
        </div>
        {secondLink && isValidIndex(indexOfSecondLinkSlide) && (
          <a className={styles.btnWrapper} href={`#/${indexOfSecondLinkSlide}`}>
            <SharedButton variant='primary'>{secondLink.text}</SharedButton>
          </a>
        )}
      </div>

      <div className={styles.flex}>
        <Image content={content} imageContentId='3' />
        <div className={styles.contentWrapper}>
          <div className={styles.description}>
            <TextItem className={textClasses} item={thirdProductDescription} />
          </div>
        </div>
        {thirdLink && isValidIndex(indexOfThirdLinkSlide) && (
          <a className={styles.btnWrapper} href={`#/${indexOfThirdLinkSlide}`}>
            <SharedButton variant='primary'>{thirdLink.text}</SharedButton>
          </a>
        )}
      </div>

      <div className={styles.flex}>
        <Image content={content} imageContentId='4' />
        <div className={styles.contentWrapper}>
          <div className={styles.description}>
            <TextItem className={textClasses} item={fourthProductDescription} />
          </div>
        </div>
        {fourthLink && isValidIndex(indexOfFourthLinkSlide) && (
          <a className={styles.btnWrapper} href={`#/${indexOfFourthLinkSlide}`}>
            <SharedButton variant='primary'>{fourthLink.text}</SharedButton>
          </a>
        )}
      </div>
    </main>
  );
}

export default AdminTasksPresentationBuilderTemplate4ProductChoicePreview;
