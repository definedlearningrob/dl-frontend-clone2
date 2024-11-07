import { useTranslation } from 'react-i18next';

import { LessonItemCard } from '@dc/components/Student/Lesson/shared/LessonItemCard/LessonItemCard';
import { TResearchLink } from '@dc/components/Student/Lesson/types';

import { ReactComponent as LinkIcon } from '@shared/svg/link.svg';
import SharedButton from '@shared/components/Button/Button';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { callToast } from '@shared/components/Toaster/Toaster';

import styles from './ResearchLinksCard.module.sass';

type Props = {
  id: string;
  researchLinks: TResearchLink[];
};

export const ResearchLinksCard = ({ researchLinks, id }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const buttonSize = isFullHD ? 'md' : 'sm';

  const handleCopyLink = (researchLink: TResearchLink) => {
    navigator.clipboard.writeText(researchLink.resourceLink);
    callToast('success', t('lessons.lessonItem.researchLinks.copySuccess'), undefined, {
      autoClose: 3000,
    });
  };

  const cardId = `${id}-ResearchLink`;

  return (
    <LessonItemCard id={cardId} title={t('student.lesson.items.researchLink')}>
      <ul className={styles.researchLinkList}>
        {researchLinks.map((researchLink) => (
          <li key={researchLink.id} className={styles.researchLinkWrapper}>
            <div>
              <h5 className={styles.researchLinkName}>{researchLink.displayName}</h5>
              <a href={researchLink.resourceLink} rel='noopener noreferrer' target='_blank'>
                {researchLink.resourceLink}
              </a>
              <div className={styles.researchLinkAuthor}>
                {researchLink.author}, {researchLink.sourceName}
              </div>
            </div>
            <SharedButton
              Icon={LinkIcon}
              className={styles.researchLinkButton}
              size={buttonSize}
              variant='primary-outlined'
              onClick={() => handleCopyLink(researchLink)}>
              {t('lessons.lessonItem.researchLinks.copyLink')}
            </SharedButton>
          </li>
        ))}
      </ul>
    </LessonItemCard>
  );
};
