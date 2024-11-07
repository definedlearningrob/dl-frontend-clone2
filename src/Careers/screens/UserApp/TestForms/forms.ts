import {
  ErrorSchemaBuilder,
  RJSFSchema,
  toPathSchema,
  retrieveSchema,
  ErrorSchema,
} from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { MutableRefObject, useState } from 'react';
import { isEmpty, mapValues } from 'lodash-es';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { InternalRefetchQueriesInclude, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { COMMON_APP_FORM_TYPES } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';
import { RECOMMENDATION_REQUEST_QUERY } from '@dc/graphql/user/queries/recommendationRequest';
import { STUDENT_APPLICATIONS_QUERY } from '@dc/graphql/user/queries/studentApplications';

import { callPromiseToast, callToast } from '@shared/components/Toaster/Toaster';

import { GET_QUESTIONS, SAVE_QUESTIONS, TSaveCommonAppResponsesData } from './commonAppQueries';

export type QuestionType =
  | 'SingleSelectDropdown'
  | 'Short'
  | 'Phone'
  | 'Email'
  | 'Radio'
  | 'Long'
  | 'Date'
  | 'Date (MM/DD/YYYY)'
  | 'Checkbox'
  | 'Upload'
  | '6 digit High School CEEB code'
  | '4 digit College CEEB code'
  | 'Month (MM/YYYY)';

export type QuestionState = 'Optional' | 'Required' | 'Hidden';
export type DataType = 'Integer' | 'Date' | 'String' | 'Double' | 'NULL';
export type FormsInitialData = Record<string, string | number | (string | number)[] | null>;

export type CommonAppRawQuestion = {
  sectionName: string;
  id: string;
  label: string;
  type: QuestionType | string;
  name: string;
  format: string | null;
  choiceGroup: string | null;
  orderSeq: string | null;
  defaultState: QuestionState | string;
  triggeredState: QuestionState | string | null;
  requirementRule: string | null;
  dataType: DataType | string | null;
  minWordsYear: string | null;
  maxWordsYearKb: string | null;
  maxCharacters: string | null;
  allowedCharacters: string | null;
  validationPattern: string | null;
  errorMessage: string | null;
  groupValidation: string | null;
};

type FieldValue = string | number | string[] | number[];

export type CommonAppRawQuestions = Record<string, CommonAppRawQuestion>;

export const parseFormValues = (formData: FormData, questions: CommonAppRawQuestions) =>
  mapValues(formData, (value: FieldValue, key: string) => parseValueToSend(value, key, questions));

// looses question 1445 in teQuestions with getFieldNames function
export const parseUsedFormData = (
  formRef: MutableRefObject<null>,
  schema: RJSFSchema,
  questions: CommonAppRawQuestions
) => {
  //@ts-ignore
  const currentFormData = formRef.current.state.formData;
  const parsedFormData = parseFormValues(currentFormData, questions);
  const retrievedSchema = retrieveSchema(validator, schema, parsedFormData);
  const pathschema = toPathSchema(validator, retrievedSchema, undefined, parsedFormData);
  //@ts-ignore
  const fieldNames = formRef.current.getFieldNames(pathschema, parsedFormData);
  //@ts-ignore
  const newFormData = formRef.current.getUsedFormData(parsedFormData, fieldNames);

  return newFormData;
};

const numberInputTypes = ['Checkbox', 'Radio', 'SingleSelectDropdown'];
const integerTextInputTypes = ['Short'];
const doubleTextInputTypes = ['Short'];
const dataInputTypes = ['Upload'];

export const parseInitialFormValues = (
  responses: { questionId: number; response: string; filename?: string }[],
  questions: CommonAppRawQuestions
) => {
  const data = responses.reduce((acc, item) => {
    const question = questions[item.questionId];
    const questionType = question?.type;

    if (numberInputTypes.includes(questionType)) {
      //handle checkbox parsing
      if (questionType === 'Checkbox') {
        acc[item.questionId] = item.response.split(',').map((i) => {
          const parsedResponse = parseInt(i);
          if (isNaN(parsedResponse)) {
            return i;
          }

          return parsedResponse;
        });

        return acc;
      }

      acc[item.questionId] = parseInt(item.response);

      return acc;
    }

    if (questionType === 'Date') {
      acc[item.questionId] = dayjs(item.response, 'YYYY-MM-DD').format('YYYY-MM-DD');

      return acc;
    }

    if (questionType === 'Date (MM/DD/YYYY)') {
      acc[item.questionId] = dayjs(item.response, 'YYYY-MM-DD').format('YYYY-MM-DD');

      return acc;
    }

    if (questionType === 'Month (MM/YYYY)') {
      const [month, year] = item.response.split('/');
      const date = dayjs(new Date(parseInt(year), parseInt(month) - 1, 1)).format('YYYY-MM-DD');
      acc[item.questionId] = date;

      return acc;
    }

    if (integerTextInputTypes.includes(questionType) && question.dataType === 'Integer') {
      acc[item.questionId] = parseInt(item.response);

      return acc;
    }

    if (doubleTextInputTypes.includes(questionType) && question.dataType === 'Double') {
      acc[item.questionId] = parseFloat(item.response);

      return acc;
    }

    if (dataInputTypes.includes(questionType)) {
      const filename = item.filename || 'uploaded.pdf';
      acc[item.questionId] = `data:application/pdf;name=${filename};base64,${item.response}`;

      return acc;
    }
    acc[item.questionId] = item.response;

    return acc;
  }, {} as Record<string, string | number | (string | number)[]>);

  return data;
};

export const parseValueToSend = (
  val: string | number | string[] | number[],
  key: string,
  questionsDump: CommonAppRawQuestions
) => {
  if (Array.isArray(val)) {
    return !isEmpty(val) ? val.join(',') : null;
  }

  const questionType = questionsDump[key]?.type;

  if (questionType === 'Upload') {
    return val;
  }

  if (questionType === 'Phone' && typeof val === 'string') {
    if (val.includes('||')) {
      const [prefix, numberWithPrefix] = val.split('||');
      if (prefix === '1' && numberWithPrefix.length === 11) {
        // handle US phone number
        return `+${numberWithPrefix[0]}.${numberWithPrefix.slice(1, 4)}-${numberWithPrefix.slice(
          4,
          7
        )}-${numberWithPrefix.slice(7, 11)}`;
      }

      // handle international phone number
      return `+${prefix}.${numberWithPrefix.slice(prefix.length, numberWithPrefix.length)}`;
    }

    return val;
  }

  if (questionType === 'Date') {
    return dayjs(val).format('MM/DD/YYYY');
  }
  if (questionType === 'Date (MM/DD/YYYY)') {
    return dayjs(val).format('MM/DD/YYYY');
  }
  if (questionType === 'Month (MM/YYYY)') {
    return dayjs(val).format('MM/YYYY');
  }

  return val;
};

export const onCompletedSave =
  <T>(setErrors: (errors: ErrorSchema<T>) => void) =>
  (data: TSaveCommonAppResponsesData) => {
    const { invalidResponses, incompleteResponses, errorCode, errorMessage } =
      data.saveCommonAppFormResponses;

    if (errorCode && errorMessage) {
      callToast('error', errorMessage);
    }

    const builder = new ErrorSchemaBuilder();
    const invalidQuestionsIds = invalidResponses.map((response) => response.questionId);

    invalidResponses.forEach((value) => {
      builder.addErrors(value.messages, String(value.questionId));
    });

    incompleteResponses
      .filter((questionId) => !invalidQuestionsIds.includes(questionId))
      .forEach((item) => {
        builder.addErrors(t('user.postSecondary.commonAppForms.error.missingField'), item);
      });

    setErrors(builder.ErrorSchema);

    if (!isEmpty(invalidResponses) || !isEmpty(incompleteResponses)) {
      callToast(
        'warning',
        t('user.postSecondary.commonAppForms.error.encounteredValidationErrors')
      );

      return;
    }
  };

export const parseBase64ForUpload = (value: string) => ({
  response: value.split('base64,')[1],
  filename: value.split(';base64,')[0].split('name=')[1],
});

export const prepareDataToSend = (formData: FormData) => {
  const preparedData: {
    questionId: number;
    response: string;
    filename?: string;
  }[] = [];

  Object.entries(formData).forEach(([key, value]) => {
    if (value || value === 0) {
      if (typeof value === 'string' && value.includes(';base64,')) {
        const { filename, response } = parseBase64ForUpload(value);

        preparedData.push({
          questionId: parseInt(key),
          response,
          filename,
        });

        return;
      }

      preparedData.push({
        questionId: parseInt(key),
        response: `${value}`,
      });
    }
  });

  return preparedData;
};

export const useFormSave = <T>({
  formType,
  formRef,
  refetchQueries = [],
}: {
  formType: COMMON_APP_FORM_TYPES;
  formRef: MutableRefObject<null>;
  refetchQueries?: InternalRefetchQueriesInclude;
}) => {
  const [save, { loading: isSaving }] = useMutation(SAVE_QUESTIONS);
  const [extraErrors, setExtraErrors] = useState<ErrorSchema<T>>({});
  const { studentUuid } = useParams<{ studentUuid?: string }>();

  const saveForm = (formData: FormData) => {
    if (!formRef.current) {
      return;
    }

    const preparedData = prepareDataToSend(formData);

    if (isEmpty(preparedData)) {
      callToast('error', t('user.postSecondary.commonAppForms.error.atLeastOneError'));

      return;
    }

    const savePromise = save({
      variables: {
        input: {
          studentUuid,
          type: formType,
          responses: preparedData,
        },
      },
      refetchQueries: [
        {
          query: GET_QUESTIONS,
          variables: { type: formType, studentUuid },
        },
        {
          query: RECOMMENDATION_REQUEST_QUERY,
          variables: { studentUuid },
        },
        { query: STUDENT_APPLICATIONS_QUERY, variables: { studentUuid } },
        ...refetchQueries,
      ],
      onCompleted: onCompletedSave<T>(setExtraErrors),
    });

    callPromiseToast(savePromise, {
      pendingText: t('user.postSecondary.commonAppForms.savingForm'),
      errorText: t('user.postSecondary.commonAppForms.savingFailure'),
      successText: t('user.postSecondary.commonAppForms.savingSuccess'),
    });

    return savePromise;
  };

  return { saveForm, extraErrors, isSaving };
};
