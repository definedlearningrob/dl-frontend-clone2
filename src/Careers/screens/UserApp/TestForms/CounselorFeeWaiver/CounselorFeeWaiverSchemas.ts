import { RJSFSchema } from '@rjsf/utils';

import { CommonAppRawQuestions } from '../forms';

export const counselorFeeWaiverFormSchema: RJSFSchema = {
  type: 'object',
  $defs: {},
  properties: {
    '1449': {
      type: 'number',
      oneOf: [
        {
          const: 0,
          title: 'Yes',
        },
        {
          const: 1,
          title: 'No',
        },
      ],
      title:
        'This student indicated that they believe they meet the eligibility requirements for a <a href="https://recsupport.commonapp.org/recommendersupport/s/article/What-do-I-need-to-know-about-the-Common-App-fee-waiver" target="_blank">Common App fee waiver<span class="cdk-visually-hidden">, Opens in new tab</span></a>.<br /><br />To the best of your knowledge, do you believe the student is eligible for a Common App fee waiver?',
      $id: '1449',
    },
    '2064': {
      type: 'string',
      title:
        "You may use this space to provide any additional information in support of this student's fee waiver eligibility.",
      $id: '2064',
      maxLength: 150,
    },
    'Economic Need': {
      type: 'object',
      properties: {},
    },
  },
  required: ['1449'],
  allOf: [],
};

export const counselorFeeWaiverFormUiSchema = {
  '1449': {
    'ui:widget': 'radio',
  },
  'ui:order': ['Economic Need', '1449', '2064'],
};

export const counselorFeeWaiverFormInitialValues = {
  '1449': '',
};

// raw questions data in case we need it

export const counselorFeeWaiverFormRawQuestions: CommonAppRawQuestions = {
  '1449': {
    sectionName: 'Economic Need',
    id: '1449',
    label:
      'This student indicated that they believe they meet the eligibility requirements for a <a href="https://recsupport.commonapp.org/recommendersupport/s/article/What-do-I-need-to-know-about-the-Common-App-fee-waiver" target="_blank">Common App fee waiver<span class="cdk-visually-hidden">, Opens in new tab</span></a>.<br /><br />To the best of your knowledge, do you believe the student is eligible for a Common App fee waiver?',
    type: 'Radio',
    name: 'Economic need question',
    format: null,
    choiceGroup: 'Yes No',
    orderSeq: '10',
    defaultState: 'Required',
    triggeredState: null,
    requirementRule: null,
    dataType: 'String',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: 'NULL',
  },
  '2064': {
    sectionName: 'Economic Need',
    id: '2064',
    label:
      "You may use this space to provide any additional information in support of this student's fee waiver eligibility.",
    type: 'Short',
    name: 'Fee waiver additional information',
    format: null,
    choiceGroup: null,
    orderSeq: '20',
    defaultState: 'Optional',
    triggeredState: null,
    requirementRule: null,
    dataType: 'String',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: '150',
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
};
