import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import SharedButton from '@shared/components/Button/Button';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import Icon from '@shared/components/Icon/Icon';
import { ReactComponent as PlusIcon } from '@shared/assets/icons/add.svg';

import styles from './EmptyLessonCard.module.sass';

type Props = {
  title: string;
  description: string;
  className?: string;
  onClick?: () => void;
};

export const EmptyLessonCard = ({ title, description, onClick, className }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const buttonSize = isFullHD ? 'md' : 'sm';
  const iconSize = isFullHD ? 'sm' : 'xs';

  return (
    <div className={cx(styles.card, className)}>
      <div className={cx(styles.step)}>
        <Icon icon={<PlusIcon />} size={iconSize} />
      </div>
      <section className={styles.body}>
        <h6 className={styles.title}>{title}</h6>
        <p className={styles.description}>{description}</p>
        <SharedButton
          className={styles.button}
          size={buttonSize}
          variant='primary'
          onClick={onClick}>
          {t('virtualInternship.emptyLesson.addOpportunity')}
        </SharedButton>
      </section>
    </div>
  );
};
