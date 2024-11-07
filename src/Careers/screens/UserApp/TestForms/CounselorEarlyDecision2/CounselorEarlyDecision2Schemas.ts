import { RJSFSchema } from '@rjsf/utils';

import { CommonAppRawQuestions } from '../forms';

export const counselorEarlyDecision2FormSchema: RJSFSchema = {
  type: 'object',
  $defs: {},
  properties: {
    '1730': {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'number',
        anyOf: [
          {
            const: 0,
            title:
              'As the counselor, I have advised the student to abide by the Early Decision commitment outlined above.',
          },
        ],
      },
      title:
        '<br/>If the student is accepted under an Early Decision plan, the student must promptly withdraw the applications submitted to other colleges and universities and make no additional applications to any other university in any country. If the student is an Early Decision candidate and is seeking financial aid, the student need not withdraw other applications until the student has received notification about financial aid from the admitting Early Decision institution. <br/><br/>For more information about the Early Decision plan, please refer to <a href="https://www.commonapp.org/about/guiding-principles" target="_blank">Common App\'s Guiding Principles<span class="cdk-visually-hidden">, Opens in new tab</span></a>.',
      $id: '1730',
    },
    Agreement: {
      type: 'object',
      properties: {},
    },
  },
  required: ['1730'],
  allOf: [
    {
      if: {
        properties: {
          '1730': {
            contains: {
              const: 0,
            },
          },
        },
      },
      then: {
        properties: {
          '1731': {
            type: 'string',
            title: 'Signature',
            $id: '1731',
            maxLength: 60,
          },
          '1732': {
            type: 'string',
            format: 'date',
            title: 'Date',
            $id: '1732',
          },
        },
        required: ['1731', '1732'],
      },
    },
  ],
};

export const counselorEarlyDecision2FormUiSchema = {
  '1730': {
    'ui:widget': 'checkboxes',
  },
  '1732': {
    'ui:options': {
      yearsRange: ['2023', '2024'],
    },
  },
  'ui:order': ['Agreement', '1730', '1731', '1732'],
};

export const counselorEarlyDecisionForm2InitialValues = {
  '1730': [],
};

// raw questions data in case we need it

export const counselorEarlyDecisionForm2RawQuestions: CommonAppRawQuestions = {
  '1730': {
    sectionName: 'Agreement',
    id: '1730',
    label:
      '<br/>If the student is accepted under an Early Decision plan, the student must promptly withdraw the applications submitted to other colleges and universities and make no additional applications to any other university in any country. If the student is an Early Decision candidate and is seeking financial aid, the student need not withdraw other applications until the student has received notification about financial aid from the admitting Early Decision institution. <br/><br/>For more information about the Early Decision plan, please refer to <a href="https://www.commonapp.org/about/guiding-principles" target="_blank">Common App\'s Guiding Principles<span class="cdk-visually-hidden">, Opens in new tab</span></a>.',
    type: 'Checkbox',
    name: 'Counselor Affirmation',
    format: null,
    choiceGroup: 'Counselor ED affirmation',
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
    groupValidation: null,
  },
  '1731': {
    sectionName: 'Agreement',
    id: '1731',
    label: 'Signature',
    type: 'Short',
    name: 'Counselor Signature',
    format: null,
    choiceGroup: null,
    orderSeq: '20',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'Counselor affirmation YES',
    dataType: 'String',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: '60',
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '1732': {
    sectionName: 'Agreement',
    id: '1732',
    label: 'Date',
    type: 'Date (MM/DD/YYYY)',
    name: 'Counselor Date',
    format: null,
    choiceGroup: null,
    orderSeq: '30',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'Counselor affirmation YES',
    dataType: 'Date',
    minWordsYear: '2023',
    maxWordsYearKb: '2024',
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
};
