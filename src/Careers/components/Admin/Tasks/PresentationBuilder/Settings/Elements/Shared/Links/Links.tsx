import { useTranslation } from 'react-i18next';

import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';
import type { TTaskPresentationLink } from '@dc/graphql/user/queries/taskPresentation';

import { ReactComponent as LinkIcon } from '@shared/svg/link.svg';
import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';

import Link from '../Link/Link';

import styles from './Links.module.sass';

type Props = {
  links: TTaskPresentationLink[];
  shouldShowElement: (object: { type: string; id: string }) => boolean;
};

function AdminTasksPresentationBuilderSettingsElementsLinks({ links, shouldShowElement }: Props) {
  const { handleUpdateSlide, selectedSlideContent, setSelectedSlideContent } =
    usePresentationBuilder();
  const { t } = useTranslation();

  const handleAddLink = async () => {
    const firstLinkId = links[0]?.contentId;
    const newLinkContentId = firstLinkId === '2' || !firstLinkId ? '1' : '2';

    const newLinks = [
      ...links.map(({ targetName, targetId, contentId, text }: TTaskPresentationLink) => ({
        targetName,
        targetId,
        contentId,
        text,
      })),
      {
        targetName: '',
        targetId: '',
        contentId: newLinkContentId,
        text: 'Enter text',
      },
    ];

    handleUpdateSlide(null, { links: newLinks });
  };

  const handleRemoveLink = async (contentId: string) => {
    const linksWithoutRemoving = links.filter(
      (link: TTaskPresentationLink) => !(link.contentId === contentId)
    );

    const newLinks = linksWithoutRemoving.map(
      ({ targetName, targetId, contentId, text }: TTaskPresentationLink) => ({
        targetName,
        targetId,
        contentId,
        text,
      })
    );

    handleUpdateSlide(null, { links: newLinks });
    selectedSlideContent && setSelectedSlideContent(null);
  };

  const firstLink = links.find((link: TTaskPresentationLink) => link.contentId === '1');
  const secondLink = links.find((link: TTaskPresentationLink) => link.contentId === '2');

  return (
    <div className='flex flex-col gap-xs pt-xs'>
      {shouldShowElement({ type: 'link', id: '1' }) && firstLink && (
        <Link contentId='1' onRemove={handleRemoveLink} />
      )}
      {shouldShowElement({ type: 'link', id: '2' }) && secondLink && (
        <Link contentId='2' onRemove={handleRemoveLink} />
      )}
      {links.length < 2 && !selectedSlideContent && (
        <SharedButton size='sm' variant='primary-outlined' onClick={handleAddLink}>
          <div className={styles.btnContent}>
            <SharedIcon icon={<LinkIcon />} size='sm' />
            {t('admin.tasks.presentation.addLink')}
          </div>
        </SharedButton>
      )}
    </div>
  );
}

export default AdminTasksPresentationBuilderSettingsElementsLinks;
