import { FieldArray, useField } from 'formik';
import { useTranslation } from 'react-i18next';

import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import SharedButton from '@shared/components/Button/Button';
import SharedAccordion from '@shared/components/Accordion/Accordion';

import styles from './Links.module.sass';

type TLink = {
  name: string;
  url: string;
};

const ExtensionsModalLinks = () => {
  const [field] = useField<TLink[]>('links');
  const { t } = useTranslation();

  return (
    <ul className={styles.wrapper}>
      <SharedAccordion title={t('user.dashboard.extensionFields.modal.links')}>
        <FieldArray name='links'>
          {({ push, remove }) => (
            <div className={styles.links}>
              {field.value.map((_, index) => (
                <li key={index} className={styles.linkRow}>
                  <SharedFormTextInput
                    className={styles.linkName}
                    label={t('user.dashboard.extensionFields.modal.linkName')}
                    name={`links.${index}.name`}
                  />
                  <SharedFormTextInput
                    className={styles.linkUrl}
                    label={t('user.dashboard.extensionFields.modal.linkUrl')}
                    name={`links.${index}.url`}
                  />
                  <button
                    className={styles.linkRemove}
                    disabled={index < 1}
                    type='button'
                    onClick={() => remove(index)}>
                    {t('user.dashboard.extensionFields.modal.removeLink')}
                  </button>
                </li>
              ))}
              <SharedButton variant='link' onClick={() => push({ name: '', url: '' })}>
                {t('user.dashboard.extensionFields.modal.addLink')}
              </SharedButton>
            </div>
          )}
        </FieldArray>
      </SharedAccordion>
    </ul>
  );
};

export default ExtensionsModalLinks;
