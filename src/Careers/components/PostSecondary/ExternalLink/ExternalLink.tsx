import { trim } from 'lodash-es';
import { ReactNode } from 'react';

import { ReactComponent as LinkIcon } from '@shared/svg/link.svg';
import { formatExternalLink } from '@shared/utils/formatExternalLink';
import SharedIcon from '@shared/components/Icon/Icon';

import styles from './ExternalLink.module.sass';

type Props = {
  url: string | null;
  label?: ReactNode;
};

export const ExternalLink = ({ url, label }: Props) => {
  if (!url) {
    return null;
  }

  return (
    <div className={styles.linkWrapper}>
      {label}
      <a
        className={styles.link}
        href={formatExternalLink(url)}
        rel='noopener noreferrer'
        target='_blank'>
        <SharedIcon icon={<LinkIcon />} size='sm' />
        {trim(url, '/')}
      </a>
    </div>
  );
};
