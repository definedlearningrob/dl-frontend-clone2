import cx from 'classnames';

import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';

import SharedButton from '@shared/components/Button/Button';

import TextItem from '../../Shared/TextItem/Basic/Basic';

import Image from './Image/Image';
import styles from './Nav.module.sass';

type Props = {
  slide: TTaskPresentationSlide;
  slides?: TTaskPresentationSlide[];
  handleSelectSlideContent?: (object: { id: string; type: string }) => void;
};

function AdminTasksPresentationBuilderTemplate3ProductChoiceNav({ slide: { content } }: Props) {
  const [
    mainTitle,
    firstProductTitle,
    secondProductTitle,
    thirdProductTitle,
    firstProductDescription,
    secondProductDescription,
    thirdProductDescription,
  ] = content.texts;
  const [firstLink, secondLink, thirdLink] = content.links;
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
        <TextItem item={firstProductDescription} />
      </div>
      <div className={styles.description}>
        <TextItem item={secondProductDescription} />
      </div>
      <div className={styles.description}>
        <TextItem item={thirdProductDescription} />
      </div>
      {firstLink && <SharedButton variant='primary'>{firstLink.text}</SharedButton>}
      {secondLink && <SharedButton variant='primary'>{firstLink.text}</SharedButton>}
      {thirdLink && <SharedButton variant='primary'>{thirdLink.text}</SharedButton>}
    </main>
  );
}

export default AdminTasksPresentationBuilderTemplate3ProductChoiceNav;
