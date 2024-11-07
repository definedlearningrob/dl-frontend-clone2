import cx from 'classnames';

import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';

import TextItem from '../../Shared/TextItem/Interactive/Interactive';
import Links from '../../Shared/LinksSection/Editor/Editor';

import styles from './Editor.module.sass';

type Props = {
  slide: TTaskPresentationSlide;
  handleSelectSlideContent: (object: { id: string; type: string } | null) => void;
  slides?: TTaskPresentationSlide[];
};

function AdminTasksPresentationBuilderTemplateTitleEditor({
  slide: { content },
  handleSelectSlideContent,
}: Props) {
  const [titleText] = content.texts;
  const titleClassNames = cx('titleContainer', styles.titleContainer);
  const slideContentClassNames = cx(styles.slideContent, styles[titleText.style]);

  return (
    <div className={slideContentClassNames}>
      <div>
        <div className={titleClassNames}>
          <TextItem
            key={titleText.contentId}
            className={styles.titleTextContainer}
            handleSelectSlideContent={handleSelectSlideContent}
            item={titleText}
          />
        </div>
        <div className={styles.links}>
          <Links handleSelectSlideContent={handleSelectSlideContent} links={content.links} />
        </div>
      </div>
    </div>
  );
}

export default AdminTasksPresentationBuilderTemplateTitleEditor;
