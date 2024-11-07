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

function AdminTasksPresentationBuilderTemplate2ProductChoiceNav({ slide: { content } }: Props) {
  const [
    mainTitle,
    firstProductTitle,
    secondProductTitle,
    firstProductDescription,
    secondProductDescription,
  ] = content.texts;
  const [firstLink, secondLink] = content.links;
  const titleClasses = cx(styles.title, 'titleContainer');

  return (
    <main className={styles.products}>
      <div className={titleClasses}>
        <TextItem item={mainTitle} />
      </div>
      <TextItem item={firstProductTitle} />
      <TextItem item={secondProductTitle} />
      <Image content={content} imageContentId='1' />
      <Image content={content} imageContentId='2' />
      <div className={styles.description}>
        <TextItem item={firstProductDescription} />
      </div>
      <div className={styles.description}>
        <TextItem item={secondProductDescription} />
      </div>
      {firstLink && <SharedButton variant='primary'>{firstLink.text}</SharedButton>}
      {secondLink && <SharedButton variant='primary'>{firstLink.text}</SharedButton>}
    </main>
  );
}

export default AdminTasksPresentationBuilderTemplate2ProductChoiceNav;
