import * as yup from 'yup';
import { ApolloError, useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import CREATE_CHECKIN, {
  TCreateCheckInQuestionData,
  TCreateCheckInQuestionVariables,
} from '@pbl/graphql/user/mutations/createCheckInQuestion';

import SharedModal from '@shared/components/Modal/Modal';
import SharedFormTextarea from '@shared/components/FormTextarea/FormTextarea';
import { callToast } from '@shared/components/Toaster/Toaster';

type UserLibraryCheckinsNewModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormikValues = {
  question: string;
};

const newCheckinSchema = yup.object().shape({
  question: yup.string().trim().required(),
});

const UserLibraryCheckinsCreateModal = ({ isOpen, onClose }: UserLibraryCheckinsNewModalProps) => {
  const [mutate, { loading }] = useMutation<
    TCreateCheckInQuestionData,
    TCreateCheckInQuestionVariables
  >(CREATE_CHECKIN);
  const { t } = useTranslation();

  const handleSubmit = async (values: FormikValues) => {
    try {
      await mutate({
        variables: {
          input: {
            question: values.question.trim(),
          },
        },
        update(cache, { data }) {
          const createdCheckInQuestion = data?.createCheckInQuestion.checkInQuestion;

          if (!createdCheckInQuestion) return;

          const createdCheckInQuestionField = {
            __typename: 'CheckInQuestion',
            id: createdCheckInQuestion.id,
            question: createdCheckInQuestion.question,
          };

          cache.modify({
            id: cache.identify({
              __typename: 'Query',
            }),
            fields: {
              checkInQuestions: (existing) => ({
                ...existing.nodes,
                nodes: [...existing.nodes, createdCheckInQuestionField],
              }),
            },
          });
        },
      });
      callToast('success', t('user.library.checkins.create.success'));

      onClose();
    } catch (e: ApolloError | unknown) {
      if (e instanceof ApolloError) {
        callToast('error', e.message);
      } else {
        callToast('error', t('user.library.checkins.create.error'));
      }
      onClose();
    }
  };

  return (
    <SharedModal isOpen={isOpen} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('user.library.checkins.create.header')}</SharedModal.Heading>
      </SharedModal.Header>
      <Formik
        initialValues={{ question: '' }}
        validationSchema={newCheckinSchema}
        onSubmit={handleSubmit}>
        <Form>
          <SharedModal.Body>
            <SharedFormTextarea label={t('user.library.checkins.create.label')} name='question' />
          </SharedModal.Body>
          <SharedModal.Footer>
            <SharedModal.Button variant='primary-outlined' onClick={onClose}>
              {t('common.actions.cancel')}
            </SharedModal.Button>
            <SharedModal.Button isLoading={loading} type='submit' variant='primary'>
              {t('common.actions.create')}
            </SharedModal.Button>
          </SharedModal.Footer>
        </Form>
      </Formik>
    </SharedModal>
  );
};

export default UserLibraryCheckinsCreateModal;
