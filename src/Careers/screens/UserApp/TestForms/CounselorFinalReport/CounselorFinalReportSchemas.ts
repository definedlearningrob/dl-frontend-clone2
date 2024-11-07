import { RJSFSchema } from '@rjsf/utils';

import { CommonAppRawQuestions } from '../forms';

// INFO: manually added condition for field number 1382 (line 494)

export const counselorFinalReportFormSchema: RJSFSchema = {
  type: 'object',
  $defs: {},
  properties: {
    '1048': {
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
      title: 'Did or will the student graduate as anticipated this year?',
      $id: '1048',
    },
    '1363': {
      type: 'number',
      oneOf: [
        {
          const: 1,
          title: 'Exact',
        },
        {
          const: 2,
          title: 'Decile',
        },
        {
          const: 3,
          title: 'Quintile',
        },
        {
          const: 4,
          title: 'Quartile',
        },
        {
          const: 5,
          title: 'None',
        },
      ],
      title: 'How do you report class rank?',
      $id: '1363',
    },
    '1372': {
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
      title: 'Do you report GPA (Grade Point Average)?',
      $id: '1372',
    },
    '1380': {
      type: 'string',
      format: 'data-url',
      title: "Attach applicant's final official transcript, including a transcript legend.",
      $id: '1380',
    },
    '1381': {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'number',
        anyOf: [
          {
            const: 0,
            title:
              'I affirm that I have uploaded a transcript to this Final Report. I understand that failure to do so (by, for example, uploading a blank document or uploading a document promising to mail the transcript at a later time) will result in my Common App Online account being closed.',
          },
        ],
      },
      title: 'Transcript Affirmation',
      $id: '1381',
    },
    '1382': {
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
        'Have there been any changes to the senior year courses sent with the original School Report',
      $id: '1382',
    },
    '1385': {
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
      title: 'Do you wish to update your original evaluation of this applicant?',
      $id: '1385',
    },
    Summary: {
      type: 'object',
      properties: {},
    },
    'Class Rank': {
      type: 'object',
      properties: {},
    },
    GPA: {
      type: 'object',
      properties: {},
    },
    Transcripts: {
      type: 'object',
      properties: {},
    },
  },
  required: ['1048', '1363', '1372', '1380', '1381', '1382', '1385'],
  allOf: [
    {
      if: {
        properties: {
          '1363': {
            const: 1,
          },
        },
      },
      then: {
        properties: {
          '1364': {
            type: 'integer',
            title: "Applicant's class rank",
            $id: '1364',
            maxLength: 5,
          },
          '1365': {
            type: 'integer',
            title: 'How many additional students share this rank?',
            $id: '1365',
            maxLength: 5,
          },
        },
        required: ['1364', '1365'],
      },
    },
    {
      if: {
        properties: {
          '1363': {
            const: 2,
          },
        },
      },
      then: {
        properties: {
          '1366': {
            type: 'number',
            oneOf: [
              {
                const: 1,
                title: 'Top 10%',
              },
              {
                const: 2,
                title: 'Top 20%',
              },
              {
                const: 3,
                title: 'Top 30%',
              },
              {
                const: 4,
                title: 'Top 40%',
              },
              {
                const: 5,
                title: 'Top 50%',
              },
              {
                const: 6,
                title: 'Top 60%',
              },
              {
                const: 7,
                title: 'Top 70%',
              },
              {
                const: 8,
                title: 'Top 80%',
              },
              {
                const: 9,
                title: 'Top 90%',
              },
              {
                const: 10,
                title: 'Top 100%',
              },
            ],
            title: "Applicant's decile rank",
            $id: '1366',
          },
        },
        required: ['1366'],
      },
    },
    {
      if: {
        properties: {
          '1363': {
            const: 3,
          },
        },
      },
      then: {
        properties: {
          '1367': {
            type: 'number',
            oneOf: [
              {
                const: 1,
                title: 'Top 20%',
              },
              {
                const: 2,
                title: 'Top 40%',
              },
              {
                const: 3,
                title: 'Top 60%',
              },
              {
                const: 4,
                title: 'Top 80%',
              },
              {
                const: 5,
                title: 'Top 100%',
              },
            ],
            title: "Applicant's quintile rank",
            $id: '1367',
          },
        },
        required: ['1367'],
      },
    },
    {
      if: {
        properties: {
          '1363': {
            const: 4,
          },
        },
      },
      then: {
        properties: {
          '1368': {
            type: 'number',
            oneOf: [
              {
                const: 1,
                title: 'Top 25%',
              },
              {
                const: 2,
                title: 'Top 50%',
              },
              {
                const: 3,
                title: 'Top 75%',
              },
              {
                const: 4,
                title: 'Top 100%',
              },
            ],
            title: "Applicant's quartile rank",
            $id: '1368',
          },
        },
        required: ['1368'],
      },
    },
    {
      if: {
        properties: {
          '1363': {
            anyOf: [
              {
                const: 1,
              },
              {
                const: 2,
              },
              {
                const: 3,
              },
              {
                const: 4,
              },
            ],
          },
        },
      },
      then: {
        properties: {
          '1369': {
            type: 'number',
            oneOf: [
              {
                const: 1,
                title: 'Weighted',
              },
              {
                const: 2,
                title: 'Unweighted',
              },
            ],
            title: 'Rank weighting',
            $id: '1369',
          },
          '1370': {
            type: 'string',
            format: 'date',
            title: 'From (start date)',
            $id: '1370',
          },
          '1371': {
            type: 'string',
            format: 'date',
            title: 'Ending (final date)',
            $id: '1371',
          },
        },
        required: ['1369', '1370', '1371'],
      },
    },
    {
      if: {
        properties: {
          '1372': {
            const: 0,
          },
        },
      },
      then: {
        properties: {
          '1373': {
            type: 'number',
            title: 'Cumulative GPA',
            $id: '1373',
            maxLength: 6,
          },
          '1374': {
            type: 'number',
            oneOf: [
              {
                const: 4,
                title: '4',
              },
              {
                const: 5,
                title: '5',
              },
              {
                const: 6,
                title: '6',
              },
              {
                const: 7,
                title: '7',
              },
              {
                const: 8,
                title: '8',
              },
              {
                const: 9,
                title: '9',
              },
              {
                const: 10,
                title: '10',
              },
              {
                const: 11,
                title: '11',
              },
              {
                const: 12,
                title: '12',
              },
              {
                const: 13,
                title: '13',
              },
              {
                const: 14,
                title: '14',
              },
              {
                const: 15,
                title: '15',
              },
              {
                const: 16,
                title: '16',
              },
              {
                const: 17,
                title: '17',
              },
              {
                const: 18,
                title: '18',
              },
              {
                const: 19,
                title: '19',
              },
              {
                const: 20,
                title: '20',
              },
              {
                const: 100,
                title: '100',
              },
            ],
            title: 'GPA Scale',
            $id: '1374',
          },
          '1375': {
            type: 'string',
            format: 'date',
            title: 'From (start date)',
            $id: '1375',
          },
          '1376': {
            type: 'string',
            format: 'date',
            title: 'Ending (final date)',
            $id: '1376',
          },
          '1377': {
            type: 'number',
            oneOf: [
              {
                const: 1,
                title: 'Weighted',
              },
              {
                const: 2,
                title: 'Unweighted',
              },
            ],
            title: 'GPA weighting',
            $id: '1377',
          },
          '1378': {
            type: 'string',
            title: "School's passing mark",
            $id: '1378',
            maxLength: 6,
          },
          '1379': {
            type: 'string',
            title: 'Highest grade/GPA in class',
            $id: '1379',
            maxLength: 6,
          },
        },
        required: ['1373', '1374', '1375', '1376', '1377', '1378'],
      },
    },
    {
      if: {
        anyOf: [
          {
            properties: {
              '1382': {
                const: 0,
              },
            },
          },
          {
            properties: {
              '1385': {
                const: 0,
              },
            },
          },
        ],
      },
      then: {
        properties: {
          '1386': {
            type: 'string',
            format: 'data-url',
            title:
              'Since you answered yes to one of the preceding questions, please attach an explanation.',
            $id: '1386',
          },
        },
        required: ['1386'],
      },
    },
  ],
};

export const counselorFinalReportFormUiSchema = {
  '1048': {
    'ui:widget': 'radio',
  },
  '1369': {
    'ui:widget': 'radio',
  },
  '1370': {
    'ui:options': {
      yearsRange: ['1952', '2028'],
    },
    'ui:widget': 'MonthYearWidget',
  },
  '1371': {
    'ui:options': {
      yearsRange: ['1952', '2028'],
    },
    'ui:widget': 'MonthYearWidget',
  },
  '1372': {
    'ui:widget': 'radio',
  },
  '1375': {
    'ui:options': {
      yearsRange: ['1952', '2028'],
    },
    'ui:widget': 'MonthYearWidget',
  },
  '1376': {
    'ui:options': {
      yearsRange: ['1952', '2028'],
    },
    'ui:widget': 'MonthYearWidget',
  },
  '1377': {
    'ui:widget': 'radio',
  },
  '1380': {
    'ui:options': {
      accept: '.pdf',
    },
  },
  '1381': {
    'ui:widget': 'checkboxes',
  },
  '1382': {
    'ui:widget': 'radio',
  },
  '1385': {
    'ui:widget': 'radio',
  },
  '1386': {
    'ui:options': {
      accept: '.pdf',
    },
  },
  'ui:order': [
    'Summary',
    '1382',
    '1048',
    '1385',
    '1386',
    'Class Rank',
    '1363',
    '1364',
    '1365',
    '1366',
    '1367',
    '1368',
    '1369',
    '1370',
    '1371',
    'GPA',
    '1372',
    '1373',
    '1374',
    '1375',
    '1376',
    '1377',
    '1378',
    '1379',
    'Transcripts',
    '1380',
    '1381',
  ],
};

export const counselorFinalReportFormInitialValues = {
  '1363': '',
  '1372': '',
  '1380': null,
  '1381': [],
  '1382': '',
  '1385': '',
};

// raw questions data in case we need it

export const counselorFinalReportFormRawQuestions: CommonAppRawQuestions = {
  '1048': {
    sectionName: 'Summary',
    id: '1048',
    label: 'Did or will the student graduate as anticipated this year?',
    type: 'Radio',
    name: 'FR Applicant graduated',
    format: null,
    choiceGroup: 'Yes No',
    orderSeq: '33',
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
  '1363': {
    sectionName: 'Class Rank',
    id: '1363',
    label: 'How do you report class rank?',
    type: 'SingleSelectDropdown',
    name: 'FR Class Rank reporting',
    format: null,
    choiceGroup: 'Class Rank reporting',
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
  '1364': {
    sectionName: 'Class Rank',
    id: '1364',
    label: "Applicant's class rank",
    type: 'Short',
    name: 'FR Exact Class rank',
    format: null,
    choiceGroup: null,
    orderSeq: '20',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'Exact class rank display',
    dataType: 'Integer',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: '5',
    allowedCharacters: '[^0-9]',
    validationPattern: null,
    errorMessage:
      'Sorry, we can accept only digits for this answer, please provide a different answer.',
    groupValidation: null,
  },
  '1365': {
    sectionName: 'Class Rank',
    id: '1365',
    label: 'How many additional students share this rank?',
    type: 'Short',
    name: 'FR Students Sharing Rank',
    format: null,
    choiceGroup: null,
    orderSeq: '30',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'Exact class rank display',
    dataType: 'Integer',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: '5',
    allowedCharacters: '[^0-9]',
    validationPattern: null,
    errorMessage:
      'Sorry, we can accept only digits for this answer, please provide a different answer.',
    groupValidation: null,
  },
  '1366': {
    sectionName: 'Class Rank',
    id: '1366',
    label: "Applicant's decile rank",
    type: 'SingleSelectDropdown',
    name: 'FR Decile Rank',
    format: null,
    choiceGroup: 'Decile rank',
    orderSeq: '40',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'Decile rank display',
    dataType: 'Integer',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '1367': {
    sectionName: 'Class Rank',
    id: '1367',
    label: "Applicant's quintile rank",
    type: 'SingleSelectDropdown',
    name: 'FR Quintile Rank',
    format: null,
    choiceGroup: 'Quintile rank',
    orderSeq: '50',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'Quintile rank display',
    dataType: 'Integer',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '1368': {
    sectionName: 'Class Rank',
    id: '1368',
    label: "Applicant's quartile rank",
    type: 'SingleSelectDropdown',
    name: 'FR Quartile Rank',
    format: null,
    choiceGroup: 'Quartile Rank',
    orderSeq: '60',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'Quartile rank display',
    dataType: 'Integer',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '1369': {
    sectionName: 'Class Rank',
    id: '1369',
    label: 'Rank weighting',
    type: 'Radio',
    name: 'FR Rank weighting',
    format: null,
    choiceGroup: 'Weighting',
    orderSeq: '70',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'Rank weighting display',
    dataType: 'Integer',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '1370': {
    sectionName: 'Class Rank',
    id: '1370',
    label: 'From (start date)',
    type: 'Month (MM/YYYY)',
    name: 'FR Class rank start date',
    format: null,
    choiceGroup: null,
    orderSeq: '80',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'Rank weighting display',
    dataType: 'Date',
    minWordsYear: '1952',
    maxWordsYearKb: '2028',
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation:
      'From (start date) must be earlier than Ending (final date). Please correct them.',
  },
  '1371': {
    sectionName: 'Class Rank',
    id: '1371',
    label: 'Ending (final date)',
    type: 'Month (MM/YYYY)',
    name: 'FR Class rank end date',
    format: null,
    choiceGroup: null,
    orderSeq: '90',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'Rank weighting display',
    dataType: 'Date',
    minWordsYear: '1952',
    maxWordsYearKb: '2028',
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation:
      'From (start date) must be earlier than Ending (final date). Please correct them.',
  },
  '1372': {
    sectionName: 'GPA',
    id: '1372',
    label: 'Do you report GPA (Grade Point Average)?',
    type: 'Radio',
    name: 'FR GPA Reporting',
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
    groupValidation: null,
  },
  '1373': {
    sectionName: 'GPA',
    id: '1373',
    label: 'Cumulative GPA',
    type: 'Short',
    name: 'FR Cumulative GPA',
    format: null,
    choiceGroup: null,
    orderSeq: '20',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'GPA details display',
    dataType: 'Double',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: '6',
    allowedCharacters: '[^0-9.]',
    validationPattern: '^[0-9]*?.[0-9]*$',
    errorMessage:
      'Sorry, we can accept only numbers and decimals, please provide a different answer.',
    groupValidation: null,
  },
  '1374': {
    sectionName: 'GPA',
    id: '1374',
    label: 'GPA Scale',
    type: 'SingleSelectDropdown',
    name: 'FR GPA Scale',
    format: null,
    choiceGroup: 'REC GPA Scale',
    orderSeq: '30',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'GPA details display',
    dataType: 'Integer',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '1375': {
    sectionName: 'GPA',
    id: '1375',
    label: 'From (start date)',
    type: 'Month (MM/YYYY)',
    name: 'FR GPA Start date',
    format: null,
    choiceGroup: null,
    orderSeq: '40',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'GPA details display',
    dataType: 'Date',
    minWordsYear: '1952',
    maxWordsYearKb: '2028',
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation:
      'From (start date) must be earlier than Ending (final date). Please correct them.',
  },
  '1376': {
    sectionName: 'GPA',
    id: '1376',
    label: 'Ending (final date)',
    type: 'Month (MM/YYYY)',
    name: 'FR GPA end date',
    format: null,
    choiceGroup: null,
    orderSeq: '50',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'GPA details display',
    dataType: 'Date',
    minWordsYear: '1952',
    maxWordsYearKb: '2028',
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation:
      'From (start date) must be earlier than Ending (final date). Please correct them.',
  },
  '1377': {
    sectionName: 'GPA',
    id: '1377',
    label: 'GPA weighting',
    type: 'Radio',
    name: 'FR GPA Weighting',
    format: null,
    choiceGroup: 'Weighting',
    orderSeq: '60',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'GPA details display',
    dataType: 'Integer',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '1378': {
    sectionName: 'GPA',
    id: '1378',
    label: "School's passing mark",
    type: 'Short',
    name: 'FR School passing mark',
    format: null,
    choiceGroup: null,
    orderSeq: '70',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'GPA details display',
    dataType: 'String',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: '6',
    allowedCharacters: '[^0-9.A-Za-z]',
    validationPattern: '^([a-zA-Z]+)$|^([0-9]+?.[0-9]+)$|^([0-9]+)$',
    errorMessage:
      'Sorry, we can accept only numbers, decimals and alphabets, please provide a different answer.',
    groupValidation: null,
  },
  '1379': {
    sectionName: 'GPA',
    id: '1379',
    label: 'Highest grade/GPA in class',
    type: 'Short',
    name: 'FR Highest class GPA',
    format: null,
    choiceGroup: null,
    orderSeq: '80',
    defaultState: 'Hidden',
    triggeredState: 'Optional',
    requirementRule: 'GPA details display optional',
    dataType: 'String',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: '6',
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '1380': {
    sectionName: 'Transcripts',
    id: '1380',
    label: "Attach applicant's final official transcript, including a transcript legend.",
    type: 'Upload',
    name: 'FR Transcript',
    format: null,
    choiceGroup: null,
    orderSeq: '10',
    defaultState: 'Required',
    triggeredState: null,
    requirementRule: null,
    dataType: null,
    minWordsYear: null,
    maxWordsYearKb: '2000',
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '1381': {
    sectionName: 'Transcripts',
    id: '1381',
    label: 'Transcript Affirmation',
    type: 'Checkbox',
    name: 'FR Transcript affirmation',
    format: null,
    choiceGroup: 'FR Transcript affirmation',
    orderSeq: '20',
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
  '1382': {
    sectionName: 'Summary',
    id: '1382',
    label:
      'Have there been any changes to the senior year courses sent with the original School Report',
    type: 'Radio',
    name: 'FR Course change',
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
    groupValidation: null,
  },
  '1385': {
    sectionName: 'Summary',
    id: '1385',
    label: 'Do you wish to update your original evaluation of this applicant?',
    type: 'Radio',
    name: 'FR Original evaluation change',
    format: null,
    choiceGroup: 'Yes No',
    orderSeq: '40',
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
  '1386': {
    sectionName: 'Summary',
    id: '1386',
    label:
      'Since you answered yes to one of the preceding questions, please attach an explanation.',
    type: 'Upload',
    name: 'FR Change explanation upload',
    format: null,
    choiceGroup: null,
    orderSeq: '50',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'Change upload display',
    dataType: null,
    minWordsYear: null,
    maxWordsYearKb: '2000',
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
};
