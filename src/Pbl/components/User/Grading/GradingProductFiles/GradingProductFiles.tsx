import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { TProductSubmission } from '@pbl/graphql/user/queries/productSubmissionToGrade';
import useProductSubmission from '@pbl/hooks/useProductSubmission';

import { ReactComponent as ChevronDown } from '@shared/svg/chevron_down.svg';
import FilesUploadSection from '@shared/components/FileUpload/FileUpload';
import ItemWrapper from '@shared/components/ItemWrapper/ItemWrapper';
import SharedIcon from '@shared/components/Icon/Icon';

import { useGradingContext } from '../GradingContext/GradingContext';

import styles from './GradingProductFiles.module.sass';
import { ProductList } from './ProductList';

type Props = {
  submission: TProductSubmission | null;
};

const GradingProductFiles = ({ submission }: Props) => {
  const { teamId, studentId, productId } =
    useParams<{ teamId?: string; studentId?: string; productId: string }>();
  const {
    navigation: { projectId },
  } = useGradingContext();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const { onFilePick, onGoogleFilePick } = useProductSubmission(submission, {
    productId,
    projectId,
    teamId,
    studentId,
    isUser: true,
  });

  return (
    <ItemWrapper>
      <ItemWrapper.Header>
        <ItemWrapper.Kicker>{t('user.grading.files').toUpperCase()}</ItemWrapper.Kicker>
      </ItemWrapper.Header>
      <ItemWrapper.Body className={styles.body}>
        <div className={styles.wrapper}>
          <button
            className={styles.header}
            role='rowheader'
            type='button'
            onClick={() => setIsOpen((open) => !open)}>
            <span className={styles.text}>{t('user.grading.filesUpload')}</span>
            <SharedIcon className={styles.icon} icon={<ChevronDown />} />
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                animate='open'
                className={styles.dropzone}
                exit='collapsed'
                initial='collapsed'
                transition={{ duration: 0.6 }}
                variants={{
                  open: { height: 'auto', opacity: 1 },
                  collapsed: { height: 0, opacity: 0 },
                }}>
                <FilesUploadSection onFilePick={onFilePick} onGoogleFilePick={onGoogleFilePick} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <ProductList submission={submission} />
      </ItemWrapper.Body>
    </ItemWrapper>
  );
};
export default GradingProductFiles;
