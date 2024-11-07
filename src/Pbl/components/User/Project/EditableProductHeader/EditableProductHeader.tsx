import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import { isEmpty } from 'lodash-es';
import { useHistory } from 'react-router-dom';

import useCustomizeProject from '@pbl/hooks/useCustomizeProject';
import { TProduct } from '@pbl/components/Project/types';

import { ReactComponent as EditIcon } from '@shared/assets/icons/edit.svg';
import { ProductAlignedStatementsIcon } from '@shared/components/ProductAlignedStatementsIcon';
import SharedCard from '@shared/components/Card/Card';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import SharedButton from '@shared/components/Button/Button';
import { IconButton } from '@shared/components/IconButton/IconButton';
import { useFeatureFlags } from '@shared/components/FeatureProvider';

import styles from './EditableProductHeader.module.sass';

type Props = {
  displayName: string;
  isEditing: boolean;
  isLoading: boolean;
  toggleEditing: () => void;
  product: TProduct;
  onModalOpen: (product: TProduct) => void;
};

export const EditableProductHeader = ({
  displayName,
  isEditing,
  isLoading,
  product,
  toggleEditing,
  onModalOpen,
}: Props) => {
  const { editMode } = useCustomizeProject();
  const { resetForm } = useFormikContext();
  const { t } = useTranslation();
  const { QUICK_PROJECT_ON } = useFeatureFlags();
  const history = useHistory();

  const headerWrapperClasses = 'flex items-center gap-x xxxl:gap-sm w-full';

  if (!editMode) {
    return (
      <div className={headerWrapperClasses}>
        <ProductAlignedStatementsIcon
          message={t('user.project.products.alignedStatements')}
          rubrics={product.rubrics}
        />
        <SharedCard.Title className={styles.title} size='medium'>
          {displayName}
        </SharedCard.Title>
      </div>
    );
  }

  if (!isEditing) {
    return (
      <div className={headerWrapperClasses}>
        <ProductAlignedStatementsIcon
          message={t('user.project.products.alignedStatements')}
          rubrics={product.rubrics}
        />
        <SharedCard.Title className={styles.editableTitle} size='medium'>
          {displayName}
          <div className={styles.editActions}>
            {QUICK_PROJECT_ON && (
              <>
                {!isEmpty(product.quickTask) && (
                  <SharedButton
                    size='md'
                    variant='primary-outlined'
                    onClick={() => history.push(`/projects/${product.quickTask?.id}`)}>
                    {t('project.viewQuickProject')}
                  </SharedButton>
                )}
              </>
            )}
            <SharedButton size='md' variant='primary-outlined' onClick={() => onModalOpen(product)}>
              {t('project.rubrics')}
            </SharedButton>
            <IconButton
              Icon={EditIcon}
              size='lg'
              variant='primary-outlined'
              onClick={toggleEditing}
            />
          </div>
        </SharedCard.Title>
      </div>
    );
  }

  const handleDiscard = () => {
    toggleEditing();
    resetForm();
  };

  return (
    <div className='w-full flex items-center gap-xs'>
      <SharedFormTextInput
        className='flex-grow'
        name='displayName'
        placeholder={t('portfolioProjects.modifyProjectModal.projectNameWithDots')}
        size='md'
      />
      <SharedButton
        className={styles.button}
        type='button'
        variant='danger'
        onClick={handleDiscard}>
        {t('common.actions.discard')}
      </SharedButton>
      <SharedButton className={styles.button} disabled={isLoading} type='submit' variant='success'>
        {t('common.actions.save')}
      </SharedButton>
    </div>
  );
};
