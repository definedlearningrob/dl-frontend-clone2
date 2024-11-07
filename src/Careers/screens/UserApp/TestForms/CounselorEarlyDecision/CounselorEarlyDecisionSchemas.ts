import { RJSFSchema } from '@rjsf/utils';

import { CommonAppRawQuestions } from '../forms';

export const counselorEarlyDecisionFormSchema: RJSFSchema = {
  type: 'object',
  $defs: {},
  properties: {
    '1499': {
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
      $id: '1499',
    },
    Agreement: {
      type: 'object',
      properties: {},
    },
  },
  required: ['1499'],
  allOf: [
    {
      if: {
        properties: {
          '1499': {
            contains: {
              const: 0,
            },
          },
        },
      },
      then: {
        properties: {
          '1500': {
            type: 'string',
            title: 'Signature',
            $id: '1500',
            maxLength: 60,
          },
          '1501': {
            type: 'string',
            format: 'date',
            title: 'Date',
            $id: '1501',
          },
        },
        required: ['1500', '1501'],
      },
    },
  ],
};

export const counselorEarlyDecisionFormUiSchema = {
  '1499': {
    'ui:widget': 'checkboxes',
  },
  '1501': {
    'ui:options': {
      yearsRange: ['2023', '2024'],
    },
  },
  'ui:order': ['Agreement', '1499', '1500', '1501'],
};

export const counselorEarlyDecisionFormInitialValues = {
  '1499': [],
};

// raw questions data in case we need it

export const counselorEarlyDecisionFormRawQuestions: CommonAppRawQuestions = {
  '1499': {
    sectionName: 'Agreement',
    id: '1499',
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
  '1500': {
    sectionName: 'Agreement',
    id: '1500',
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
  '1501': {
    sectionName: 'Agreement',
    id: '1501',
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
