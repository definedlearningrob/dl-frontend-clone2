import { RJSFSchema } from '@rjsf/utils';

import { CommonAppRawQuestions } from '../forms';
// INFO: ADDED 1998 BY HAND (not supported by parser)
// INFO: REMOVED 1996 BY HAND not needed
// INFO: Summary header removed and headers added to be conditionally shown
// INFO: 1998 added as required to conditionals to avoid form expanding

export const counselorOptionalReport2FormSchema: RJSFSchema = {
  type: 'object',
  $defs: {},
  description:
    'Use this form if you need to update submitted reports or add new information for the student. This form is not required.',
  properties: {
    '1997': {
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
      $id: '1997',
    },
  },
  required: ['1997'],
  allOf: [
    {
      if: {
        properties: {
          '1997': {
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
          '1998': {
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
            $id: '1998',
          },
        },
        required: ['1998'],
      },
    },
    {
      if: {
        properties: {
          '1998': {
            const: 1,
          },
        },
        required: ['1998'],
      },
      then: {
        properties: {
          '1999': {
            type: 'integer',
            title: "Applicant's class rank",
            $id: '1999',
            maxLength: 5,
          },
          '2000': {
            type: 'integer',
            title: 'How many additional students share this rank?',
            $id: '2000',
            maxLength: 5,
          },
        },
        required: ['1999', '2000'],
      },
    },
    {
      if: {
        properties: {
          '1998': {
            const: 2,
          },
        },
        required: ['1998'],
      },
      then: {
        properties: {
          '2001': {
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
            $id: '2001',
          },
        },
        required: ['2001'],
      },
    },
    {
      if: {
        properties: {
          '1998': {
            const: 3,
          },
        },
        required: ['1998'],
      },
      then: {
        properties: {
          '2002': {
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
            $id: '2002',
          },
        },
        required: ['2002'],
      },
    },
    {
      if: {
        properties: {
          '1998': {
            const: 4,
          },
        },
        required: ['1998'],
      },
      then: {
        properties: {
          '2003': {
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
            $id: '2003',
          },
        },
        required: ['2003'],
      },
    },
    {
      if: {
        properties: {
          '1998': {
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
        required: ['1998'],
      },
      then: {
        properties: {
          '2004': {
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
            $id: '2004',
          },
          '2005': {
            type: 'string',
            format: 'date',
            title: 'From (start date)',
            $id: '2005',
          },
          '2006': {
            type: 'string',
            format: 'date',
            title: 'Ending (final date)',
            $id: '2006',
          },
        },
        required: ['2004', '2005', '2006'],
      },
    },
    {
      if: {
        properties: {
          '1997': {
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
          '2007': {
            type: 'number',
            title: 'Cumulative GPA',
            $id: '2007',
            maxLength: 6,
          },
          '2008': {
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
            $id: '2008',
          },
          '2009': {
            type: 'string',
            format: 'date',
            title: 'From (start date)',
            $id: '2009',
          },
          '2010': {
            type: 'string',
            format: 'date',
            title: 'Ending (final date)',
            $id: '2010',
          },
          '2011': {
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
            $id: '2011',
          },
          '2012': {
            type: 'string',
            title: "School's passing mark",
            $id: '2012',
            maxLength: 6,
          },
          '2013': {
            type: 'string',
            title: 'Highest grade/GPA in class',
            $id: '2013',
            maxLength: 6,
          },
        },
        required: ['2007', '2008', '2009', '2010', '2011', '2012'],
      },
    },
    {
      if: {
        properties: {
          '1997': {
            contains: {
              const: 0,
            },
          },
        },
      },
      then: {
        properties: {
          Transcript: {
            type: 'object',
            properties: {},
          },
          '2014': {
            type: 'string',
            format: 'data-url',
            title:
              "This is not a substitute for the Midyear or Final Report. Please use this only if you wish to update grades at another point in the year. Attach applicant's current or most recent official transcript, including courses in progress and a transcript legend.",
            $id: '2014',
          },
          '2015': {
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
            $id: '2015',
          },
          '2016': {
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
            $id: '2016',
          },
        },
        required: ['2014', '2015', '2016'],
      },
    },
    {
      if: {
        properties: {
          '1997': {
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
          '2017': {
            type: 'string',
            format: 'data-url',
            title:
              "Upload updates for this student's senior year courses, your evaluation, or any other corrections.",
            $id: '2017',
          },
        },
        required: ['2017'],
      },
    },
  ],
};

export const counselorOptionalReport2FormUiSchema = {
  '1997': {
    'ui:widget': 'checkboxes',
  },
  '2004': {
    'ui:widget': 'radio',
  },
  '2005': {
    'ui:options': {
      yearsRange: ['1952', '2028'],
    },
    'ui:widget': 'MonthYearWidget',
  },
  '2006': {
    'ui:options': {
      yearsRange: ['1952', '2028'],
    },
    'ui:widget': 'MonthYearWidget',
  },
  '2009': {
    'ui:options': {
      yearsRange: ['1952', '2028'],
    },
    'ui:widget': 'MonthYearWidget',
  },
  '2010': {
    'ui:options': {
      yearsRange: ['1952', '2028'],
    },
    'ui:widget': 'MonthYearWidget',
  },
  '2011': {
    'ui:widget': 'radio',
  },
  '2014': {
    'ui:options': {
      accept: '.pdf',
    },
  },
  '2015': {
    'ui:widget': 'checkboxes',
  },
  '2017': {
    'ui:options': {
      accept: '.pdf',
    },
  },
  'ui:order': [
    'Summary',
    '1996',
    '1997',
    'Class Rank',
    '1998',
    '1999',
    '2000',
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
    'GPA',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    'Transcript',
    '2014',
    '2015',
    '2016',
    'Other updates',
    '2017',
  ],
};

export const counselorOptionalReport2FormInitialValues = {
  '1997': [],
};

// raw questions data in case we need it

export const counselorOptionalReport2FormRawQuestions: CommonAppRawQuestions = {
  '1996': {
    sectionName: 'Summary',
    id: '1996',
    label:
      'Use this form if you need to update submitted reports or add new information for the student. This form is not required.',
    type: 'Text',
    name: 'OR2 Instructional text',
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
  '1997': {
    sectionName: 'Summary',
    id: '1997',
    label: 'What updates are you making?',
    type: 'Checkbox',
    name: 'OR2 updates',
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
  '1998': {
    sectionName: 'Class Rank',
    id: '1998',
    label: 'How do you report class rank?',
    type: 'SingleSelectDropdown',
    name: 'OR2 Class Rank reporting',
    format: null,
    choiceGroup: 'Class Rank reporting',
    orderSeq: '10',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR2 Class Rank Display',
    dataType: 'String',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '1999': {
    sectionName: 'Class Rank',
    id: '1999',
    label: "Applicant's class rank",
    type: 'Short',
    name: 'OR2 Exact Class rank',
    format: null,
    choiceGroup: null,
    orderSeq: '20',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR2 Exact class rank display',
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
  '2000': {
    sectionName: 'Class Rank',
    id: '2000',
    label: 'How many additional students share this rank?',
    type: 'Short',
    name: 'OR2 Students Sharing Rank',
    format: null,
    choiceGroup: null,
    orderSeq: '30',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR2 Exact class rank display',
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
  '2001': {
    sectionName: 'Class Rank',
    id: '2001',
    label: "Applicant's decile rank",
    type: 'SingleSelectDropdown',
    name: 'OR2 Decile Rank',
    format: null,
    choiceGroup: 'Decile rank',
    orderSeq: '40',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR2 Decile rank display',
    dataType: 'Integer',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '2002': {
    sectionName: 'Class Rank',
    id: '2002',
    label: "Applicant's quintile rank",
    type: 'SingleSelectDropdown',
    name: 'OR2 Quintile Rank',
    format: null,
    choiceGroup: 'Quintile rank',
    orderSeq: '50',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR2 Quintile rank display',
    dataType: 'Integer',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '2003': {
    sectionName: 'Class Rank',
    id: '2003',
    label: "Applicant's quartile rank",
    type: 'SingleSelectDropdown',
    name: 'OR2 Quartile Rank',
    format: null,
    choiceGroup: 'Quartile Rank',
    orderSeq: '60',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR2 Quartile rank display',
    dataType: 'Integer',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '2004': {
    sectionName: 'Class Rank',
    id: '2004',
    label: 'Rank weighting',
    type: 'Radio',
    name: 'OR2 Rank weighting',
    format: null,
    choiceGroup: 'Weighting',
    orderSeq: '70',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR2 Rank weighting display',
    dataType: 'Integer',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '2005': {
    sectionName: 'Class Rank',
    id: '2005',
    label: 'From (start date)',
    type: 'Month (MM/YYYY)',
    name: 'OR2 Class rank start date',
    format: null,
    choiceGroup: null,
    orderSeq: '80',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR2 Rank weighting display',
    dataType: 'Date',
    minWordsYear: '1952',
    maxWordsYearKb: '2028',
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '2006': {
    sectionName: 'Class Rank',
    id: '2006',
    label: 'Ending (final date)',
    type: 'Month (MM/YYYY)',
    name: 'OR2 Class rank end date',
    format: null,
    choiceGroup: null,
    orderSeq: '90',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR2 Rank weighting display',
    dataType: 'Date',
    minWordsYear: '1952',
    maxWordsYearKb: '2028',
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '2007': {
    sectionName: 'GPA',
    id: '2007',
    label: 'Cumulative GPA',
    type: 'Short',
    name: 'OR2 Cumulative GPA',
    format: null,
    choiceGroup: null,
    orderSeq: '10',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR2 GPA Display',
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
  '2008': {
    sectionName: 'GPA',
    id: '2008',
    label: 'GPA Scale',
    type: 'SingleSelectDropdown',
    name: 'OR2 GPA Scale',
    format: null,
    choiceGroup: 'REC GPA Scale',
    orderSeq: '20',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR2 GPA Display',
    dataType: 'Integer',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '2009': {
    sectionName: 'GPA',
    id: '2009',
    label: 'From (start date)',
    type: 'Month (MM/YYYY)',
    name: 'OR2 GPA Start date',
    format: null,
    choiceGroup: null,
    orderSeq: '30',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR2 GPA Display',
    dataType: 'Date',
    minWordsYear: '1952',
    maxWordsYearKb: '2028',
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '2010': {
    sectionName: 'GPA',
    id: '2010',
    label: 'Ending (final date)',
    type: 'Month (MM/YYYY)',
    name: 'OR2 GPA end date',
    format: null,
    choiceGroup: null,
    orderSeq: '40',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR2 GPA Display',
    dataType: 'Date',
    minWordsYear: '1952',
    maxWordsYearKb: '2028',
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '2011': {
    sectionName: 'GPA',
    id: '2011',
    label: 'GPA weighting',
    type: 'Radio',
    name: 'OR2 GPA Weighting',
    format: null,
    choiceGroup: 'Weighting',
    orderSeq: '50',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR2 GPA Display',
    dataType: 'Integer',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '2012': {
    sectionName: 'GPA',
    id: '2012',
    label: "School's passing mark",
    type: 'Short',
    name: 'OR2 School passing mark',
    format: null,
    choiceGroup: null,
    orderSeq: '60',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR2 GPA Display',
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
  '2013': {
    sectionName: 'GPA',
    id: '2013',
    label: 'Highest grade/GPA in class',
    type: 'Short',
    name: 'OR2 Highest class GPA',
    format: null,
    choiceGroup: null,
    orderSeq: '70',
    defaultState: 'Hidden',
    triggeredState: 'Optional',
    requirementRule: 'OR2 GPA display optional',
    dataType: 'String',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: '6',
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '2014': {
    sectionName: 'Transcript',
    id: '2014',
    label:
      "This is not a substitute for the Midyear or Final Report. Please use this only if you wish to update grades at another point in the year. Attach applicant's current or most recent official transcript, including courses in progress and a transcript legend.",
    type: 'Upload',
    name: 'OR2 Transcript',
    format: null,
    choiceGroup: null,
    orderSeq: '10',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR2 Transcript display',
    dataType: null,
    minWordsYear: null,
    maxWordsYearKb: '2000',
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '2015': {
    sectionName: 'Transcript',
    id: '2015',
    label: 'Transcript Affirmation',
    type: 'Checkbox',
    name: 'OR2 Transcript affirmation',
    format: null,
    choiceGroup: 'OR Transcript Affirmation',
    orderSeq: '20',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR2 Transcript display',
    dataType: 'String',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '2016': {
    sectionName: 'Transcript',
    id: '2016',
    label:
      'Please indicate the most recent grades included on the transcript accompanying this form',
    type: 'SingleSelectDropdown',
    name: 'OR2 Transcript grades',
    format: null,
    choiceGroup: 'Transcript grade inclusion for MR and FR',
    orderSeq: '30',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR2 Transcript display',
    dataType: 'String',
    minWordsYear: null,
    maxWordsYearKb: null,
    maxCharacters: null,
    allowedCharacters: null,
    validationPattern: null,
    errorMessage: null,
    groupValidation: null,
  },
  '2017': {
    sectionName: 'Other updates',
    id: '2017',
    label:
      "Upload updates for this student's senior year courses, your evaluation, or any other corrections.",
    type: 'Upload',
    name: 'OR2 Change explanation upload',
    format: null,
    choiceGroup: null,
    orderSeq: '10',
    defaultState: 'Hidden',
    triggeredState: 'Required',
    requirementRule: 'OR2 Change explanation upload',
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
