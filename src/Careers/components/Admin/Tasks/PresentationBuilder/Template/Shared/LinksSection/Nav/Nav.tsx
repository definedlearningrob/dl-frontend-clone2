import type { TTaskPresentationLink } from '@dc/graphql/user/queries/taskPresentation';

import SharedButton from '@shared/components/Button/Button';

import styles from './Nav.module.sass';

type Props = {
  links: TTaskPresentationLink[];
};

function AdminTasksPresentationBuilderTemplateSharedLinksSectionNav({ links }: Props) {
  const getLink = (id: string) =>
    links.find((link: TTaskPresentationLink) => link.contentId === id);

  const firstLink = getLink('1');
  const secondLink = getLink('2');

  return (
    <div className={styles.container}>
      {firstLink && <SharedButton variant='primary'>{firstLink.text}</SharedButton>}
      {secondLink && <SharedButton variant='primary'>{secondLink.text}</SharedButton>}
    </div>
  );
}

export default AdminTasksPresentationBuilderTemplateSharedLinksSectionNav;
