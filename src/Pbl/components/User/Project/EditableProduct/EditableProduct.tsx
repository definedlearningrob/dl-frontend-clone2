import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import { TProduct } from '@pbl/components/Project/types';
import { EditableProductHeader } from '@pbl/components/User/Project/EditableProductHeader';
import { EditableProductDescription } from '@pbl/components/User/Project/EditableProductDescription';
import useCustomizeProject from '@pbl/hooks/useCustomizeProject';
import { useUpdateProduct } from '@pbl/graphql/user/hooks/useUpdateProjectProduct';
import { ProductActions } from '@pbl/components/Project/Products/ProductActions/ProductActions';
import { ProductVisibilitySwitch } from '@pbl/components/User/Project/ProductVisibilitySwitch/ProductVisibilitySwitch';

import Card from '@shared/components/Card/Card';
import { useToggle } from '@shared/hooks/useToggle';

import styles from './EditableProduct.module.sass';

type ProductProps = {
  isGradingAllowed: boolean;
  isStudent: boolean;
  product: TProduct;
  onModalOpen: (product: TProduct) => void;
};

export const EditableProduct = ({
  isGradingAllowed,
  isStudent,
  product,
  onModalOpen,
}: ProductProps) => {
  const { t } = useTranslation();
  const { editMode } = useCustomizeProject();
  const [isEditing, toggleEditing, , setIsNotEditing] = useToggle(false);
  const [updateProduct, { loading }] = useUpdateProduct(product.id);

  const handleOnSubmit = async ({
    displayName,
    description,
  }: {
    displayName: string;
    description: string;
  }) => {
    await updateProduct({
      displayName,
      description,
    });

    setIsNotEditing();
  };

  const validationSchema = Yup.object().shape({
    description: Yup.string().required(t('validation.messages.required')),
    displayName: Yup.string().required(t('validation.messages.required')),
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ displayName: product.displayName, description: product.description }}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}>
        <Form>
          <Card.Header className='flex content-between items-center w-full'>
            <EditableProductHeader
              displayName={product.displayName}
              isEditing={isEditing}
              isLoading={loading}
              product={product}
              toggleEditing={toggleEditing}
              onModalOpen={onModalOpen}
            />
            {!editMode && (
              <ProductActions
                isGradingAllowed={isGradingAllowed}
                isStudent={isStudent}
                product={product}
                onModalOpen={onModalOpen}
              />
            )}
          </Card.Header>
          <Card.Body className={styles.body}>
            <EditableProductDescription description={product.description} isEditing={isEditing} />
            <ProductVisibilitySwitch isHidden={product.hidden} productId={product.id} />
          </Card.Body>
        </Form>
      </Formik>
    </>
  );
};
