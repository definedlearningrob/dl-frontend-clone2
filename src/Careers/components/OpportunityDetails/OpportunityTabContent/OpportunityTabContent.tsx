import { cleanInjection } from '@shared/utils/cleanInjection';

import styles from './OpportunityTabContent.module.sass';

type Props = { title: string; content: string | null };

export const OpportunityTabContent = ({ title, content }: Props) => (
  <>
    <h4 className={styles.heading}>{title}</h4>
    <div className={styles.contentWrapper}>
      {content && (
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={cleanInjection(content)} className={styles.content} />
      )}
    </div>
  </>
);
