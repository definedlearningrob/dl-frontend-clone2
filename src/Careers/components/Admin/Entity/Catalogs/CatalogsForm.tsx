import { Formik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpdateEntityCatalogsMutation } from '@graphql/dc/users/hooks';

import { TCatalog, TEntityData } from '@dc/graphql/user/queries/entity';
import { TabCard } from '@dc/components/Admin/Entity/TabCard';
import { CatalogWrapper } from '@dc/components/Admin/Entity/Catalogs/CatalogWrapper';
import { AssignCatalogModal } from '@dc/components/Admin/Entity/Catalogs/AssignModal/AssignModal';

import { ReactComponent as BookIcon } from '@shared/assets/icons/book_opened.svg';
import { callToast } from '@shared/components/Toaster/Toaster';
import { handleError } from '@shared/utils/handleError';
import SharedButton from '@shared/components/Button/Button';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

type Props = {
  entity: TEntityData['entity'];
};

export type FormValues = {
  catalogs: TCatalog[];
  applyToHierarchy: boolean;
};

export const CatalogsForm = ({ entity }: Props) => {
  const { t } = useTranslation();
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const toggleAssignModal = () => setAssignModalVisible(!assignModalVisible);
  const [updateEntityCatalogs] = useUpdateEntityCatalogsMutation();

  const initialValues = {
    catalogs: entity.catalogs || [],
    applyToHierarchy: false,
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      const catalogs = values.catalogs?.map((catalog) => ({
        catalogId: catalog.id,
        step: catalog.step,
      }));

      await updateEntityCatalogs({
        variables: {
          input: {
            catalogs,
            uuid: entity.uuid,
            applyToHierarchy: values.applyToHierarchy,
          },
        },
      });
      callToast(
        'success',
        t('user.entity.catalogs.assignedSuccessfully', { count: catalogs.length })
      );
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ dirty }) => (
        <TabCard
          actions={
            <SharedButton
              className='ml-auto'
              data-testid='assign-catalog-button'
              disabled={!dirty}
              size={isFullHD ? 'md' : 'sm'}
              variant='primary'
              onClick={toggleAssignModal}>
              {t('common.actions.save')}
            </SharedButton>
          }
          description={t('admin.entities.tabs.catalogsDescription')}
          icon={BookIcon}
          title={t('admin.entities.tabs.catalogs')}>
          <CatalogWrapper />
          {assignModalVisible && (
            <AssignCatalogModal entity={entity} toggleModal={toggleAssignModal} />
          )}
        </TabCard>
      )}
    </Formik>
  );
};
