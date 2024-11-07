import * as yup from 'yup';
import { ApolloError, useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import { CHECK_IN_QUESTIONS_LIBRARY } from '@pbl/graphql/user/queries/checkInQuestions';
import APPEND_CHECK_IN_ITEMS, {
  TAppendCheckInItemsToTaskData,
  TAppendCheckInItemsToTaskVariables,
} from '@pbl/graphql/user/mutations/appendCheckInItemsToTask';
import CREATE_CHECKIN, {
  TCreateCheckInQuestionData,
  TCreateCheckInQuestionVariables,
} from '@pbl/graphql/user/mutations/createCheckInQuestion';
import useCustomizeProject from '@pbl/hooks/useCustomizeProject';
import { CHECK_IN_ITEM_TYPES } from '@pbl/resources/enums';

import SharedModal from '@shared/components/Modal/Modal';
import SharedFormTextarea from '@shared/components/FormTextarea/FormTextarea';
import { callToast } from '@shared/components/Toaster/Toaster';

import styles from './CreateCheckInQuestionModal.module.sass';

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
};

type FormikValues = {
  question: string;
};

const newCheckInSchema = yup.object().shape({
  question: yup.string().trim().required(),
});

const MAX_QUESTIONS_PER_PAGE = 15;

const CreateCheckInQuestionModal = ({ isOpen, onDismiss }: Props) => {
  const { t } = useTranslation();
  const { projectId } = useCustomizeProject();

  const [appendCheckInItems, { loading: appendLoading }] = useMutation<
    TAppendCheckInItemsToTaskData,
    TAppendCheckInItemsToTaskVariables
  >(APPEND_CHECK_IN_ITEMS);
  const [createCheckInMutation, { loading: loadingCreate }] = useMutation<
    TCreateCheckInQuestionData,
    TCreateCheckInQuestionVariables
  >(CREATE_CHECKIN);

  const isLoading = loadingCreate || appendLoading;

  const handleSubmit = async (values: FormikValues) => {
    try {
      const { data } = await createCheckInMutation({
        variables: {
          input: {
            question: values.question.trim(),
          },
        },
        refetchQueries: [
          {
            query: CHECK_IN_QUESTIONS_LIBRARY,
            variables: { page: 1, perPage: MAX_QUESTIONS_PER_PAGE },
          },
        ],
      });

      const createdCheckInQuestion = data?.createCheckInQuestion.checkInQuestion;

      const parsedCheckInQuestionToAppend = createdCheckInQuestion && {
        itemId: createdCheckInQuestion?.id,
        itemType: CHECK_IN_ITEM_TYPES.CHECK_IN_QUESTION,
      };

      if (parsedCheckInQuestionToAppend && projectId) {
        await appendCheckInItems({
          variables: {
            input: {
              taskId: projectId,
              checkInItems: [parsedCheckInQuestionToAppend],
            },
          },
        });
      }

      callToast('success', t('project.checkIns.createNewCheckInQuestion.success'));
      onDismiss();
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error.message);
      } else {
        callToast('error', t('project.checkIns.createNewCheckInQuestion.error'));
      }
      onDismiss();
    }
  };

  return (
    <SharedModal isOpen={isOpen} onDismiss={onDismiss}>
      <SharedModal.Header>
        <div>
          <SharedModal.Heading>
            {t('project.checkIns.createNewCheckInQuestion.heading')}
          </SharedModal.Heading>
          {projectId && (
            <p className={styles.headerParagraph}>
              {t('project.checkIns.createNewCheckInQuestion.paragraph')}
            </p>
          )}
        </div>
      </SharedModal.Header>
      <Formik
        initialValues={{ question: '' }}
        validationSchema={newCheckInSchema}
        onSubmit={handleSubmit}>
        <Form>
          <SharedModal.Body>
            <SharedFormTextarea autoFocus={true} label='Check in question' name='question' />
          </SharedModal.Body>
          <SharedModal.Footer>
            <SharedModal.Button variant='primary-outlined' onClick={onDismiss}>
              {t('common.actions.cancel')}
            </SharedModal.Button>
            <SharedModal.Button isLoading={isLoading} type='submit' variant='primary'>
              {t('common.actions.create')}
            </SharedModal.Button>
          </SharedModal.Footer>
        </Form>
      </Formik>
    </SharedModal>
  );
};

export default CreateCheckInQuestionModal;
