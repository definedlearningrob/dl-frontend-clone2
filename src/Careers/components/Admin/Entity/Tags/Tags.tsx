import { Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { useToggle } from 'react-use';

import { TabCard } from '@dc/components/Admin/Entity/TabCard';
import { useSetEntityTags } from '@dc/graphql/user/hooks/useSetEntityTags';
import { TEntityData } from '@dc/graphql/user/queries/entity';
import { TTag } from '@dc/graphql/user/queries/tag';
import { TagForm } from '@dc/components/Admin/Entity/Tags/TagForm';

import { ReactComponent as TagsIcon } from '@shared/assets/icons/tag_icon.svg';
import { ReactComponent as AddIcon } from '@shared/assets/icons/add.svg';
import Button from '@shared/components/Button/Button';

type FormValues = {
  tags: TTag[];
  applyToHierarchy: boolean;
};

type Props = {
  entity: TEntityData['entity'];
};

export const Tags = ({ entity }: Props) => {
  const { t } = useTranslation();
  const [isNewTagModalOpen, toggleNewTagModalOpen] = useToggle(false);
  const [isSaveTagModalOpen, toggleTagModalOpen] = useToggle(false);
  const { setEntityTags } = useSetEntityTags();

  const initialValues = {
    tags: entity.tags || [],
    applyToHierarchy: false,
  };

  const { name: entityName } = entity;
  const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    const { tags, applyToHierarchy } = values;
    const tagIds = tags.map((tag: TTag) => tag.id);

    await setEntityTags(entity.uuid, tagIds, applyToHierarchy);
    toggleTagModalOpen(false);
    resetForm();
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validateOnMount={false}
      onSubmit={handleSubmit}>
      {({ dirty }) => (
        <TabCard
          actions={
            <>
              <Button
                Icon={AddIcon}
                size='sm'
                variant='primary-outlined'
                onClick={toggleNewTagModalOpen}>
                {t('admin.performanceIndicators.addNew')}
              </Button>
              <Button disabled={!dirty} size='sm' variant='primary' onClick={toggleTagModalOpen}>
                {t('common.actions.save')}
              </Button>
            </>
          }
          description={t('admin.entities.tabs.performanceIndicatorsDescription')}
          icon={TagsIcon}
          title={t('admin.entities.tabs.performanceIndicators')}>
          <TagForm
            entityName={entityName}
            isNewTagModalOpen={isNewTagModalOpen}
            isSaveTagModalOpen={isSaveTagModalOpen}
            setIsNewTagModalOpen={toggleNewTagModalOpen}
            setIsSaveTagModalOpen={toggleTagModalOpen}
          />
        </TabCard>
      )}
    </Formik>
  );
};
