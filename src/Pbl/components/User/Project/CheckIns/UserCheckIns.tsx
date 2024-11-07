import { ApolloError, useApolloClient, useMutation } from '@apollo/client';
import { GraphQLError } from 'graphql';
import { useTranslation } from 'react-i18next';
import { DropResult } from 'react-beautiful-dnd';

import UserCheckInsItems from '@pbl/components/User/Project/CheckIns/CheckInsItems/CheckInsItems';
import updateProjectCheckInGroupMutation from '@pbl/graphql/user/mutations/updateProjectCheckInGroup';
import updateCheckInQuestionMutation from '@pbl/graphql/user/mutations/updateCheckInQuestion';
import updateProjectCheckInQuestionMutation from '@pbl/graphql/user/mutations/updateProjectCheckInQuestion';
import useCustomizeProject from '@pbl/hooks/useCustomizeProject';
import { TCheckInQuestion } from '@pbl/components/Project/types';
import { CHECK_IN_ITEM_TYPES } from '@pbl/resources/enums';
import { useCheckIns } from '@pbl/components/Project/helpers/CheckInContext';

import { getFormErrors } from '@shared/utils/graphql';
import { TCheckInGroup } from '@shared/components/CheckIns/types';
import { callToast } from '@shared/components/Toaster/Toaster';

type FormFields = {
  question: string;
};

type ErrorFields = {
  setErrors: (question: string) => void;
};

type Props = {
  toggleCreateQuestionModalIsOpen: () => void;
};

const UserCheckIns = ({ toggleCreateQuestionModalIsOpen }: Props) => {
  const { t } = useTranslation();
  const { cache } = useApolloClient();
  const { projectId } = useCustomizeProject();
  const { checkInGroups, checkInQuestions, allCheckInItems } = useCheckIns();

  const [updateProjectCheckInGroup, { loading: loadingUpdateCheckInGroup }] = useMutation(
    updateProjectCheckInGroupMutation
  );
  const [updateProjectCheckInQuestion, { loading: loadingUpdateCheckInQuestion }] = useMutation(
    updateProjectCheckInQuestionMutation
  );
  const [updateCheckInQuestion] = useMutation(updateCheckInQuestionMutation);

  const handleArchiveCheckInGroup = async (checkInGroupId: string) => {
    try {
      const updatedCheckInItems = allCheckInItems
        .filter((item) => !(item.id === checkInGroupId && item.__typename === 'CheckInGroup'))
        .map((checkinItem, index) => ({
          itemId: checkinItem.id,
          itemType:
            checkinItem.__typename === 'CheckInGroup'
              ? CHECK_IN_ITEM_TYPES.CHECK_IN_GROUP
              : CHECK_IN_ITEM_TYPES.CHECK_IN_QUESTION,
          step: index + 1,
        }));

      await updateProjectCheckInGroup({
        variables: {
          input: {
            id: projectId,
            checkInItems: updatedCheckInItems,
          },
        },
        update: (cache) => {
          cache.modify({
            id: cache.identify({ id: projectId, __typename: 'Task' }),
            fields: {
              checkInGroups: (existingCheckInGroups) =>
                existingCheckInGroups.filter((group: TCheckInGroup) => group.id !== checkInGroupId),
            },
          });
        },
      });

      callToast('success', t('project.checkIns.deleteCheckInGroup.success'));
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error.message);
      } else {
        callToast('error', t('project.checkIns.deleteCheckInGroup.error'));
      }
    }
  };

  const handleArchiveCheckInQuestion = async (checkInQuestionId: string) => {
    try {
      const updatedCheckInItems = allCheckInItems
        .filter((item) => !(item.id === checkInQuestionId && item.__typename === 'CheckInQuestion'))
        .map((checkinItem, index) => ({
          itemId: checkinItem.id,
          itemType:
            checkinItem.__typename === 'CheckInGroup'
              ? CHECK_IN_ITEM_TYPES.CHECK_IN_GROUP
              : CHECK_IN_ITEM_TYPES.CHECK_IN_QUESTION,
          step: index + 1,
        }));

      await updateProjectCheckInQuestion({
        variables: {
          input: {
            id: projectId,
            checkInItems: updatedCheckInItems,
          },
        },
        update: (cache) => {
          cache.modify({
            id: cache.identify({ id: projectId, __typename: 'Task' }),
            fields: {
              checkInQuestions(checkInQuestions = []) {
                return checkInQuestions.filter(
                  (question: TCheckInQuestion) => question.id !== checkInQuestionId
                );
              },
            },
          });
        },
      });

      callToast('success', t('project.checkIns.deleteCheckInQuestion.success'));
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error.message);
      } else {
        callToast('error', t('project.checkIns.deleteCheckInQuestion.error'));
      }
    }
  };

  const handleUpdateQuestion = async (
    { setErrors }: { setErrors?: Function } = {},
    callback: void,
    checkInQuestion: TCheckInQuestion,
    { question: passedQuestion }: FormFields
  ) => {
    const { id: checkInQuestionId, question } = checkInQuestion;

    const byUpdatedCheckin = (question: TCheckInQuestion) =>
      question.id !== checkInQuestionId ? question : { ...question, question: passedQuestion };

    try {
      if (question !== passedQuestion) {
        await updateCheckInQuestion({
          variables: {
            input: {
              id: checkInQuestionId,
              question: passedQuestion,
            },
          },
          update(cache) {
            cache.modify({
              id: cache.identify({ id: projectId, __typename: 'Task' }),
              fields: {
                checkInQuestions(checkInQuestions = []) {
                  return checkInQuestions.map(byUpdatedCheckin);
                },
              },
            });
            cache.modify({
              id: 'ROOT_QUERY',
              fields: {
                checkInQuestions(checkInQuestions = []) {
                  return {
                    ...checkInQuestions,
                    nodes: checkInQuestions.nodes.map(byUpdatedCheckin),
                  };
                },
              },
            });
          },
        });

        callToast('success', t('project.checkIns.updateCheckInQuestion.success'));
      }
    } catch (error) {
      const errors = getFormErrors<ErrorFields>(error as { graphQLErrors: GraphQLError[] });

      setErrors && setErrors(errors);
    } finally {
      callback;
    }
  };

  const handleOnItemDragEnd = async (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;

    const allCheckInItems = [...(checkInQuestions || []), ...(checkInGroups || [])].map(
      (checkInItem) => ({ ...checkInItem, isArchived: false })
    );
    const checkInItemsCopy = Array.from(allCheckInItems).sort(
      // @ts-ignore
      (a, b) => parseInt(a.step) - parseInt(b.step)
    );

    if (type === 'CHECK_IN_ITEMS_LIST') {
      const [reorderedItem] = checkInItemsCopy.splice(source.index, 1);

      checkInItemsCopy.splice(destination.index, 0, reorderedItem);
    }

    cache.modify({
      id: cache.identify({ id: projectId, __typename: 'Task' }),
      fields: {
        checkInQuestions(existing = []) {
          return existing.map((question: TCheckInQuestion) => {
            const newStep = checkInItemsCopy.findIndex((item) => item.id === question.id);

            return { ...question, step: newStep + 1 };
          });
        },
        checkInGroups(existing = []) {
          return existing.map((checkInGroup: TCheckInGroup) => {
            let newStep = checkInItemsCopy.findIndex((item) => item.id === checkInGroup.id);

            return {
              ...checkInGroup,
              step: newStep + 1,
            };
          });
        },
      },
    });

    try {
      const checkInItems = checkInItemsCopy.map((item, index) => ({
        itemId: item.id,
        itemType:
          item.__typename === 'CheckInQuestion'
            ? CHECK_IN_ITEM_TYPES.CHECK_IN_QUESTION
            : CHECK_IN_ITEM_TYPES.CHECK_IN_GROUP,
        step: ++index,
      }));

      await updateProjectCheckInQuestion({
        variables: {
          input: {
            id: projectId,
            checkInItems,
          },
        },
      });
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error.message);
      } else {
        callToast('error', t('project.checkIns.deleteCheckInQuestion.error'));
      }
    }
  };

  return (
    <UserCheckInsItems
      archiveCheckInGroup={handleArchiveCheckInGroup}
      archiveCheckInQuestion={handleArchiveCheckInQuestion}
      handleOnItemDragEnd={handleOnItemDragEnd}
      handleUpdateQuestion={handleUpdateQuestion}
      isLoading={loadingUpdateCheckInGroup || loadingUpdateCheckInQuestion}
      toggleCreateQuestionModalIsOpen={toggleCreateQuestionModalIsOpen}
    />
  );
};

export default UserCheckIns;
