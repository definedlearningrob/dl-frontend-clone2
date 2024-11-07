import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';

import Links from '../../Shared/LinksSection/Preview/Preview';
import TextItem from '../../Shared/TextItem/Basic/Basic';

import styles from './Preview.module.sass';

type Props = {
  slide: TTaskPresentationSlide;
  handleSelectSlideContent: (object: { id: string; type: string } | null) => void;
  slides: TTaskPresentationSlide[];
};

function AdminTasksPresentationBuilderTemplateBasicTextPreview({
  slide: { content },
  slides,
}: Props) {
  const [header, description] = content.texts;

  return (
    <div>
      <div className='titleContainer'>
        <TextItem item={header} />
      </div>
      <div className={styles.descriptionWrapper}>
        <TextItem item={description} />
      </div>
      <div className={styles.links}>
        <Links links={content.links} slides={slides} />
      </div>
    </div>
  );
}

export default AdminTasksPresentationBuilderTemplateBasicTextPreview;
