import cx from 'classnames';
import { useRef } from 'react';

import type {
  TTaskPresentationLink,
  TTaskPresentationSlide,
} from '@dc/graphql/user/queries/taskPresentation';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import SharedButton from '@shared/components/Button/Button';

import TextItem from '../../Shared/TextItem/Interactive/Interactive';

import Image from './Image/Image';
import styles from './Editor.module.sass';

type Props = {
  slide: TTaskPresentationSlide;
  handleSelectSlideContent: (object: { id: string; type: string } | null) => void;
  slides?: TTaskPresentationSlide[];
};

function AdminTasksPresentationBuilderTemplate3ProductChoiceEditor({
  slide: { content },
  handleSelectSlideContent,
}: Props) {
  const { selectedSlideContent, isOnDark, dispatchOverflowingItems } = usePresentationBuilder();
  const product1TextWrapper = useRef<HTMLDivElement | null>(null);
  const product2TextWrapper = useRef<HTMLDivElement | null>(null);
  const product3TextWrapper = useRef<HTMLDivElement | null>(null);

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

  const firstLink = getLink('1');
  const secondLink = getLink('2');
  const thirdLink = getLink('3');

  const handleSelectLink = (id: string) => () => handleSelectSlideContent({ type: 'link', id });

  const checkIfSelected = (id: string, type: string) =>
    selectedSlideContent?.type === type && selectedSlideContent?.id === id;

  const linkClasses = cx({
    [styles.onDark]: isOnDark,
  });

  const getLinkWrapperClasses = (id: string) =>
    cx(styles.btnWrapper, {
      [styles.selectedOnLight]: checkIfSelected(id, 'link') && !isOnDark,
      [styles.selectedOnDark]: checkIfSelected(id, 'link') && isOnDark,
    });

  const handleOverflowStateChange = (id: '5' | '6' | '7') => (overflowing: boolean) => {
    dispatchOverflowingItems({
      type: 'SET_OVERFLOWING_ITEM',
      payload: {
        [id]: overflowing,
      },
    });
  };

  const titleClasses = cx(styles.title, 'titleContainer');

  return (
    <main className={styles.products}>
      <div className={titleClasses}>
        <TextItem handleSelectSlideContent={handleSelectSlideContent} item={mainTitle} />
      </div>
      <TextItem handleSelectSlideContent={handleSelectSlideContent} item={firstProductTitle} />
      <TextItem handleSelectSlideContent={handleSelectSlideContent} item={secondProductTitle} />
      <TextItem handleSelectSlideContent={handleSelectSlideContent} item={thirdProductTitle} />
      <Image handleSelectSlideContent={handleSelectSlideContent} imageContentId='1' />
      <Image handleSelectSlideContent={handleSelectSlideContent} imageContentId='2' />
      <Image handleSelectSlideContent={handleSelectSlideContent} imageContentId='3' />
      <div ref={product1TextWrapper} className={styles.description}>
        <TextItem
          handleSelectSlideContent={handleSelectSlideContent}
          item={firstProductDescription}
          wrapper={product1TextWrapper}
          onOverflowChange={handleOverflowStateChange('5')}
        />
      </div>
      <div ref={product2TextWrapper} className={styles.description}>
        <TextItem
          handleSelectSlideContent={handleSelectSlideContent}
          item={secondProductDescription}
          wrapper={product2TextWrapper}
          onOverflowChange={handleOverflowStateChange('6')}
        />
      </div>
      <div ref={product3TextWrapper} className={styles.description}>
        <TextItem
          handleSelectSlideContent={handleSelectSlideContent}
          item={thirdProductDescription}
          wrapper={product3TextWrapper}
          onOverflowChange={handleOverflowStateChange('7')}
        />
      </div>
      {firstLink && (
        <div className={getLinkWrapperClasses('1')}>
          <SharedButton
            className={linkClasses}
            variant={isOnDark ? 'primary-outlined' : 'primary'}
            onClick={handleSelectLink('1')}>
            {firstLink.text}
          </SharedButton>
        </div>
      )}
      {secondLink && (
        <div className={getLinkWrapperClasses('2')}>
          <SharedButton
            className={linkClasses}
            variant={isOnDark ? 'primary-outlined' : 'primary'}
            onClick={handleSelectLink('2')}>
            {secondLink.text}
          </SharedButton>
        </div>
      )}
      {thirdLink && (
        <div className={getLinkWrapperClasses('3')}>
          <SharedButton
            className={linkClasses}
            variant={isOnDark ? 'primary-outlined' : 'primary'}
            onClick={handleSelectLink('3')}>
            {thirdLink.text}
          </SharedButton>
        </div>
      )}
    </main>
  );
}

export default AdminTasksPresentationBuilderTemplate3ProductChoiceEditor;
