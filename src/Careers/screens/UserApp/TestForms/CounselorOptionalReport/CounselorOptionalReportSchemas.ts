import { RJSFSchema } from '@rjsf/utils';

import { CommonAppRawQuestions } from '../forms';
// INFO: 1310 ADDED BY HAND (not supported by parser)
// INFO: commented field 1994 - text moved to schema description
// INFO: Summary header removed and headers added to be conditionally shown
// QUESTION: [1314 1316 1317 1318] - should show only if 1995 contains 1 or always?
// INFO: condition for 1995 added by hand (added 3 and 4) - line 559
// INFO: 1310 added as required to conditionals to avoid form expanding

export const counselorOptionalReportFormSchema: RJSFSchema = {
  type: 'object',
  $defs: {},
  description:
    'Use this form if you need to update submitted reports or add new information for the student. This form is not required.',
  properties: {
    '1995': {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'number',
        anyOf: [
          {
            const: 0,
            title: 'Updated transcript or predicted grades',
          },
          {
            const: 1,
            title: 'Class rank',
          },
          {
            const: 2,
            title: 'Student GPA',
          },
          {
            const: 3,
            title: "Change in student's enrolled courses",
          },
          {
            const: 4,
            title: 'Change to my evaluation',
          },
          {
            const: 5,
            title: 'Other correction or update',
          },
        ],
      },
      title: 'What updates are you making?',
      $id: '1995',
    },
  },
  required: ['1995'],
  allOf: [
    {
      if: {
        properties: {
          '1995': {
            contains: {
              const: 1,
            },
          },
        },
      },
      then: {
        properties: {
          'Class Rank': {
            type: 'object',
            properties: {},
          },
          '1310': {
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
            $id: '1310',
          },
        },
        required: ['1310'],
      },
    },
    {
      if: {
        properties: {
          '1310': {
            const: 1,
          },
        },
        required: ['1310'],
      },
      then: {
        properties: {
          '1311': {
            type: 'integer',
            title: "Applicant's class rank",
            $id: '1311',
            maxLength: 5,
          },
          '1312': {
            type: 'integer',
            title: 'How many additional students share this rank?',
            $id: '1312',
            maxLength: 5,
          },
        },
        required: ['1311', '1312'],
      },
    },
    {
      if: {
        properties: {
          '1310': {
            const: 2,
          },
        },
        required: ['1310'],
      },
      then: {
        properties: {
          '1313': {
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
            $id: '1313',
          },
        },
        required: ['1313'],
      },
    },
    {
      if: {
        properties: {
          '1310': {
            const: 3,
          },
        },
        required: ['1310'],
      },
      then: {
        properties: {
          '1314': {
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
            $id: '1314',
          },
        },
        required: ['1314'],
      },
    },
    {
      if: {
        properties: {
          '1310': {
            const: 4,
          },
        },
        required: ['1310'],
      },
      then: {
        properties: {
          '1315': {
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
            $id: '1315',
          },
        },
        required: ['1315'],
      },
    },
    {
      if: {
        properties: {
          '1310': {
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
        required: ['1310'],
      },
      then: {
        properties: {
          '1316': {
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
            $id: '1316',
          },
          '1317': {
            type: 'string',
            format: 'date',
            title: 'From (start date)',
            $id: '1317',
          },
          '1318': {
            type: 'string',
            format: 'date',
            title: 'Ending (final date)',
            $id: '1318',
          },
        },
        required: ['1316', '1317', '1318'],
      },
    },
    {
      if: {
        properties: {
          '1995': {
            contains: {
              const: 2,
            },
          },
        },
      },
      then: {
        properties: {
          GPA: {
            type: 'object',
            properties: {},
          },
          '1320': {
            type: 'number',
            title: 'Cumulative GPA',
            $id: '1320',
            maxLength: 6,
          },
          '1321': {
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
            $id: '1321',
          },
          '1322': {
            type: 'string',
            format: 'date',
            title: 'From (start date)',
            $id: '1322',
          },
          '1323': {
            type: 'string',
            format: 'date',
            title: 'Ending (final date)',
            $id: '1323',
          },
          '1324': {
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
            $id: '1324',
          },
          '1325': {
            type: 'string',
            title: "School's passing mark",
            $id: '1325',
            maxLength: 6,
          },
          '1326': {
            type: 'string',
            title: 'Highest grade/GPA in class',
            $id: '1326',
            maxLength: 6,
          },
        },
        required: ['1320', '1321', '1322', '1323', '1324', '1325'],
      },
    },
    {
      if: {
        properties: {
          '1995': {
            contains: {
              const: 0,
            },
          },
        },
      },
      then: {
        properties: {
          Transcripts: {
            type: 'object',
            properties: {},
          },
          '1327': {
            type: 'string',
            format: 'data-url',
            title:
              "This is not a substitute for the Midyear or Final Report. Please use this only if you wish to update grades at another point in the year. Attach applicant's current or most recent official transcript, including courses in progress and a transcript legend.",
            $id: '1327',
          },
          '1328': {
            type: 'array',
            uniqueItems: true,
            items: {
              type: 'number',
              anyOf: [
                {
                  const: 0,
                  title:
                    'I affirm that I have uploaded a transcript or other document listing coursework and available grades/marks to this Optional Report. I understand that failure to do so (by, for example, uploading a blank document or uploading a document promising to mail the transcript at a later time) will result in my Common App Online account being closed.',
                },
              ],
            },
            title: 'Transcript Affirmation',
            $id: '1328',
          },
          '1329': {
            type: 'number',
            oneOf: [
              {
                const: 0,
                title: 'Final junior year grades',
              },
              {
                const: 1,
                title: '1st Quarter senior year grades',
              },
              {
                const: 2,
                title: '2nd Quarter/1st Semester senior year grades',
              },
              {
                const: 3,
                title: '3rd Quarter senior year grades',
              },
              {
                const: 4,
                title: '1st Trimester senior year grades',
              },
              {
                const: 5,
                title: '2nd Trimester senior year grades',
              },
              {
                const: 6,
                title: 'Correction',
              },
            ],
            title:
              'Please indicate the most recent grades included on the transcript accompanying this form',
            $id: '1329',
          },
        },
        required: ['1327', '1328', '1329'],
      },
    },
    {
      if: {
        properties: {
          '1995': {
            contains: {
              anyOf: [{ const: 3 }, { const: 4 }, { const: 5 }],
            },
          },
        },
      },
      then: {
        properties: {
          'Other updates': {
            type: 'object',
            properties: {},
          },
          '1334': {
            type: 'string',
            format: 'data-url',
            title:
              "Upload updates for this student's senior year courses, your evaluation, or any other corrections.",
            $id: '1334',
          },
        },
        required: ['1334'],
      },
    },
  ],
};

export const counselorOptionalReportFormUiSchema = {
  '1316': {
    'ui:widget': 'radio',
  },
  '1317': {
    'ui:options': {
      yearsRange: ['1952', '2028'],
    },
    'ui:widget': 'MonthYearWidget',
  },
  '1318': {
    'ui:options': {
      yearsRange: ['1952', '2028'],
    },
    'ui:widget': 'MonthYearWidget',
  },
  '1322': {
    'ui:options': {
      yearsRange: ['1952', '2028'],
    },
    'ui:widget': 'MonthYearWidget',
  },
  '1323': {
    'ui:options': {
      yearsRange: ['1952', '2028'],
    },
    'ui:widget': 'MonthYearWidget',
  },
  '1324': {
    'ui:widget': 'radio',
  },
  '1327': {
    'ui:options': {
      accept: '.pdf',
    },
  },
  '1328': {
    'ui:widget': 'checkboxes',
  },
  '1334': {
    'ui:options': {
      accept: '.pdf',
    },
  },
  '1995': {
    'ui:widget': 'checkboxes',
  },
  'ui:order': [
    '1994',
    '1995',
    'Class Rank',
    '1310',
    '1311',
    '1312',
    '1313',
    '1314',
    '1315',
    '1316',
    '1317',
    '1318',
    'GPA',
    '1320',
    '1321',
    '1322',
    '1323',
    '1324',
    '1325',
    '1326',
    'Transcripts',
    '1327',
    '1328',
    '1329',
    'Other updates',
    '1334',
    'Summary',
  ],
};

export const counselorOptionalReportFormInitialValues = {
  '1995': [],
};

// raw questions data in case we need it

export const counselorOptionalReportFormRawQuestions: CommonAppRawQuestions = {
  '1310': {
    sectionName: 'Class Rank',
    id: '1310',
    label: 'How do you report class rank?',
    type: 'SingleSelectDropdown',
    name: 'OR Class Rank reporting',
    format: null,
    choiceGroup: 'Class Rank reporting',
    orderSeq: '10',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR Class Rank Display',
    dataType: 'String',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '1311': {
    sectionName: 'Class Rank',
    id: '1311',
    label: "Applicant's class rank",
    type: 'Short',
    name: 'OR Exact Class rank',
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
  '1312': {
    sectionName: 'Class Rank',
    id: '1312',
    label: 'How many additional students share this rank?',
    type: 'Short',
    name: 'OR Students Sharing Rank',
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
  '1313': {
    sectionName: 'Class Rank',
    id: '1313',
    label: "Applicant's decile rank",
    type: 'SingleSelectDropdown',
    name: 'OR Decile Rank',
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
  '1314': {
    sectionName: 'Class Rank',
    id: '1314',
    label: "Applicant's quintile rank",
    type: 'SingleSelectDropdown',
    name: 'OR Quintile Rank',
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
  '1315': {
    sectionName: 'Class Rank',
    id: '1315',
    label: "Applicant's quartile rank",
    type: 'SingleSelectDropdown',
    name: 'OR Quartile Rank',
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
  '1316': {
    sectionName: 'Class Rank',
    id: '1316',
    label: 'Rank weighting',
    type: 'Radio',
    name: 'OR Rank weighting',
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
  '1317': {
    sectionName: 'Class Rank',
    id: '1317',
    label: 'From (start date)',
    type: 'Month (MM/YYYY)',
    name: 'OR Class rank start date',
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
  '1318': {
    sectionName: 'Class Rank',
    id: '1318',
    label: 'Ending (final date)',
    type: 'Month (MM/YYYY)',
    name: 'OR Class rank end date',
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
  '1320': {
    sectionName: 'GPA',
    id: '1320',
    label: 'Cumulative GPA',
    type: 'Short',
    name: 'OR Cumulative GPA',
    format: null,
    choiceGroup: null,
    orderSeq: '20',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR GPA details display',
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
  '1321': {
    sectionName: 'GPA',
    id: '1321',
    label: 'GPA Scale',
    type: 'SingleSelectDropdown',
    name: 'OR GPA Scale',
    format: null,
    choiceGroup: 'REC GPA Scale',
    orderSeq: '30',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR GPA details display',
    dataType: 'Integer',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '1322': {
    sectionName: 'GPA',
    id: '1322',
    label: 'From (start date)',
    type: 'Month (MM/YYYY)',
    name: 'OR GPA Start date',
    format: null,
    choiceGroup: null,
    orderSeq: '40',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR GPA details display',
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
  '1323': {
    sectionName: 'GPA',
    id: '1323',
    label: 'Ending (final date)',
    type: 'Month (MM/YYYY)',
    name: 'OR GPA end date',
    format: null,
    choiceGroup: null,
    orderSeq: '50',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR GPA details display',
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
  '1324': {
    sectionName: 'GPA',
    id: '1324',
    label: 'GPA weighting',
    type: 'Radio',
    name: 'OR GPA Weighting',
    format: null,
    choiceGroup: 'Weighting',
    orderSeq: '60',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR GPA details display',
    dataType: 'Integer',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '1325': {
    sectionName: 'GPA',
    id: '1325',
    label: "School's passing mark",
    type: 'Short',
    name: 'OR School passing mark',
    format: null,
    choiceGroup: null,
    orderSeq: '70',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR GPA details display',
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
  '1326': {
    sectionName: 'GPA',
    id: '1326',
    label: 'Highest grade/GPA in class',
    type: 'Short',
    name: 'OR Highest class GPA',
    format: null,
    choiceGroup: null,
    orderSeq: '80',
    defaultState: 'Hidden',
    triggeredState: 'Optional',
    requirementRule: 'OR GPA details display optional',
    dataType: 'String',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: '6',
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '1327': {
    sectionName: 'Transcripts',
    id: '1327',
    label:
      "This is not a substitute for the Midyear or Final Report. Please use this only if you wish to update grades at another point in the year. Attach applicant's current or most recent official transcript, including courses in progress and a transcript legend.",
    type: 'Upload',
    name: 'OR Transcript',
    format: null,
    choiceGroup: null,
    orderSeq: '10',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR Transcript Display',
    dataType: null,
    minWordsYear: null,
    maxWordsYearKb: '2000',
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '1328': {
    sectionName: 'Transcripts',
    id: '1328',
    label: 'Transcript Affirmation',
    type: 'Checkbox',
    name: 'OR Transcript affirmation',
    format: null,
    choiceGroup: 'OR Transcript Affirmation',
    orderSeq: '20',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR Transcript Display',
    dataType: 'String',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '1329': {
    sectionName: 'Transcripts',
    id: '1329',
    label:
      'Please indicate the most recent grades included on the transcript accompanying this form',
    type: 'SingleSelectDropdown',
    name: 'OR Transcript grades',
    format: null,
    choiceGroup: 'Transcript grade inclusion for MR and FR',
    orderSeq: '30',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR Transcript Display',
    dataType: 'String',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '1334': {
    sectionName: 'Other updates',
    id: '1334',
    label:
      "Upload updates for this student's senior year courses, your evaluation, or any other corrections.",
    type: 'Upload',
    name: 'OR Change explanation upload',
    format: null,
    choiceGroup: null,
    orderSeq: '50',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR Change explanation upload',
    dataType: null,
    minWordsYear: null,
    maxWordsYearKb: '2000',
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '1994': {
    sectionName: 'Summary',
    id: '1994',
    label:
      'Use this form if you need to update submitted reports or add new information for the student. This form is not required.',
    type: 'Text',
    name: 'Instructional text',
    format: null,
    choiceGroup: null,
    orderSeq: '5',
    defaultState: 'Optional',
    triggeredState: null,
    requirementRule: null,
    dataType: null,
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '1995': {
    sectionName: 'Summary',
    id: '1995',
    label: 'What updates are you making?',
    type: 'Checkbox',
    name: 'OR updates',
    format: null,
    choiceGroup: 'OR Updates',
    orderSeq: '10',
    defaultState: 'Required',
    triggeredState: null,
    requirementRule: null,
    dataType: null,
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
};
