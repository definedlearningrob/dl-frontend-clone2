import { useTranslation } from 'react-i18next';
import { Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import useCustomizeProject from '@pbl/hooks/useCustomizeProject';

import Card from '@shared/components/Card/Card';
import Button from '@shared/components/Button/Button';
import { callToast } from '@shared/components/Toaster/Toaster';
import SharedFormTextEditor from '@shared/components/FormTextEditor/FormTextEditor';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';

type FormValues = { displayName: string; description: string };

export const ProductsForm = () => {
  const { t } = useTranslation();
  const { addNewProduct, projectId, createProductLoading } = useCustomizeProject();
  const validationSchema = Yup.object().shape({
    description: Yup.string().trim().required(t('validation.messages.required')),
    displayName: Yup.string().trim().required(t('validation.messages.required')),
  });

  const [productToCreate, setProductToCreate] = useState(false);

  const handleAddNewProduct = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    try {
      addNewProduct({
        displayName: values.displayName,
        description: values.description,
        taskId: projectId,
      });
      setProductToCreate(false);
      actions.resetForm();
      callToast(
        'success',
        t('common.notifications.success.created', { name: t('products.typename') })
      );
    } catch (error) {
      callToast('error', t('common.error', { error }));
    }
  };

  return (
    <Formik
      initialValues={{ description: '', displayName: 'New product' }}
      validationSchema={validationSchema}
      onSubmit={handleAddNewProduct}>
      <Form>
        {!productToCreate && (
          <Card>
            <Card.Header className='items-center'>
              <h4 className='mb-0'>{t('user.project.settings.addNewProduct')}</h4>
              <Button size='md' variant='primary' onClick={() => setProductToCreate(true)}>
                {t('user.project.settings.addProduct')}
              </Button>
            </Card.Header>
            <Card.Body>
              <p className='mb-0'>{t('user.project.settings.productsText')}</p>
            </Card.Body>
          </Card>
        )}
        {productToCreate && (
          <Card>
            <Card.Body>
              <SharedFormTextInput className='grow' name='displayName' size='sm' />
              <SharedFormTextEditor defaultToolbarType={false} name='description' />
              <div className='flex gap-sm justify-end'>
                <Button
                  minWidth='md'
                  variant='primary-outlined'
                  onClick={() => setProductToCreate(false)}>
                  {t('common.actions.cancel')}
                </Button>
                <Button
                  disabled={createProductLoading}
                  minWidth='md'
                  type='submit'
                  variant='primary'>
                  {t('common.actions.save')}
                </Button>
              </div>
            </Card.Body>
          </Card>
        )}
      </Form>
    </Formik>
  );
};
