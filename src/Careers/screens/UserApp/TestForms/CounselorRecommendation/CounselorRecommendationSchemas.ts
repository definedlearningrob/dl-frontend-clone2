import { RJSFSchema, UiSchema } from '@rjsf/utils';

import { CommonAppRawQuestions } from '../forms';

export const counselorRecommendationSchema: RJSFSchema = {
  type: 'object',
  $defs: {},
  properties: {
    '1283': {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'number',
        anyOf: [
          {
            const: 0,
            title: 'I will not be sending an evaluation for this student.',
          },
        ],
      },
      title:
        "Counselor evaluations often provide invaluable context to a student's application. We recognize, however, that you may not be able to provide one. If you <b>will not be providing</b> a personal written evaluation, please check the box below to inform our member institutions that you will not supply a written evaluation. Note you may substitute another school official's evaluation in place of one from you personally.",
      $id: '1283',
    },
    '1824': {
      type: 'string',
      title:
        '<b>You can submit this form only one time for this applicant. Your responses and all accompanying documents will be shared with all of the colleges to which the applicant applies. For that reason, you should not tailor this form for any particular institution. Once you submit, you will be unable to modify these forms or documents in any way.</b><br/><br/>How long have you known this student and in what context?',
      $id: '1824',
      maxLength: 100,
    },
    '1825': {
      type: 'string',
      title: 'What are the first words that come to your mind to describe this student?',
      $id: '1825',
      maxLength: 150,
    },
    '1826': {
      type: 'string',
      format: 'data-url',
      title:
        "Please provide comments that will help us differentiate this student from others. We especially welcome a broad-based assessment and encourage you to consider describing or addressing: <ul><li>The applicant's academic, extracurricular, and personal characteristics.</li><li>Relevant context for the applicant's performance and involvement, such as particularities of family situation or after-school obligations, either positive or negative.</li><li>Observed problematic behaviors, perhaps separable from academic performance, that an admission committee should explore further.</li></ul>",
      $id: '1826',
    },
    '1827': {
      type: 'string',
      title: 'OR In the space provided below provide a short evaluation.',
      $id: '1827',
    },
    'Written Evaluation': {
      type: 'object',
      properties: {},
    },
  },
  required: [],
  allOf: [
    {
      if: {
        properties: {
          '1283': {
            contains: {
              const: 0,
            },
          },
        },
      },
      then: {
        properties: {
          '1831': {
            type: 'string',
            title: 'If you wish to provide additional details, you may do so here:',
            $id: '1831',
          },
        },
        required: [],
      },
    },
  ],
};

export const counselorRecommendationUiSchema: UiSchema = {
  '1283': {
    'ui:widget': 'checkboxes',
  },
  '1826': {
    'ui:options': {
      accept: '.pdf',
    },
  },
  '1827': {
    'ui:widget': 'textarea',
  },
  '1831': {
    'ui:widget': 'textarea',
  },
  'ui:order': ['Written Evaluation', '1824', '1825', '1826', '1827', '1283', '1831'],
};

export const counselorRecommendationInitialValues = {
  '1283': [],
};

// raw questions data in case we need it

export const counselorRecommendationRawQuestions: CommonAppRawQuestions = {
  '1283': {
    sectionName: 'Written Evaluation',
    id: '1283',
    label:
      "Counselor evaluations often provide invaluable context to a student's application. We recognize, however, that you may not be able to provide one. If you <b>will not be providing</b> a personal written evaluation, please check the box below to inform our member institutions that you will not supply a written evaluation. Note you may substitute another school official's evaluation in place of one from you personally.",
    type: 'Checkbox',
    name: 'CR Evaluation possible',
    format: null,
    choiceGroup: 'Evaluation Possibility',
    orderSeq: '50',
    defaultState: 'Optional',
    triggeredState: null,
    requirementRule: null,
    dataType: 'String',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: 'Please provide an evaluation for this applicant.',
  },
  '1824': {
    sectionName: 'Written Evaluation',
    id: '1824',
    label:
      '<b>You can submit this form only one time for this applicant. Your responses and all accompanying documents will be shared with all of the colleges to which the applicant applies. For that reason, you should not tailor this form for any particular institution. Once you submit, you will be unable to modify these forms or documents in any way.</b><br/><br/>How long have you known this student and in what context?',
    type: 'Short',
    name: 'CR Knowing applicant',
    format: null,
    choiceGroup: null,
    orderSeq: '10',
    defaultState: 'Optional',
    triggeredState: null,
    requirementRule: null,
    dataType: 'String',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: '100',
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '1825': {
    sectionName: 'Written Evaluation',
    id: '1825',
    label: 'What are the first words that come to your mind to describe this student?',
    type: 'Short',
    name: 'CR Describing student',
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
  '1826': {
    sectionName: 'Written Evaluation',
    id: '1826',
    label:
      "Please provide comments that will help us differentiate this student from others. We especially welcome a broad-based assessment and encourage you to consider describing or addressing: <ul><li>The applicant's academic, extracurricular, and personal characteristics.</li><li>Relevant context for the applicant's performance and involvement, such as particularities of family situation or after-school obligations, either positive or negative.</li><li>Observed problematic behaviors, perhaps separable from academic performance, that an admission committee should explore further.</li></ul>",
    type: 'Upload',
    name: 'CR Detailed evaluation',
    format: null,
    choiceGroup: null,
    orderSeq: '30',
    defaultState: 'Optional',
    triggeredState: null,
    requirementRule: null,
    dataType: null,
    minWordsYear: null,
    maxWordsYearKb: '2000',
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: 'Please provide an evaluation for this applicant.',
  },
  '1827': {
    sectionName: 'Written Evaluation',
    id: '1827',
    label: 'OR In the space provided below provide a short evaluation.',
    type: 'Long',
    name: 'CR Detailed evaluation long',
    format: null,
    choiceGroup: null,
    orderSeq: '40',
    defaultState: 'Optional',
    triggeredState: null,
    requirementRule: null,
    dataType: null,
    minWordsYear: null,
    maxWordsYearKb: '1000',
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: 'Please provide an evaluation for this applicant.',
  },
  '1831': {
    sectionName: 'Written Evaluation',
    id: '1831',
    label: 'If you wish to provide additional details, you may do so here:',
    type: 'Long',
    name: 'CR No evaluation reason',
    format: null,
    choiceGroup: null,
    orderSeq: '60',
    defaultState: 'Hidden',
    triggeredState: 'Optional',
    requirementRule: 'CR No evaluation details',
    dataType: null,
    minWordsYear: null,
    maxWordsYearKb: '250',
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
};
