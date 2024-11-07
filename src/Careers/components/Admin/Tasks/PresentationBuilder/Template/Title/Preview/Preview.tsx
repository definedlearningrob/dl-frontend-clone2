import cx from 'classnames';

import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';

import TextItem from '../../Shared/TextItem/Basic/Basic';
import Links from '../../Shared/LinksSection/Preview/Preview';

import styles from './Preview.module.sass';

type Props = {
  slide: TTaskPresentationSlide;
  handleSelectSlideContent?: (object: { id: string; type: string }) => void;
  slides: TTaskPresentationSlide[];
};

function AdminTasksPresentationBuilderTemplateTitlePreview({ slide: { content }, slides }: Props) {
  const [titleText] = content.texts;
  const titleClassNames = cx('titleContainer', styles.titleContainer);
  const slideContentClassNames = cx(styles.slideContent, styles[titleText.style]);

  return (
    <div className={slideContentClassNames}>
      <div>
        <div className={titleClassNames}>
          <TextItem key={titleText.contentId} item={titleText} />
        </div>
        <div className={styles.links}>
          <Links links={content.links} slides={slides} />
        </div>
      </div>
    </div>
  );
}

export default AdminTasksPresentationBuilderTemplateTitlePreview;
