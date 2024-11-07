export const lessonUser = {
  lesson: {
    archivedAt: null,
    assignments: [
      {
        assetName: 'test',
        description: '<p>test</p>',
        displayName: 'test',
        id: '11',
        rubrics: [
          {
            description: '<p>Description about new rubrics, new rubrics are here</p>',
            id: '362',
            name: 'Copy of Rubric #12',
            __typename: 'Rubric',
          },
        ],
        step: 1,
        __typename: 'Assignment',
      },
    ],
    attachments: [
      {
        description: '<p>zdvzd</p>',
        displayName: 'cdsvz',
        files: [
          {
            filename: 'instrukcja_montazu_umywalka_blatowa_cersanit.pdf',
            id: '1',
            url: 'https://s3.amazonaws.com/content.definedlearning.com/attachments/be0c7ff4-62cd-44fa-8cd0-e216ee1d3acc/instrukcja_montazu_umywalka_blatowa_cersanit.pdf?response-content-disposition=attachment&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZXVTFQ5YFUL3IPGM%2F20220124%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220124T133631Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=118618230a35d5ecfd8caebc19a357728b88d5b6c7a6764687ccb1be743e1309',
            __typename: 'AttachmentFile',
          },
        ],
        id: '4',
        name: 'scs',
        step: 2,
        __typename: 'Attachment',
      },
    ],
    checkInGroups: [
      {
        displayName: null,
        id: '1',
        name: 'Career cluster',
        questions: [
          {
            id: '1',
            question:
              'What do you like best about the careers and work done within this career cluster?',
            step: 1,
            __typename: 'CheckInQuestion',
          },
        ],
        step: 2,
        __typename: 'CheckInGroup',
      },
    ],
    checkInQuestions: [
      {
        id: '1',
        question:
          'What do you like best about the careers and work done within this career cluster?',
        step: 1,
        __typename: 'CheckInQuestion',
      },
    ],
    description: {
      introduction: '',
      goal: '',
      role: '',
      audience: '',
      situation: '',
      __typename: 'LessonDescription',
    },
    externalPresentations: [
      {
        displayName: 'Overview',
        id: '3',
        name: 'Sales & Marketing Cluster',
        source: 'https://slides.definedcareers.com/p/c16',
        step: 3,
        __typename: 'ExternalPresentation',
        isExpandable: false,
      },
    ],
    hasPresentation: true,
    id: '44',
    imageUrl:
      'https://s3.amazonaws.com/content.definedlearning.com/images/lessons/1dca22f2-7f88-44dc-b6cc-e11e5c644d0e/zoom-irisimages.jpeg?response-cache-control=max-age%3D604800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZXVTFQ5YFUL3IPGM%2F20220120%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220120T083100Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=87d7c62778872105f4e3a875fdfd68acd57ce3ee671fb961667be8eca42f1870',
    name: 'test public file access',
    researchLinks: [
      {
        author: 'test',
        displayName: '1',
        id: '5',
        name: 'test',
        resourceLink: 'http://google.com',
        sourceName: 'test',
        step: 4,
        __typename: 'ResearchLink',
      },
    ],
    texts: [
      {
        content: '<p>CDD: Sales Engineer</p>',
        displayName: 'Career Deep Dive Presentation',
        id: '19',
        name: 'CDD: Sales Engineer',
        step: 5,
        __typename: 'Text',
      },
    ],
    thumbnailUrl:
      'https://s3.amazonaws.com/content.definedlearning.com/images/lessons/1dca22f2-7f88-44dc-b6cc-e11e5c644d0e/zoom-irisimages_thumbnail.png?response-cache-control=max-age%3D604800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZXVTFQ5YFUL3IPGM%2F20220120%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220120T083100Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=a25281ffc50295de3ac2629f16e6a153fc532f865c1c4ff5f9e082f7a55d938b',
    type: 'pathway',
    videos: [
      {
        description:
          '<p>An introduction to the Agriculture, Food, and Natural Resources Cluster</p>',
        displayName: 'Cluster Video',
        filename: '23207.mp4',
        id: '4',
        name: 'AGR - Cluster Video',
        step: 6,
        url: 'https://s3.amazonaws.com/content.definedlearning.com/videos/52679603-da1b-46c7-9b59-bae34314a26f/23207.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZXVTFQ5YFUL3IPGM%2F20220124%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220124T133631Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=d78de8971321203f423760ee2de880b4478ee3ebe9dc4e4138c85cc1f5904d9f',
        __typename: 'Video',
      },
    ],
    vocabularies: [
      {
        definition: '<p>test</p>',
        id: '6',
        step: 7,
        term: 'test',
        __typename: 'Vocabulary',
      },
    ],
    __typename: 'Lesson',
  },
};
