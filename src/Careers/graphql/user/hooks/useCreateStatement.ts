import { ApolloError, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { CREATE_PLAN_GROUP_STATEMENT } from '@dc/graphql/user/mutations/createPlanGroupStatement';

import { callToast } from '@shared/components/Toaster/Toaster';
import { STATEMENT_QUESTION_TYPE } from '@shared/resources/enums';

type StatementData = {
  name: string;
  step: number;
  required: boolean;
  question: {
    text: string;
    questionType: STATEMENT_QUESTION_TYPE;
    options: { option: string; id: string }[];
  };
};

export const useCreateStatement = () => {
  const { t } = useTranslation();
  const { id: planGroupId } = useParams<{ id: string }>();
  const [createStatement, options] = useMutation(CREATE_PLAN_GROUP_STATEMENT);

  const handleCreateStatement = async (values: StatementData) => {
    const filteredOption = values.question.options.filter(
      (optionItem) => !isEmpty(optionItem.option)
    );

    try {
      await createStatement({
        variables: {
          input: {
            name: values.name,
            required: values.required,
            step: values.step,
            planGroupId,
            question: {
              text: values.question.text,
              questionType: values.question.questionType,
              options: filteredOption.map((option, index) => ({
                option: option.option,
                step: index + 1,
              })),
            },
          },
        },
        update(cache, { data }) {
          cache.modify({
            id: cache.identify({ __typename: 'PlanGroup', id: planGroupId }),
            fields: {
              statements(currentStatements = [], { toReference }) {
                const newStatement = data?.createPlanGroupStatement.planGroupStatement;

                if (!newStatement) {
                  return currentStatements;
                }

                return [
                  ...currentStatements,
                  toReference({ __typename: 'PlanGroupStatement', id: newStatement.id }),
                ];
              },
            },
          });
        },
      });
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error.message);
      } else {
        callToast('error', t('common.error.unknown'));
      }
    }
  };

  return [handleCreateStatement, options] as const;
};
