import { useTranslation } from 'react-i18next';

import styles from './Details.module.sass';

type Props = {
  links: {
    name: string;
    url: string;
  }[];
  files: {
    id: string;
    filename: string;
    url: string;
  }[];
};

const ExtensionFieldDetails = ({ files, links }: Props) => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className={styles.heading} id='links-heading'>
        {t('user.dashboard.extensionFields.links')}
      </h2>
      <ul aria-labelledby='links-heading'>
        {links.map((link) => (
          <li key={link.name} className={styles.listItem}>
            <a href={link.url} target='_blank'>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
      <h2 className={styles.heading} id='files-heading'>
        {t('user.dashboard.extensionFields.attachedFiles')}
      </h2>
      <ul aria-labelledby='files-heading'>
        {files.map((file) => (
          <li key={file.id} className={styles.listItem}>
            <a download={true} href={file.url} target='_blank'>
              {file.filename}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExtensionFieldDetails;
