import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';

import TextItem from '../../Shared/TextItem/Basic/Basic';
import Links from '../../Shared/LinksSection/Nav/Nav';

import styles from './Nav.module.sass';

type Props = {
  slide: TTaskPresentationSlide;
  handleSelectSlideContent?: (object: { id: string; type: string }) => void;
  slides?: TTaskPresentationSlide[];
};

function AdminTasksPresentationBuilderTemplateBasicTextNav({ slide: { content } }: Props) {
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
        <Links links={content.links} />
      </div>
    </div>
  );
}

export default AdminTasksPresentationBuilderTemplateBasicTextNav;
