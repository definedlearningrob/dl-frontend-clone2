import cx from 'classnames';
import { useRef } from 'react';

import type {
  TTaskPresentationLink,
  TTaskPresentationSlide,
} from '@dc/graphql/user/queries/taskPresentation';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import SharedButton from '@shared/components/Button/Button';

import TextItem from '../../Shared/TextItem/Interactive/Interactive';

import Image from './4ProductEditorImage';
import styles from './Editor.module.sass';

type Props = {
  slide: TTaskPresentationSlide;
  handleSelectSlideContent: (object: { id: string; type: string } | null) => void;
  slides?: TTaskPresentationSlide[];
};

function AdminTasksPresentationBuilderTemplate4ProductChoiceEditor({
  slide: { content },
  handleSelectSlideContent,
}: Props) {
  const { selectedSlideContent, isOnDark, dispatchOverflowingItems } = usePresentationBuilder();
  const product1TextWrapper = useRef<HTMLDivElement | null>(null);
  const product2TextWrapper = useRef<HTMLDivElement | null>(null);
  const product3TextWrapper = useRef<HTMLDivElement | null>(null);
  const product4TextWrapper = useRef<HTMLDivElement | null>(null);

  const [
    mainTitle,
    firstProductDescription,
    secondProductDescription,
    thirdProductDescription,
    fourthProductDescription,
  ] = content.texts;
  const getLink = (id: string) =>
    content.links.find((link: TTaskPresentationLink) => link.contentId === id);

  const firstLink = getLink('1');
  const secondLink = getLink('2');
  const thirdLink = getLink('3');
  const fourthLink = getLink('4');

  const handleSelectLink = (id: string) => () => handleSelectSlideContent({ type: 'link', id });

  const checkIfSelected = (id: string, type: string) =>
    selectedSlideContent?.type === type && selectedSlideContent?.id === id;

  const linkClasses = cx(styles.button, {
    [styles.onDark]: isOnDark,
  });

  const getLinkWrapperClasses = (id: string) =>
    cx(styles.btnWrapper, {
      [styles.selectedOnLight]: checkIfSelected(id, 'link') && !isOnDark,
      [styles.selectedOnDark]: checkIfSelected(id, 'link') && isOnDark,
    });

  const handleOverflowStateChange = (id: '6' | '7' | '8' | '9') => (overflowing: boolean) => {
    dispatchOverflowingItems({
      type: 'SET_OVERFLOWING_ITEM',
      payload: {
        [id]: overflowing,
      },
    });
  };
  const titleClasses = cx(styles.title, 'titleContainer');
  const textClasses = cx(styles.textWrapper, styles.alignLeft, styles.noMargin);

  return (
    <main>
      <div className={titleClasses}>
        <TextItem handleSelectSlideContent={handleSelectSlideContent} item={mainTitle} />
      </div>
      <div className={styles.flex}>
        <Image handleSelectSlideContent={handleSelectSlideContent} imageContentId='1' />
        <div className={styles.contentWrapper}>
          <div ref={product1TextWrapper} className={styles.description}>
            <TextItem
              className={textClasses}
              handleSelectSlideContent={handleSelectSlideContent}
              item={firstProductDescription}
              wrapper={product1TextWrapper}
              onOverflowChange={handleOverflowStateChange('6')}
            />
          </div>
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
      </div>
      <div className={styles.flex}>
        <Image handleSelectSlideContent={handleSelectSlideContent} imageContentId='2' />
        <div className={styles.contentWrapper}>
          <div ref={product2TextWrapper} className={styles.description}>
            <TextItem
              className={textClasses}
              handleSelectSlideContent={handleSelectSlideContent}
              item={secondProductDescription}
              wrapper={product2TextWrapper}
              onOverflowChange={handleOverflowStateChange('7')}
            />
          </div>
        </div>
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
      </div>
      <div className={styles.flex}>
        <Image handleSelectSlideContent={handleSelectSlideContent} imageContentId='3' />
        <div className={styles.contentWrapper}>
          <div ref={product3TextWrapper} className={styles.description}>
            <TextItem
              className={textClasses}
              handleSelectSlideContent={handleSelectSlideContent}
              item={thirdProductDescription}
              wrapper={product3TextWrapper}
              onOverflowChange={handleOverflowStateChange('8')}
            />
          </div>
        </div>

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
      </div>
      <div className={styles.flex}>
        <Image handleSelectSlideContent={handleSelectSlideContent} imageContentId='4' />
        <div className={styles.contentWrapper}>
          <div ref={product4TextWrapper} className={styles.description}>
            <TextItem
              className={textClasses}
              handleSelectSlideContent={handleSelectSlideContent}
              item={fourthProductDescription}
              wrapper={product4TextWrapper}
              onOverflowChange={handleOverflowStateChange('9')}
            />
          </div>
        </div>
        {fourthLink && (
          <div className={getLinkWrapperClasses('4')}>
            <SharedButton
              className={linkClasses}
              variant={isOnDark ? 'primary-outlined' : 'primary'}
              onClick={handleSelectLink('4')}>
              {fourthLink.text}
            </SharedButton>
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminTasksPresentationBuilderTemplate4ProductChoiceEditor;
