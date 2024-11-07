import { ApolloError, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { UPDATE_PLAN_GROUP_STATEMENT } from '@dc/graphql/user/mutations/updatePlanGroupStatement';

import { callToast } from '@shared/components/Toaster/Toaster';
import { STATEMENT_QUESTION_TYPE } from '@shared/resources/enums';

type StatementData = {
  id: string;
  name: string;
  required: boolean;
  question: {
    text: string;
    questionType: STATEMENT_QUESTION_TYPE;
    options: {
      id: string;
      option: string;
    }[];
  };
};

export const useUpdateStatement = () => {
  const { t } = useTranslation();
  const [updateStatement, options] = useMutation(UPDATE_PLAN_GROUP_STATEMENT);

  const handleUpdateStatement = async (values: StatementData) => {
    const filteredOption = values.question.options.filter(
      (optionItem) => !isEmpty(optionItem.option)
    );

    try {
      await updateStatement({
        variables: {
          input: {
            id: values.id,
            name: values.name,
            required: values.required,
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
      });
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error.message);
      } else {
        callToast('error', t('common.error.unknown'));
      }
    }
  };

  return [handleUpdateStatement, options] as const;
};
