import { gql, TypedDocumentNode } from '@apollo/client';

import { COMMON_APP_FORM_TYPES } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';

export const GET_QUESTIONS: TypedDocumentNode<TCommonAppFormData, TCommonAppFormInput> = gql(`
  query CommonAppForm($type: CommonAppFormTypes!, $studentUuid: ID = null) {
    commonAppForm(type: $type, studentUuid: $studentUuid) {
      id
      type
      responses {
        questionId
        response
        filename
      }
    }
  }
`);

export type TCommonAppFormData = {
  commonAppForm: TCommonAppForm;
};

export type TCommonAppFormInput = {
  type: COMMON_APP_FORM_TYPES;
  studentUuid?: string;
};

export type TCommonAppForm = {
  responses: TCommonAppResponse[];
};

export type TCommonAppResponse = {
  questionId: number;
  response: string;
  filename?: string;
};

export const SAVE_QUESTIONS: TypedDocumentNode<
  TSaveCommonAppResponsesData,
  TSaveCommonAppResponsesInput
> = gql(`
    mutation SaveCommonAppResponses($input: SaveCommonAppFormResponsesMutationInput!) {
      saveCommonAppFormResponses(input: $input) {
        form {
          responses {
            questionId
            response
            filename
          }
        }
        errorCode
        errorMessage
        incompleteResponses
        invalidResponses {
          questionId
          messages
        }
        validResponses
      }
    }
`);

export type TSaveCommonAppResponsesData = {
  saveCommonAppFormResponses: {
    errorCode: string;
    errorMessage: string;
    form: TCommonAppForm;
    incompleteResponses: string[];
    invalidResponses: {
      questionId: string;
      messages: string[];
    }[];
    validResponses: string[];
  };
};

export type TSaveCommonAppResponsesInput = {
  input: {
    type: COMMON_APP_FORM_TYPES;
    studentUuid?: string;
    responses: TCommonAppResponse[];
  };
};

export const SUBMIT_QUESTIONS: TypedDocumentNode<
  TSubmitCommonAppFormData,
  TSubmitCommonAppFormInput
> = gql(`
mutation SubmitCommonAppForm($input: SubmitCommonAppFormResponsesMutationInput!) {
  submitCommonAppFormResponses(input: $input) {
    status
  }
}
`);

export type TSubmitCommonAppFormData = {
  submitCommonAppFormResponses: {
    status: string;
  };
};

export type TSubmitCommonAppFormInput = {
  input: {
    type: COMMON_APP_FORM_TYPES;
    studentUuid?: string;
    institutionId?: string;
  };
};
