import { useRef } from 'react';

import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import Links from '../../Shared/LinksSection/Editor/Editor';
import TextItem from '../../Shared/TextItem/Interactive/Interactive';

import styles from './Editor.module.sass';

type Props = {
  slide: TTaskPresentationSlide;
  handleSelectSlideContent: (object: { id: string; type: string } | null) => void;
  slides?: TTaskPresentationSlide[];
};

function AdminTasksPresentationBuilderTemplateBasicText({
  slide: { content },
  handleSelectSlideContent,
}: Props) {
  const { dispatchOverflowingItems } = usePresentationBuilder();
  const wrapper = useRef<HTMLDivElement | null>(null);
  const [header, description] = content.texts;

  const setTextOverflowing = (isOverflowing: boolean) =>
    dispatchOverflowingItems({
      type: 'SET_OVERFLOWING_ITEM',
      payload: { 2: isOverflowing },
    });

  return (
    <div>
      <div className='titleContainer'>
        <TextItem handleSelectSlideContent={handleSelectSlideContent} item={header} />
      </div>
      <div ref={wrapper} className={styles.descriptionWrapper}>
        <TextItem
          handleSelectSlideContent={handleSelectSlideContent}
          item={description}
          percentageBreakpoint={105}
          wrapper={wrapper}
          onOverflowChange={setTextOverflowing}
        />
      </div>
      <div className={styles.links}>
        <Links handleSelectSlideContent={handleSelectSlideContent} links={content.links} />
      </div>
    </div>
  );
}

export default AdminTasksPresentationBuilderTemplateBasicText;
