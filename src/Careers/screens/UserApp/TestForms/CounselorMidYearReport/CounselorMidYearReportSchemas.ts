import { RJSFSchema } from '@rjsf/utils';

import { CommonAppRawQuestions } from '../forms';

// INFO: manually added condition for field number 1357 (line 518)

export const counselorMidYearReportFormSchema: RJSFSchema = {
  type: 'object',
  $defs: {},
  properties: {
    '1337': {
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
      $id: '1337',
    },
    '1346': {
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
      $id: '1346',
    },
    '1354': {
      type: 'string',
      format: 'data-url',
      title:
        "Attach applicant's current or most recent official transcript, including courses in progress and a transcript legend.",
      $id: '1354',
    },
    '1355': {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'number',
        anyOf: [
          {
            const: 0,
            title:
              'I affirm that I have uploaded a transcript or other document listing coursework and available grades/marks to this Mid Year Report. I understand that failure to do so (by, for example, uploading a blank document or uploading a document promising to mail the transcript at a later time) will result in my Common App Online account being closed.',
          },
        ],
      },
      title: 'Transcript Affirmation',
      $id: '1355',
    },
    '1356': {
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
      $id: '1356',
    },
    '1357': {
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
      $id: '1357',
    },
    '1360': {
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
      $id: '1360',
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
    Summary: {
      type: 'object',
      properties: {},
    },
  },
  required: ['1337', '1346', '1354', '1355', '1356', '1357', '1360'],
  allOf: [
    {
      if: {
        properties: {
          '1337': {
            const: 1,
          },
        },
      },
      then: {
        properties: {
          '1338': {
            type: 'integer',
            title: "Applicant's class rank",
            $id: '1338',
            maxLength: 5,
          },
          '1339': {
            type: 'integer',
            title: 'How many additional students share this rank?',
            $id: '1339',
            maxLength: 5,
          },
        },
        required: ['1338', '1339'],
      },
    },
    {
      if: {
        properties: {
          '1337': {
            const: 2,
          },
        },
      },
      then: {
        properties: {
          '1340': {
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
            $id: '1340',
          },
        },
        required: ['1340'],
      },
    },
    {
      if: {
        properties: {
          '1337': {
            const: 3,
          },
        },
      },
      then: {
        properties: {
          '1341': {
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
            $id: '1341',
          },
        },
        required: ['1341'],
      },
    },
    {
      if: {
        properties: {
          '1337': {
            const: 4,
          },
        },
      },
      then: {
        properties: {
          '1342': {
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
            $id: '1342',
          },
        },
        required: ['1342'],
      },
    },
    {
      if: {
        properties: {
          '1337': {
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
          '1343': {
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
            $id: '1343',
          },
          '1344': {
            type: 'string',
            format: 'date',
            title: 'From (start date)',
            $id: '1344',
          },
          '1345': {
            type: 'string',
            format: 'date',
            title: 'Ending (final date)',
            $id: '1345',
          },
        },
        required: ['1343', '1344', '1345'],
      },
    },
    {
      if: {
        properties: {
          '1346': {
            const: 0,
          },
        },
      },
      then: {
        properties: {
          '1347': {
            type: 'number',
            title: 'Cumulative GPA',
            $id: '1347',
            maxLength: 6,
          },
          '1348': {
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
            $id: '1348',
          },
          '1349': {
            type: 'string',
            format: 'date',
            title: 'From (start date)',
            $id: '1349',
          },
          '1350': {
            type: 'string',
            format: 'date',
            title: 'Ending (final date)',
            $id: '1350',
          },
          '1351': {
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
            $id: '1351',
          },
          '1352': {
            type: 'string',
            title: "School's passing mark",
            $id: '1352',
            maxLength: 6,
          },
          '1353': {
            type: 'string',
            title: 'Highest grade/GPA in class',
            $id: '1353',
            maxLength: 6,
          },
        },
        required: ['1347', '1348', '1349', '1350', '1351', '1352'],
      },
    },
    {
      if: {
        anyOf: [
          {
            properties: {
              '1357': {
                const: 0,
              },
            },
          },
          {
            properties: {
              '1360': {
                const: 0,
              },
            },
          },
        ],
      },
      then: {
        properties: {
          '1361': {
            type: 'string',
            format: 'data-url',
            title:
              'Since you answered yes to one of the preceding questions, please attach an explanation.',
            $id: '1361',
          },
        },
        required: ['1361'],
      },
    },
  ],
};

export const counselorMidYearReportFormUiSchema = {
  '1343': {
    'ui:widget': 'radio',
  },
  '1344': {
    'ui:options': {
      yearsRange: ['1952', '2028'],
    },
    'ui:widget': 'MonthYearWidget',
  },
  '1345': {
    'ui:options': {
      yearsRange: ['1952', '2028'],
    },
    'ui:widget': 'MonthYearWidget',
  },
  '1346': {
    'ui:widget': 'radio',
  },
  '1349': {
    'ui:options': {
      yearsRange: ['1952', '2028'],
    },
    'ui:widget': 'MonthYearWidget',
  },
  '1350': {
    'ui:options': {
      yearsRange: ['1952', '2028'],
    },
    'ui:widget': 'MonthYearWidget',
  },
  '1351': {
    'ui:widget': 'radio',
  },
  '1354': {
    'ui:options': {
      accept: '.pdf',
    },
  },
  '1355': {
    'ui:widget': 'checkboxes',
  },
  '1357': {
    'ui:widget': 'radio',
  },
  '1360': {
    'ui:widget': 'radio',
  },
  '1361': {
    'ui:options': {
      accept: '.pdf',
    },
  },
  'ui:order': [
    'Class Rank',
    '1337',
    '1338',
    '1339',
    '1340',
    '1341',
    '1342',
    '1343',
    '1344',
    '1345',
    'GPA',
    '1346',
    '1347',
    '1348',
    '1349',
    '1350',
    '1351',
    '1352',
    '1353',
    'Transcripts',
    '1354',
    '1355',
    '1356',
    'Summary',
    '1357',
    '1360',
    '1361',
  ],
};

export const counselorMidYearReportFormInitialValues = {
  '1337': '',
  '1346': '',
  '1355': [],
  '1357': '',
  '1360': '',
};

// raw questions data in case we need it

export const counselorMidYearReportFormRawQuestions: CommonAppRawQuestions = {
  '1337': {
    sectionName: 'Class Rank',
    id: '1337',
    label: 'How do you report class rank?',
    type: 'SingleSelectDropdown',
    name: 'MR Class Rank reporting',
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
  '1338': {
    sectionName: 'Class Rank',
    id: '1338',
    label: "Applicant's class rank",
    type: 'Short',
    name: 'MR Exact Class rank',
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
  '1339': {
    sectionName: 'Class Rank',
    id: '1339',
    label: 'How many additional students share this rank?',
    type: 'Short',
    name: 'MR Students Sharing Rank',
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
  '1340': {
    sectionName: 'Class Rank',
    id: '1340',
    label: "Applicant's decile rank",
    type: 'SingleSelectDropdown',
    name: 'MR Decile Rank',
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
  '1341': {
    sectionName: 'Class Rank',
    id: '1341',
    label: "Applicant's quintile rank",
    type: 'SingleSelectDropdown',
    name: 'MR Quintile Rank',
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
  '1342': {
    sectionName: 'Class Rank',
    id: '1342',
    label: "Applicant's quartile rank",
    type: 'SingleSelectDropdown',
    name: 'MR Quartile Rank',
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
  '1343': {
    sectionName: 'Class Rank',
    id: '1343',
    label: 'Rank weighting',
    type: 'Radio',
    name: 'MR Rank weighting',
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
  '1344': {
    sectionName: 'Class Rank',
    id: '1344',
    label: 'From (start date)',
    type: 'Month (MM/YYYY)',
    name: 'MR Class rank start date',
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
  '1345': {
    sectionName: 'Class Rank',
    id: '1345',
    label: 'Ending (final date)',
    type: 'Month (MM/YYYY)',
    name: 'MR Class rank end date',
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
  '1346': {
    sectionName: 'GPA',
    id: '1346',
    label: 'Do you report GPA (Grade Point Average)?',
    type: 'Radio',
    name: 'MR GPA Reporting',
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
  '1347': {
    sectionName: 'GPA',
    id: '1347',
    label: 'Cumulative GPA',
    type: 'Short',
    name: 'MR Cumulative GPA',
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
  '1348': {
    sectionName: 'GPA',
    id: '1348',
    label: 'GPA Scale',
    type: 'SingleSelectDropdown',
    name: 'MR GPA Scale',
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
  '1349': {
    sectionName: 'GPA',
    id: '1349',
    label: 'From (start date)',
    type: 'Month (MM/YYYY)',
    name: 'MR GPA Start date',
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
  '1350': {
    sectionName: 'GPA',
    id: '1350',
    label: 'Ending (final date)',
    type: 'Month (MM/YYYY)',
    name: 'MR GPA end date',
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
  '1351': {
    sectionName: 'GPA',
    id: '1351',
    label: 'GPA weighting',
    type: 'Radio',
    name: 'MR GPA Weighting',
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
  '1352': {
    sectionName: 'GPA',
    id: '1352',
    label: "School's passing mark",
    type: 'Short',
    name: 'MR School passing mark',
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
  '1353': {
    sectionName: 'GPA',
    id: '1353',
    label: 'Highest grade/GPA in class',
    type: 'Short',
    name: 'MR Highest class GPA',
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
  '1354': {
    sectionName: 'Transcripts',
    id: '1354',
    label:
      "Attach applicant's current or most recent official transcript, including courses in progress and a transcript legend.",
    type: 'Upload',
    name: 'MR Transcript',
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
  '1355': {
    sectionName: 'Transcripts',
    id: '1355',
    label: 'Transcript Affirmation',
    type: 'Checkbox',
    name: 'MR Transcript affirmation',
    format: null,
    choiceGroup: 'MR Transcript Affirmation',
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
  '1356': {
    sectionName: 'Transcripts',
    id: '1356',
    label:
      'Please indicate the most recent grades included on the transcript accompanying this form',
    type: 'SingleSelectDropdown',
    name: 'MR Transcript grades',
    format: null,
    choiceGroup: 'Transcript grade inclusion for MR and FR',
    orderSeq: '30',
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
  '1357': {
    sectionName: 'Summary',
    id: '1357',
    label:
      'Have there been any changes to the senior year courses sent with the original School Report',
    type: 'Radio',
    name: 'MR Course change',
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
  '1360': {
    sectionName: 'Summary',
    id: '1360',
    label: 'Do you wish to update your original evaluation of this applicant?',
    type: 'Radio',
    name: 'MR Original evaluation change',
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
  '1361': {
    sectionName: 'Summary',
    id: '1361',
    label:
      'Since you answered yes to one of the preceding questions, please attach an explanation.',
    type: 'Upload',
    name: 'MR Change explanation upload',
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
