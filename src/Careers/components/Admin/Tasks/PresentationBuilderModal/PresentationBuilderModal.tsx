import * as Yup from 'yup';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import createPresentationMutation from '@dc/graphql/user/mutations/createPresentation';
import createSlideMutation from '@dc/graphql/user/mutations/createSlide';
import PresentationBuilderForm from '@dc/components/Admin/Tasks/PresentationBuilderModal/PresentationBuilderForm/PresentationBuilderForm';
import { getFormErrors } from '@dc/utils/graphql';
import { PUBLISHING_STATUSES } from '@dc/resources/constants';

import SharedModal from '@shared/components/Modal/Modal';
import themeSettings from '@shared/components/Presentations/Themes/Themes';

type Props = {
  closeModal: () => void;
  isOnPBL?: boolean;
  taskId: string;
};

export const PresentationBuilderModal = ({ closeModal, isOnPBL, taskId }: Props) => {
  const { t } = useTranslation();
  const [createPresentation] = useMutation(createPresentationMutation);
  const [createSlide] = useMutation(createSlideMutation);
  const history = useHistory();
  const presentationBuilderFormInitialValues = {
    name: '',
    description: '',
  };
  const presentationBuilderFormValidationSchema = Yup.object().shape({
    name: Yup.string().required(t('validation.messages.required')),
  });

  const builderDestination = isOnPBL
    ? `/projects/${taskId}/presentation-builder`
    : `/admin/tasks/${taskId}/presentation-builder`;

  const pushToPresentationBuilder = () => history.push(builderDestination);

  const handleSubmit = async (values: any, { setErrors }: any = {}) => {
    const defaultPresentationStatus = isOnPBL
      ? PUBLISHING_STATUSES.PUBLISHED
      : PUBLISHING_STATUSES.DRAFT;

    const { description, name } = values;

    try {
      const { data } = await createPresentation({
        variables: {
          input: {
            description,
            name,
            status: defaultPresentationStatus,
            taskId,
            typography: 'cabinSketch',
          },
        },
      });

      const { id: presentationId } = data.createPresentation.presentation;

      const defaultSlideInput = {
        backgroundColor: '#ffffff',
        backgroundImage: themeSettings.backgrounds.cabinSketch,
        textItems: [
          {
            contentId: '1',
            value: '<h2 style="font-size: 48pt">Basic Text template</h2>',
            type: 'header',
            style: '',
          },
          {
            contentId: '2',
            value:
              // eslint-disable-next-line max-len
              '<p style="font-size: 21pt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet nisi, maecenas scelerisque semper tristique ipsum molestie. Ac amet arcu eleifend aliquam massa a quis interdum urna. Vitae tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet nisi, maecenas scelerisque semper tristique ipsum molestie. Vitae tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet nisi, maecenas scelerisque semper tristique ipsum molestie.</p>',
            type: 'text',
            style: '',
          },
        ],
        name: 'Slide name',
        presentation: {
          id: presentationId,
          step: 1,
        },
        template: 'basicText',
      };

      if (!!presentationId) {
        await createSlide({
          variables: {
            input: defaultSlideInput,
          },
        });
      }

      pushToPresentationBuilder();
    } catch (error) {
      // @ts-ignore
      const errors = getFormErrors(error);

      setErrors(errors);
    }
  };

  return (
    <SharedModal isOpen={true} onDismiss={closeModal}>
      <SharedModal.Header>
        <SharedModal.Heading>
          {t('admin.tasks.presentation.createPresentation')}
        </SharedModal.Heading>
      </SharedModal.Header>
      <Formik
        initialValues={presentationBuilderFormInitialValues}
        validationSchema={presentationBuilderFormValidationSchema}
        onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <PresentationBuilderForm
            errors={errors}
            handleCloseModal={closeModal}
            touched={touched}
          />
        )}
      </Formik>
    </SharedModal>
  );
};

export default PresentationBuilderModal;
