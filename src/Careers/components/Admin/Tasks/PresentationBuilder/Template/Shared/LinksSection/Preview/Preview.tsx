import type {
  TTaskPresentationLink,
  TTaskPresentationSlide,
} from '@dc/graphql/user/queries/taskPresentation';

import SharedButton from '@shared/components/Button/Button';

import styles from './Preview.module.sass';

type Props = {
  slides: TTaskPresentationSlide[];
  links: TTaskPresentationLink[];
};

function AdminTasksPresentationBuilderTemplateSharedLinksSectionPreview({ slides, links }: Props) {
  const getLink = (id: string) =>
    links.find((link: TTaskPresentationLink) => link.contentId === id);

  const flattenSlides = slides.reduce(
    (acc: TTaskPresentationSlide[], slide: TTaskPresentationSlide) => [
      ...acc,
      slide,
      ...slide.subslides,
    ],
    []
  );

  const isValidIndex = (index: number) => index !== -1;

  const firstLink = getLink('1');
  const secondLink = getLink('2');

  const indexOfFirstLinkSlide = flattenSlides?.findIndex(
    (slide) => slide.id === firstLink?.targetId
  );
  const indexOfSecondLinkSlide = flattenSlides?.findIndex(
    (slide) => slide.id === secondLink?.targetId
  );

  return (
    <div className={styles.container}>
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
    </div>
  );
}

export default AdminTasksPresentationBuilderTemplateSharedLinksSectionPreview;
