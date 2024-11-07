import cx from 'classnames';

import type {
  TTaskPresentationLink,
  TTaskPresentationSlide,
} from '@dc/graphql/user/queries/taskPresentation';

import SharedButton from '@shared/components/Button/Button';

import TextItem from '../../Shared/TextItem/Basic/Basic';

import Image from './Image/Image';
import styles from './Preview.module.sass';

type Props = {
  slide: TTaskPresentationSlide;
  handleSelectSlideContent?: (object: { id: string; type: string }) => void;
  slides?: TTaskPresentationSlide[];
};

function AdminTasksPresentationBuilderTemplate2ProductChoicePreview({
  slide: { content },
  slides,
}: Props) {
  const [
    mainTitle,
    firstProductTitle,
    secondProductTitle,
    thirdProductTitle,
    firstProductDescription,
    secondProductDescription,
    thirdProductDescription,
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

  const indexOfFirstLinkSlide = flattenSlides?.findIndex(
    (slide) => slide.id === firstLink?.targetId
  );
  const indexOfSecondLinkSlide = flattenSlides?.findIndex(
    (slide) => slide.id === secondLink?.targetId
  );
  const indexOfThirdLinkSlide = flattenSlides?.findIndex(
    (slide) => slide.id === thirdLink?.targetId
  );
  const titleClasses = cx(styles.title, 'titleContainer');

  return (
    <main className={styles.products}>
      <div className={titleClasses}>
        <TextItem item={mainTitle} />
      </div>
      <TextItem item={firstProductTitle} />
      <TextItem item={secondProductTitle} />
      <TextItem item={thirdProductTitle} />
      <Image content={content} imageContentId='1' />
      <Image content={content} imageContentId='2' />
      <Image content={content} imageContentId='3' />
      <div className={styles.description}>
        <TextItem item={firstProductDescription} space='sixth' />
      </div>
      <div className={styles.description}>
        <TextItem item={secondProductDescription} space='sixth' />
      </div>
      <div className={styles.description}>
        <TextItem item={thirdProductDescription} space='sixth' />
      </div>
      {firstLink && isValidIndex(indexOfFirstLinkSlide) && (
        <a href={`#/${indexOfFirstLinkSlide}`}>
          <SharedButton variant='primary'>{firstLink.text}</SharedButton>
        </a>
      )}
      {secondLink && isValidIndex(indexOfSecondLinkSlide) && (
        <a href={`#/${indexOfSecondLinkSlide}`}>
          <SharedButton variant='primary'>{secondLink.text}</SharedButton>
        </a>
      )}
      {thirdLink && isValidIndex(indexOfThirdLinkSlide) && (
        <a href={`#/${indexOfThirdLinkSlide}`}>
          <SharedButton variant='primary'>{thirdLink.text}</SharedButton>
        </a>
      )}
    </main>
  );
}

export default AdminTasksPresentationBuilderTemplate2ProductChoicePreview;
