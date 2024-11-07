import cx from 'classnames';
import { useMutation } from '@apollo/client';
import { Form, Formik, FormikValues } from 'formik';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { GraphQLError } from 'graphql';
import { useState } from 'react';

import CREATE_EXTENSION_FIELD, {
  type TCreateExtensionFieldData,
  type TCreateExtensionFieldVariables,
} from '@dc/graphql/user/mutations/createExtensionField';
import ARCHIVE_EXTENSION_FIELD_FILE from '@dc/graphql/user/mutations/archiveExtensionFieldFile';
import CREATE_EXTENSION_FIELD_FILE from '@dc/graphql/user/mutations/createExtensionFieldFile';
import UPDATE_EXTENSION_FIELD from '@dc/graphql/user/mutations/updateExtensionField';
import GENERATE_PRESIGNED_UPLOAD_URL from '@dc/graphql/user/mutations/generatePresignedUploadUrl';
import { type TExtensionField } from '@dc/graphql/user/queries/extensionField';
import { fileUpload } from '@dc/services/aws';
import { getFormErrors } from '@dc/utils/graphql';
import { AssetType, ResourceClass } from '@dc/resources/enums';

import SharedFormTextEditor from '@shared/components/FormTextEditor/FormTextEditor';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import SharedModal from '@shared/components/Modal/Modal';

import ExtensionsModalImagePicker from './ImagePicker/ImagePicker';
import ExtensionsModalLinks from './Links/Links';
import ExtensionsModalFiles from './Files/Files';
import styles from './Modal.module.sass';

type Props = {
  isOpen: boolean;
  extension?: TExtensionField;
  onDismiss: () => void;
};

type TLink = {
  name: string;
  url: string;
};

type TExistingFile = {
  id: string;
  filename: string;
  url: string;
};

type TNewFile = File;

type TFile = TExistingFile | TNewFile;

type TUploadFileErrorFields = {
  fileFilename: string;
  fileUuid: string;
  extensionFieldId: string;
};

type TArchiveFileErrorFields = {
  fileFilename: string;
  fileUuid: string;
  extensionFieldId: string;
};

type TEditExtensionErrorFields = {
  id?: string;
  name: string;
  description: string;
};

const ExtensionsModal = ({ isOpen, extension, onDismiss }: Props) => {
  const [loading, setLoading] = useState(false);
  const [createExtensionField, { loading: createLoading }] = useMutation<
    TCreateExtensionFieldData,
    TCreateExtensionFieldVariables
  >(CREATE_EXTENSION_FIELD);
  const [updateExtensionField, { loading: updateLoading }] = useMutation(UPDATE_EXTENSION_FIELD);
  const [archiveExtensionFieldFile] = useMutation(ARCHIVE_EXTENSION_FIELD_FILE);
  const [createExtensionFieldFile] = useMutation(CREATE_EXTENSION_FIELD_FILE);
  const [getPresignedUrl] = useMutation(GENERATE_PRESIGNED_UPLOAD_URL);
  const { t } = useTranslation();

  const history = useHistory();
  const isEditing = extension !== undefined;

  const initialValues = {
    name: extension?.name || '',
    description: extension?.description || '',
    image: extension?.imageUrl || '',
    links:
      extension?.links.map((link) => ({
        name: link.name,
        url: link.url,
      })) ||
      ([
        {
          name: '',
          url: '',
        },
      ] as TLink[]),
    files: extension?.files || [],
  };

  const validationSchema = yup.object().shape({
    description: yup.string().required(),
    links: yup.array().of(
      yup.object().shape(
        {
          name: yup
            .string()
            .min(5, t('validation.schemas.mustBeFiveCharacters'))
            .when('url', {
              is: (url: string) => url && url.length > 0,
              then: (schema) => schema.required(t('validation.schemas.required')),
            }),
          url: yup
            .string()
            .min(1)
            .url(t('validation.schemas.validLink'))
            .when('name', {
              is: (name: string) => name && name.length > 0,
              then: (schema) => schema.required(t('validation.schemas.required')),
            }),
        },
        [['name', 'url']]
      )
    ),
    name: yup.string().required(),
  });

  const parseLinks = (links: Array<{ name: string; url: string }>) =>
    links.filter((link) => link.name && link.url);

  const uploadImage = async (image: File) => {
    try {
      const response = await fileUpload(
        image,
        getPresignedUrl,
        ResourceClass.EXTENSION_FIELD,
        AssetType.IMAGE
      );

      await response?.promise;

      return {
        imageFilename: response.file.name,
        imageUuid: response.uuid,
      };
    } catch (error) {
      throw new Error('Failed to upload image' + error);
    }
  };

  const uploadFiles = async (files: Blob[], extensionId: string) => {
    try {
      setLoading(true);
      await Promise.all(
        files.map(async (file) => {
          const response = await fileUpload(
            file as File,
            getPresignedUrl,
            //@ts-ignore
            ResourceClass.EXTENSION_FIELD_FILE,
            AssetType.FILE
          );
          await response?.promise;
          await createExtensionFieldFile({
            variables: {
              input: {
                fileFilename: response.file.name,
                fileUuid: response.uuid,
                extensionFieldId: extensionId,
              },
            },
          });
        })
      );
      setLoading(false);
    } catch (e) {
      setLoading(false);
      //@ts-ignore
      getFormErrors<TUploadFileErrorFields>(e as { graphQLErrors: GraphQLError[] });
    }
  };

  const archiveFiles = async (files: TExistingFile[]) => {
    try {
      await Promise.all(
        files.map(async (file) => {
          await archiveExtensionFieldFile({
            variables: {
              input: {
                id: file.id,
              },
            },
          });
        })
      );
    } catch (e) {
      getFormErrors<TArchiveFileErrorFields>(e as { graphQLErrors: GraphQLError[] });
    }
  };

  const handleSubmit = async (values: FormikValues) => {
    const { files, image, links, ...newValues } = values;
    try {
      const imageData = image && (await uploadImage(image.file));

      const response = await createExtensionField({
        variables: {
          input: {
            ...newValues,
            ...imageData,
            links: parseLinks(links),
            status: 'DRAFT',
          },
        },
        refetchQueries: ['ExtensionFields'],
      });

      const extensionId = response?.data?.createExtensionField.extensionField.id;

      if (files && extensionId) {
        await (files && (await uploadFiles(files, extensionId)));
      }

      history.push(`/extensions/${extensionId}`);
    } catch (e) {
      //eslint-disable-next-line no-console
      getFormErrors<TEditExtensionErrorFields>(e as { graphQLErrors: GraphQLError[] });
    }
  };

  const handleEditingSubmit = async (values: FormikValues) => {
    const { files, image, links, ...newValues } = values;
    try {
      // when image is already there its just an string(url) in formik
      const imageData = image && typeof image !== 'string' && (await uploadImage(image.file));

      //upload new files
      if (files && files.length > 0) {
        const newFiles = files.filter((file: TFile) => !('url' in file));
        if (newFiles.length > 0) {
          newFiles && (await uploadFiles(newFiles, extension!.id));
        }
      }

      //archive removed files
      if (extension!.files) {
        const removedFiles = extension!.files.filter(
          (file: TExistingFile) => !files.includes(file)
        );
        await archiveFiles(removedFiles);
      }

      await updateExtensionField({
        variables: {
          input: {
            ...newValues,
            ...imageData,
            id: extension!.id,
            links: parseLinks(links),
          },
        },
      });

      onDismiss();
    } catch (e) {
      getFormErrors<TEditExtensionErrorFields>(e as { graphQLErrors: GraphQLError[] });
    }
  };

  const bodyClasses = cx('dashboard-scroll', styles.body);

  return (
    <SharedModal
      bypassFocusLock={true}
      className={styles.modal}
      isOpen={isOpen}
      onDismiss={onDismiss}>
      <SharedModal.Header className={styles.header}>
        <SharedModal.Heading className={styles.heading} type='h4'>
          {isEditing
            ? t('user.dashboard.extensionFields.modal.edit')
            : t('user.dashboard.extensionFields.modal.createNew')}
        </SharedModal.Heading>
      </SharedModal.Header>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={isEditing ? handleEditingSubmit : handleSubmit}>
        <Form>
          <SharedModal.Body className={bodyClasses}>
            <div className={styles.topRow}>
              <ExtensionsModalImagePicker />
              <div className='flex flex-col gap-sm ml-sm flex-1'>
                <SharedFormTextInput
                  isRequired={true}
                  label={t('user.dashboard.extensionFields.modal.name')}
                  name='name'
                />
                <SharedFormTextEditor
                  label={t('user.dashboard.extensionFields.modal.description')}
                  name='description'
                  style={{ height: '220px' }}
                />
              </div>
            </div>
            <ExtensionsModalLinks />
            <ExtensionsModalFiles isEditing={isEditing} />
          </SharedModal.Body>
          <SharedModal.Footer align='center' className={styles.footer}>
            <SharedModal.Button type='button' variant='primary-outlined' onClick={onDismiss}>
              {t('common.actions.cancel')}
            </SharedModal.Button>
            <SharedModal.Button
              isLoading={createLoading || updateLoading || loading}
              type='submit'
              variant='primary'>
              {isEditing
                ? t('common.actions.edit')
                : t('user.dashboard.extensionFields.createExtension')}
            </SharedModal.Button>
          </SharedModal.Footer>
        </Form>
      </Formik>
    </SharedModal>
  );
};

export default ExtensionsModal;
