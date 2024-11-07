import { ApolloError, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Formik, Form } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useToggle } from 'react-use';

import APPEND_CHECK_IN_ITEMS, {
  TAppendCheckInItemsToTaskData,
  TAppendCheckInItemsToTaskVariables,
} from '@pbl/graphql/user/mutations/appendCheckInItemsToTask';
import {
  CHECK_IN_QUESTIONS_LIBRARY,
  TLibraryCheckinsData,
  TLibraryCheckinsVariables,
} from '@pbl/graphql/user/queries/checkInQuestions';
import PROJECT_CHECKINS, {
  TProjectCheckinsData,
  TProjectCheckinsVariables,
} from '@pbl/graphql/user/queries/projectCheckins';
import { CHECK_IN_ITEM_TYPES } from '@pbl/resources/enums';
import { TCheckInQuestion } from '@pbl/components/Project/types';
import CreateCheckInQuestionModal from '@pbl/components/User/Project/CheckIns/CreateCheckInQuestionModal/CreateCheckInQuestionModal';

import SharedButton from '@shared/components/Button/Button';
import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { callToast } from '@shared/components/Toaster/Toaster';

import CheckinsAssingList from './List/List';
import { CheckinsAssignPagination } from './Pagination/Pagination';
import CheckinsAssignFooter from './Footer/Footer';

const MAX_QUESTIONS_PER_PAGE = 15;

type FormikValues = {
  questionIds: string[];
};

const initialValues: FormikValues = {
  questionIds: [],
};

export const CheckinsAssignBody = () => {
  const history = useHistory();
  const [createQuestionModalIsOpen, toggleCreateQuestionModalIsOpen] = useToggle(false);
  const { t } = useTranslation();
  const { cache } = useApolloClient();
  const { projectId } = useParams<{ projectId: string }>();
  const [appendCheckInItems, { loading: loadingUpdate }] = useMutation<
    TAppendCheckInItemsToTaskData,
    TAppendCheckInItemsToTaskVariables
  >(APPEND_CHECK_IN_ITEMS);

  const { data, error, loading } = useQuery<TProjectCheckinsData, TProjectCheckinsVariables>(
    PROJECT_CHECKINS,
    { variables: { projectId } }
  );

  if (loading || error) {
    return <SharedLoadingSpinner size='medium' />;
  }

  if (!data) {
    return null;
  }

  const redirectToProjectCheckIns = () =>
    history.push({
      pathname: `/projects/${projectId}`,
      state: {
        tabId: 'check_ins',
      },
    });

  const handleSubmit = async (values: FormikValues) => {
    const {
      project: { checkInQuestions },
    } = data;

    try {
      const newCheckInItems = values.questionIds.map((questionId) => ({
        itemId: questionId,
        itemType: CHECK_IN_ITEM_TYPES.CHECK_IN_QUESTION,
      }));

      const filteredNewCheckInItems = newCheckInItems.filter(
        (item) => !checkInQuestions.some((question) => question.id === item.itemId)
      );

      const { data } = await appendCheckInItems({
        variables: {
          input: {
            taskId: projectId,
            checkInItems: [...filteredNewCheckInItems],
          },
        },
      });

      const selectedQuestions =
        data?.appendCheckInItemsToTask.task.checkInQuestions
          .reduce((acc: TCheckInQuestion[], checkInQuestion: TCheckInQuestion) => {
            if (values.questionIds.includes(checkInQuestion.id)) acc.push(checkInQuestion);

            return acc;
          }, [])
          .filter((item) => !checkInQuestions.some((question) => question.id === item.id)) || [];

      cache.modify({
        id: cache.identify({ projectId, __typename: 'Task' }),
        fields: {
          checkInQuestions(existing = []) {
            return [...existing, ...selectedQuestions];
          },
        },
      });

      callToast('success', 'Successfully assigned new checkins');
      redirectToProjectCheckIns();
    } catch (e: ApolloError | unknown) {
      if (e instanceof ApolloError) {
        callToast('error', e.message);
      } else {
        callToast('error', t('common.error.unknown'));
      }
    }
  };

  return (
    <section>
      <div className='flex justify-between items-center mb-sm'>
        <h3 className='mb-0'>{t('user.project.checkins.assignCheckin.listHeading')}</h3>
        <SharedButton
          disabled={loading}
          size='sm'
          variant='primary-outlined'
          onClick={toggleCreateQuestionModalIsOpen}>
          {t('project.checkIns.createNewCheckInQuestion.createNew')}
        </SharedButton>
      </div>
      <SharedPaginatedLoader<TLibraryCheckinsData, TLibraryCheckinsVariables>
        getKey='checkInQuestions'
        pageName={t('common.fields.common.page')}
        perPage={MAX_QUESTIONS_PER_PAGE}
        query={CHECK_IN_QUESTIONS_LIBRARY}>
        {(pagingProps) => (
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              {pagingProps.data && (
                <>
                  <CheckinsAssingList questions={pagingProps.data.checkInQuestions.nodes} />
                  {pagingProps.data.checkInQuestions.pagesCount > 1 && (
                    <CheckinsAssignPagination text={true} {...pagingProps} />
                  )}
                </>
              )}
              <CheckinsAssignFooter
                loading={loadingUpdate}
                perPage={MAX_QUESTIONS_PER_PAGE}
                toggleCreateQuestionModalIsOpen={toggleCreateQuestionModalIsOpen}
              />
            </Form>
          </Formik>
        )}
      </SharedPaginatedLoader>
      <CreateCheckInQuestionModal
        isOpen={createQuestionModalIsOpen}
        onDismiss={toggleCreateQuestionModalIsOpen}
      />
    </section>
  );
};
