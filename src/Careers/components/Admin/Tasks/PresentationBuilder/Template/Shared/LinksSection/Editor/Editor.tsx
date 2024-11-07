import cx from 'classnames';

import type {
  TTaskPresentation,
  TTaskPresentationLink,
} from '@dc/graphql/user/queries/taskPresentation';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import SharedButton from '@shared/components/Button/Button';

import styles from './Editor.module.sass';

type Props = {
  links: TTaskPresentationLink[];
  handleSelectSlideContent: (object: { id: string; type: string } | null) => void;
  presentation?: TTaskPresentation;
};

function AdminTasksPresentationBuilderTemplateSharedLinksSectionEditor({
  links,
  handleSelectSlideContent,
}: Props) {
  const { selectedSlideContent, isOnDark } = usePresentationBuilder();
  const getLink = (id: string) =>
    links.find((link: TTaskPresentationLink) => link.contentId === id);

  const firstLink = getLink('1');
  const secondLink = getLink('2');

  const handleSelectLink = (id: string) => () => handleSelectSlideContent({ type: 'link', id });

  const checkIfSelected = (id: string) =>
    selectedSlideContent?.type === 'link' && selectedSlideContent?.id === id;

  const linkClasses = cx({
    [styles.onDark]: isOnDark,
  });

  const getLinkWrapperClasses = (id: string) =>
    cx(styles.btnWrapper, {
      [styles.selectedOnLight]: checkIfSelected(id) && !isOnDark,
      [styles.selectedOnDark]: checkIfSelected(id) && isOnDark,
    });

  return (
    <div className={styles.container}>
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
    </div>
  );
}

export default AdminTasksPresentationBuilderTemplateSharedLinksSectionEditor;
