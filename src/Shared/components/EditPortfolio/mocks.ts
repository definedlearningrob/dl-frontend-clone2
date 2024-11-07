import { MockedResponse } from '@apollo/client/testing';

import portfolioResumesQuery from '@shared/graphql/student/query/portfolioResumes';
import PORTFOLIO_PROJECTS, {
  TPortfolioProjectConnectionData,
} from '@shared/graphql/student/query/portfolioProjects';
import { TUpdateResumeData, UPDATE_RESUME } from '@shared/graphql/student/mutations/updateResume';
import { Badge } from '@shared/resources/types';
import {
  CONTACT_LINK_TYPES,
  PORTFOLIO_PROJECT_SUBMISSION_STATUS,
  SUBMISSION_FILE_SOURCE,
} from '@shared/resources/enums';

import { PortfolioProjectType, PortfolioResourceClass } from '../Portfolio/types';

export const portfolioCareersResumesMock = {
  request: {
    query: portfolioResumesQuery,
    variables: {},
  },
  result: {
    data: {
      portfolio: {
        sharedResume: {
          avatarUrl: null,
          bio: '',
          contactLinks: [],
          experiences: [],
          educations: [],
          extraCurriculars: [],
          externalResumes: [],
          dcProjects: {
            nodes: [],
            __typename: 'PortfolioProjectConnection',
          },
          dlProjects: {
            nodes: [],
            __typename: 'PortfolioProjectConnection',
          },
          personalProjects: {
            nodes: [],
            __typename: 'PortfolioProjectConnection',
          },
          highlightedProjectsEnabled: false,
          highlightedProjects: [],
          id: '28',
          name: 'Amanda Jewess',
          sharedUrl: '',
          sharedUrlEnabled: false,
          __typename: 'Resume',
          badges: [],
          highlightedBadges: [],
        },
        studentId: '10458251',
        __typename: 'Portfolio',
      },
    },
  },
};

const getBadgeMock = (id: string) =>
  ({
    id,
    imageUrl: 'http://localstack.lvh.me',
    name: 'Test Badge',
    description: 'Badge description',
    isHighlighted: false,
    resource: {
      id: '1',
      name: 'Course Test',
    },
  } as Badge);

const badgeMocks = [getBadgeMock('1'), getBadgeMock('2')];

export const portfolioCareersResumesWithBadgesMock = {
  request: {
    query: portfolioResumesQuery,
    variables: {},
  },
  result: {
    data: {
      portfolio: {
        sharedResume: {
          avatarUrl: null,
          bio: '',
          contactLinks: [],
          experiences: [],
          educations: [],
          extraCurriculars: [],
          highlightedProjects: [],
          externalResumes: [],
          dcProjects: {
            nodes: [],
            __typename: 'PortfolioProjectConnection',
          },
          dlProjects: {
            nodes: [],
            __typename: 'PortfolioProjectConnection',
          },
          personalProjects: {
            nodes: [],
            __typename: 'PortfolioProjectConnection',
          },
          highlightedProjectsEnabled: false,
          id: '28',
          name: 'Amanda Jewess',
          sharedUrl: '',
          sharedUrlEnabled: false,
          __typename: 'Resume',
          badges: badgeMocks,
          highlightedBadges: badgeMocks,
        },
        studentId: '10458251',
        __typename: 'Portfolio',
      },
    },
  },
};

const fileMock = {
  submitter: {
    firstName: 'Submitter',
    lastName: 'Submiting',
    uuid: 'abc',
  },
  isOwner: true,
  createdAt: '2023-09-01T07:59:46Z',
  filename: 'nawigacja.mp4',
  googleWeblink: '',
  source: SUBMISSION_FILE_SOURCE.GOOGLE,
  id: '1',
  url: 'http://localstack.lvh.me:4566/dev-bucket/assignment_submissions/373058b1-7aa1-4128-bb7f-29e0cd47107b/nawigacja.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=foobar%2F20230922%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20230922T132905Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=a27c1303c589f778ecb559f89f0beaeb794a9285388d62cdab5d92f5bde72646',
};

export const portfolioCareersProjectsMock: MockedResponse<TPortfolioProjectConnectionData> = {
  request: {
    query: PORTFOLIO_PROJECTS,
    variables: { first: 10, type: 'CAREERS' },
  },
  result: {
    data: {
      portfolio: {
        projects: {
          totalCount: 20,
          edges: [
            {
              cursor: 'MQ',
              node: {
                type: PortfolioProjectType.LESSON,
                isTeamSubmission: false,
                description:
                  '\u003cp\u003eA local restaurant would like to build urban vegetable gardens on nearby land for the neighborhood to farm and to use in the restaurant. The City Planner has asked you to collect data on the feasibility of building these four (15x15) planting spaces. \u003c/p\u003e\u003cp\u003e\nResearch the climate and weather in New York City. Decide which garden vegetables are suited for the area based on planting seasons. Prepare a map for the City Planner that will include types of plants, number of plants that can be used, and costs of plants based on current prices. You can prepare a digital or pencil/paper map.\n\u003c/p\u003e\u003cp\u003eThe following resources may be helpful for your work:\n\u003c/p\u003e\u003cul\u003e\u003cli\u003eUrban Farming: \u003ca href="https://greencitygrowers.com/urban-farming-products/rooftop-farms/" target="_blank"\u003ehttps://greencitygrowers.com/urban-farming-products/rooftop-farms/\u003c/a\u003e\n\u003c/li\u003e\u003cli\u003eCost-Effective Vegetables: \u003ca href="https://www.planetnatural.com/cost-effective-vegetables/" target="_blank"\u003ehttps://www.planetnatural.com/cost-effective-vegetables/\u003c/a\u003e\n\u003c/li\u003e\u003cli\u003eUrban Garden Plants: \u003ca href="https://www.urbangardennyc.com/" target="_blank"\u003ehttps://www.urbangardennyc.com/\u003c/a\u003e\n\t\t\t\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t\t\t\u003c/li\u003e\u003c/ul\u003e',
                id: '20',
                imageUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/lessons/9e6d6f51-0375-47ca-84cc-a3243b323631/generic_design.jpg?response-cache-control=max-age%3D3600\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=foobar%2F20230922%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20230922T132905Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=a5d4dd454394ecce0f102d75b2063005ce3a5d6b8f3e0c9bfc1068f4f40fb84e',
                name: 'Urban Garden Maps',
                parentName: 'City and Regional Planning Aides',
                resourceClass: PortfolioResourceClass.ASSIGNMENT_SUBMISSION,
                submission: {
                  files: [fileMock],
                  status: PORTFOLIO_PROJECT_SUBMISSION_STATUS.SUBMITTED,
                },
                finishedAt: '2023-09-01T07:59:46Z',
                thumbnailUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/lessons/9e6d6f51-0375-47ca-84cc-a3243b323631/generic_design_thumbnail.png?response-cache-control=max-age%3D3600\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=foobar%2F20230922%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20230922T132905Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=c121f4d5ca4494dec62880ec780903a229442801372f28cb53f8d64629522224',
                isHighlighted: false,
              },
            },
            {
              cursor: 'Mg',
              node: {
                type: PortfolioProjectType.LESSON,
                isTeamSubmission: false,
                description:
                  '\u003cp\u003eGreen affordable housing is reasonably priced housing that incorporates sustainable features and can be built in any neighborhood. Your task is to gather data for the City Planners so they can move forward with their plans. They are going to be designing 1200 square foot homes that will integrate green technologies and energies into the design. Research 10 homes in your neighborhood or a neighborhood near you. What is the square footage? What type of siding is used? Are they single-family or townhomes? What is the average price of your researched homes? When were the houses built? Are they stick or brick homes? Do any of them use solar energy? \u003c/p\u003e\u003cp\u003e\nCollect the data in a spreadsheet and share with the City Planner. You can use tax databases to find your information.\n\u003c/p\u003e\u003cp\u003eThe following resources will be helpful for your work:\n\u003c/p\u003e\u003cul\u003e\u003cli\u003eGreen Home Builders: \u003ca href="https://www.builderonline.com/building/5-criteria-for-green-home-building" target="_blank"\u003ehttps://www.builderonline.com/building/5-criteria-for-green-home-building\u003c/a\u003e\n\u003c/li\u003e\u003cli\u003eCity Data:\n\u003ca href="http://www.city-data.com/" target="_blank"\u003ehttp://www.city-data.com/\u003c/a\u003e\n\u003c/li\u003e\u003cli\u003eZillow:\n\u003ca href="http://www.zillow.com" target="_blank"\u003ewww.zillow.com\u003c/a\u003e\n\n\u003c/li\u003e\u003c/ul\u003e',
                id: '19',
                imageUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/lessons/9e6d6f51-0375-47ca-84cc-a3243b323631/generic_design.jpg?response-cache-control=max-age%3D3600\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=foobar%2F20230922%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20230922T132905Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=a5d4dd454394ecce0f102d75b2063005ce3a5d6b8f3e0c9bfc1068f4f40fb84e',
                name: 'Green Housing Design Spreadsheet',
                parentName: 'City and Regional Planning Aides',
                resourceClass: PortfolioResourceClass.ASSIGNMENT_SUBMISSION,
                submission: {
                  files: [fileMock],
                  status: PORTFOLIO_PROJECT_SUBMISSION_STATUS.SUBMITTED,
                },
                finishedAt: '2023-09-01T07:59:41Z',
                thumbnailUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/lessons/9e6d6f51-0375-47ca-84cc-a3243b323631/generic_design_thumbnail.png?response-cache-control=max-age%3D3600\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=foobar%2F20230922%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20230922T132905Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=c121f4d5ca4494dec62880ec780903a229442801372f28cb53f8d64629522224',
                isHighlighted: false,
              },
            },
            {
              cursor: 'Mw',
              node: {
                type: PortfolioProjectType.LESSON,
                isTeamSubmission: false,
                description:
                  '\u003cp\u003eCreating your first budget can be extremely challenging. \u0026nbsp;It\u0026rsquo;s worth the effort and is a skill that will aid you in decision making throughout your life. Developing and maintaining a budget will help with making decisions as it relates to your job as well as your expenses.\u0026nbsp; In order to create your budget, you will need to understand what a budget is, how budgets are used to track credits and debits and projected expenses.\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eUse the Google Sheet or Excel spreadsheet below and the salary information in this career to create your budget.\u0026nbsp;\u0026nbsp;\n\u003cul\u003e\n\u003cli\u003e\u003ca href="https://docs.google.com/spreadsheets/d/1jO_OxD0qYERHZM-5zNvuyctD4Fk3nXWYqKtBEHeIvO8/copy" target="_blank" rel="noopener"\u003eGoogle Sheet - Personal Budget Spreadsheet\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca title="Microsoft Excel - Personal Budget Spreadsheet" href="https://video.definedlearning.com/docs/monthly_budget_product.xlsx"\u003eMicrosoft Excel - Personal Budget Spreadsheet\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\u003c/li\u003e\n\u003c/ul\u003e',
                id: '3',
                imageUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/lessons/5b0bfa00-06c8-4045-b8e8-59bf88a2e42c/student-computer.jpg?response-cache-control=max-age%3D3600\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=foobar%2F20230922%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20230922T132905Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=b446dc5b40a71cce7e3ed7be2cb2367af6100268594c2a199b5ddda1adbfd456',
                name: 'Personal Budget',
                parentName:
                  'Career Roadmap - Overview, Education, and Personal Budgeting: Dental Laboratory Technician',
                resourceClass: PortfolioResourceClass.ASSIGNMENT_SUBMISSION,
                submission: {
                  files: [fileMock],
                  status: PORTFOLIO_PROJECT_SUBMISSION_STATUS.SUBMITTED,
                },
                finishedAt: '2023-09-01T07:47:03Z',
                thumbnailUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/lessons/5b0bfa00-06c8-4045-b8e8-59bf88a2e42c/student-computer_thumbnail.png?response-cache-control=max-age%3D3600\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=foobar%2F20230922%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20230922T132905Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=c183d708d231572e094366d748098591fd06dd378bceb6352b6d9f1f10530e4f',
                isHighlighted: false,
              },
            },
            {
              cursor: 'NA',
              node: {
                type: PortfolioProjectType.LESSON,
                isTeamSubmission: false,
                description:
                  '\u003cp\u003eIn order for the species you recommend to survive and thrive within the aquarium, you will need to carefully research the relationships between abiotic and biotic factors within each tank. Marine Biologists often use diagrams such as food webs to demonstrate these relationships.\n\n \n\u003c/p\u003e\u003cp\u003e\nCreate a food web for your aquarium that includes a minimum of three levels. This food web will be important to help you create an aquatic ecosystem to help the living organisms grow and survive. The food web should indicate the top level of the food web and each lower level. Be sure to evaluate how matter and energy flow through the living and nonliving parts of each component of the aquatic ecosystem you design.\n\n \n\u003c/p\u003e\u003cp\u003e\nInclude written notes or record an explanation or video that describes each component, including their place in the food web and how they contribute to the flow of energy into and/or out of the ecosystem. This will help the aquarium continue to maintain an healthy environment after the initial design phase, diagnosing any issues and replacing species as needed based on the information you provide.\u003c/p\u003e',
                id: '18',
                imageUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/lessons/9ff01694-e389-4300-930c-658fe86e9c5a/19-1022.00_Biologist%2805%2918.jpg?response-cache-control=max-age%3D3600\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=foobar%2F20230922%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20230922T132905Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=3a7569ecf7948addf5facb70fd83283917d6c37aa4f6ecf5cc036e6787f39dce',
                name: 'Food Web Model',
                parentName: 'Biologists',
                resourceClass: PortfolioResourceClass.ASSIGNMENT_SUBMISSION,
                submission: {
                  files: [fileMock],
                  status: PORTFOLIO_PROJECT_SUBMISSION_STATUS.SUBMITTED,
                },
                finishedAt: '2023-09-01T07:46:13Z',
                thumbnailUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/lessons/9ff01694-e389-4300-930c-658fe86e9c5a/19-1022.00_Biologist%2805%2918_thumbnail.png?response-cache-control=max-age%3D3600\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=foobar%2F20230922%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20230922T132905Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=f786ee346cb89baaa2ca6e630b70363c04fe599a180ac6abf5d4b6cb19e11f84',
                isHighlighted: false,
              },
            },
            {
              cursor: 'NQ',
              node: {
                type: PortfolioProjectType.LESSON,
                isTeamSubmission: false,
                description:
                  '\u003cp\u003eYou will need to create an Aquarium Maintenance Guide to help the owners and workers at the mall maintain the aquatic environment within the aquarium. It will be important for the various workers responsible for maintaining the aquarium to understand the science behind the design choices you made and the science behind maintaining a healthy environment.\n\n\n\u003c/p\u003e\u003cp\u003e\nWhen choosing your fish for the aquarium, you need to take several water requirements into consideration. The types of fish you choose need to be able to exist within a certain pH level, within specific salinity levels and a temperature span. Determine what these levels would be for the fish you choose, then create a maintenance guide for the aquarium.\n\n \n\u003c/p\u003e\u003cp\u003e\nWithin this guide, you will want to include the specific types of fish and their needs as far as types of food, feeding schedule, amount of food, and how to clean the tank and the frequency of the cleanings. Since the people cleaning the tank may not be familiar with the types of fish, it would be helpful to include a picture of each fish next to the listing of the type of food they eat, the frequency, and any special instructions for that fish.\u003c/p\u003e',
                id: '17',
                imageUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/lessons/9ff01694-e389-4300-930c-658fe86e9c5a/19-1022.00_Biologist%2805%2918.jpg?response-cache-control=max-age%3D3600\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=foobar%2F20230922%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20230922T132905Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=3a7569ecf7948addf5facb70fd83283917d6c37aa4f6ecf5cc036e6787f39dce',
                name: 'Aquarium Maintenance Guide',
                parentName: 'Biologists',
                resourceClass: PortfolioResourceClass.ASSIGNMENT_SUBMISSION,
                submission: {
                  files: [fileMock],
                  status: PORTFOLIO_PROJECT_SUBMISSION_STATUS.SUBMITTED,
                },
                finishedAt: '2023-09-01T07:46:09Z',
                thumbnailUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/lessons/9ff01694-e389-4300-930c-658fe86e9c5a/19-1022.00_Biologist%2805%2918_thumbnail.png?response-cache-control=max-age%3D3600\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=foobar%2F20230922%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20230922T132905Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=f786ee346cb89baaa2ca6e630b70363c04fe599a180ac6abf5d4b6cb19e11f84',
                isHighlighted: false,
              },
            },
            {
              cursor: 'Ng',
              node: {
                type: PortfolioProjectType.LESSON,
                isTeamSubmission: false,
                description:
                  'Identify a machine that is used to heat biomass as part of the conversion process to electricity. Create a diagram of a machine or machines such as a boiler, generator, or turbine and identify the critical parts of this machine. For each critical part provide a brief description of what the part does, as part of the system to convert biomass to electricity. This diagram will be used by other technicians when they are checking the machine to be sure it is working properly and safely. ',
                id: '15',
                imageUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/lessons/c19b3743-be07-4107-baa0-99603c09464f/generic_design.jpg?response-cache-control=max-age%3D3600\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=foobar%2F20230922%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20230922T132905Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=e10451177971133c1626fc3f6afd582e1d61694215caa553ea9c401567778210',
                name: 'Diagram',
                parentName: 'Biomass Plant Technicians',
                resourceClass: PortfolioResourceClass.ASSIGNMENT_SUBMISSION,
                submission: {
                  files: [fileMock],
                  status: PORTFOLIO_PROJECT_SUBMISSION_STATUS.SUBMITTED,
                },
                finishedAt: '2023-09-01T07:41:25Z',
                thumbnailUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/lessons/c19b3743-be07-4107-baa0-99603c09464f/generic_design_thumbnail.png?response-cache-control=max-age%3D3600\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=foobar%2F20230922%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20230922T132905Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=7472946fccb67c07ef92d63ec94d69358a378d5199ad55457268081ea33dd035',
                isHighlighted: false,
              },
            },
            {
              cursor: 'Nw',
              node: {
                type: PortfolioProjectType.LESSON,
                isTeamSubmission: false,
                description:
                  'Identify the common examples of biomass that are used to create electricity. Create a chart that considers the benefits and concerns about each example. \nNext, create a flowchart that explains the conversion biomass undergoes to help it be converted to electricity. \n',
                id: '16',
                imageUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/lessons/c19b3743-be07-4107-baa0-99603c09464f/generic_design.jpg?response-cache-control=max-age%3D3600\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=foobar%2F20230922%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20230922T132905Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=e10451177971133c1626fc3f6afd582e1d61694215caa553ea9c401567778210',
                name: 'Chart and Flowchart',
                parentName: 'Biomass Plant Technicians',
                resourceClass: PortfolioResourceClass.ASSIGNMENT_SUBMISSION,
                submission: {
                  files: [fileMock],
                  status: PORTFOLIO_PROJECT_SUBMISSION_STATUS.SUBMITTED,
                },
                finishedAt: '2023-09-01T07:41:23Z',
                thumbnailUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/lessons/c19b3743-be07-4107-baa0-99603c09464f/generic_design_thumbnail.png?response-cache-control=max-age%3D3600\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=foobar%2F20230922%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20230922T132905Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=7472946fccb67c07ef92d63ec94d69358a378d5199ad55457268081ea33dd035',
                isHighlighted: false,
              },
            },
            {
              cursor: 'OA',
              node: {
                type: PortfolioProjectType.LESSON,
                isTeamSubmission: false,
                description:
                  '\u003cp\u003eTo test software, software quality analysts set up test environments. A test environment is a setup of the exact equipment and situation people may be using to access the software. Test environments help software quality analysts see problems as they happen with real users using real equipment.\u003c/p\u003e\n\u003cp\u003e\u003cbr /\u003eYou will need to set up a software test environment. This should include one or more real users, using school-issued equipment, to access software in a realistic situation. You will need to prepare and describe your setup and find real users to test the software. You will ask the users to complete simple tasks using the software, carefully documenting the challenges and feedback they have as they go through the process. Summarize your findings in a one page report or a series of 4-5 slides. This information will be shared with district leadership who want to know how software is being used in the district.\u003c/p\u003e',
                id: '7',
                imageUrl: null,
                name: 'Software Test Environment Assignment',
                parentName: 'Draft',
                resourceClass: PortfolioResourceClass.ASSIGNMENT_SUBMISSION,
                submission: {
                  files: [fileMock],
                  status: PORTFOLIO_PROJECT_SUBMISSION_STATUS.SUBMITTED,
                },
                finishedAt: '2023-08-30T07:33:46Z',
                thumbnailUrl: null,
                isHighlighted: false,
              },
            },
            {
              cursor: 'OQ',
              node: {
                type: PortfolioProjectType.LESSON,
                isTeamSubmission: false,
                description:
                  '\u003cp\u003eAs a software quality analyst, one of your most important jobs is to find out how, when and why software is not working. You can find this information by running tests, but you can also collect this information from users.\u003c/p\u003e\n\u003cp\u003e\u003cbr /\u003eYou will need to create a software bug feedback form for a software application used by your school district. (Examples include Learning Management Systems like Schoology or communication tools like Class Dojo or SeeSaw.) You will create a bug feedback form that helps users, like teachers, leaders, students and families, report problems with the software.\u0026nbsp;\u003c/p\u003e\n\u003cp\u003e\u003cbr /\u003ePoints to consider: What information do you need to fix the bug? What is the fastest and best way for people to share that information?\u0026nbsp;\u003c/p\u003e\n\u003cp\u003eThis form will help you keep the software running smoothly so the school does not waste money or time.\u003c/p\u003e',
                id: '6',
                imageUrl: null,
                name: 'Software Bug Feedback Form Assignment',
                parentName: 'Draft',
                resourceClass: PortfolioResourceClass.ASSIGNMENT_SUBMISSION,
                submission: {
                  files: [fileMock],
                  status: PORTFOLIO_PROJECT_SUBMISSION_STATUS.SUBMITTED,
                },
                finishedAt: '2023-08-30T07:33:41Z',
                thumbnailUrl: null,
                isHighlighted: false,
              },
            },
            {
              cursor: 'MTA',
              node: {
                type: PortfolioProjectType.LESSON,
                isTeamSubmission: false,
                description:
                  '\u003cp\u003eIt is important for nursing homes to have the medical supplies they need ready as soon as they are needed. This means storing many supplies on site. They may need to have a large number of supplies available, especially if there are shortages or some kind of emergency.\u003c/p\u003e\n\u003cp\u003e\u003cbr /\u003eYou will need to create a checklist of supplies nursing homes should keep on hand at all times. The items on this list should be the supplies most used, but also the items most likely to be difficult to order quickly if there is an emergency. Research the supplies most needed and find out which ones are difficult to find. This will help nursing homes be prepared to help their residents no matter what happens.\u003c/p\u003e',
                id: '5',
                imageUrl: null,
                name: 'Medical Supply Checklist Assignment',
                parentName: 'Draft',
                resourceClass: PortfolioResourceClass.ASSIGNMENT_SUBMISSION,
                submission: {
                  files: [fileMock],
                  status: PORTFOLIO_PROJECT_SUBMISSION_STATUS.SUBMITTED,
                },
                finishedAt: '2023-08-30T07:33:33Z',
                thumbnailUrl: null,
                isHighlighted: false,
              },
            },
            {
              cursor: 'MTE',
              node: {
                type: PortfolioProjectType.LESSON,
                isTeamSubmission: false,
                description:
                  '\u003cp\u003eAs a medical supply clerk, you know what items are easy or difficult to get on time. Sometimes supply chains are interrupted and items can be difficult to get. One item that can sometimes be in short supply is walkers. Nursing homes need walkers to help residents get from one place to another safely.\u003c/p\u003e\n\u003cp\u003e\u003cbr /\u003eYou will need to create an infographic that describes the current state of the walker supply chain. Your infographic could include where walkers are made, how many are currently available, how long it takes for a walker to get to a nursing home, or any other information a nursing home administrator needs to know about walker supplies. Your infographic will help your nursing home customers understand how to make sure they have the supplies they need when they need them.\u003c/p\u003e',
                id: '4',
                imageUrl: null,
                name: 'Walker Supply Chain Infographic Assignment',
                parentName: 'Draft',
                resourceClass: PortfolioResourceClass.ASSIGNMENT_SUBMISSION,
                submission: {
                  files: [fileMock],
                  status: PORTFOLIO_PROJECT_SUBMISSION_STATUS.SUBMITTED,
                },
                finishedAt: '2023-08-30T07:33:26Z',
                thumbnailUrl: null,
                isHighlighted: false,
              },
            },
            {
              cursor: 'MTI',
              node: {
                type: PortfolioProjectType.LESSON,
                isTeamSubmission: false,
                description:
                  '\u003cp\u003e\u003cspan style="font-weight: 400;"\u003eYou have been asked to speak at an elementary school career fair. You will be sharing what you do as a dental laboratory technician. You will also share the American Dentistry Association (ADA) guidelines for proper tooth care.\u0026nbsp;\u003c/span\u003e\u003c/p\u003e\n\u003cp\u003e\u003cspan style="font-weight: 400;"\u003eChoose a mascot that will help you present at the fair. Create 6-8 talking points that you and your mascot will deliver to your participants. You want these students to leave your presentation with new information and the ability to share what they have learned with others. Research videos of other medical professionals that speak with students. Be funny! Be informative! Record your presentation.\u0026nbsp;\u003c/span\u003e\u003c/p\u003e\n\u003cp\u003e\u003cstrong\u003eThe following resources may be helpful for your work:\u003c/strong\u003e\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003e\u003cstrong\u003eHome Dental Care: \u003c/strong\u003e\u003ca href="https://www.ada.org/en/member-center/oral-health-topics/home-care"\u003e\u003cspan style="font-weight: 400;"\u003ehttps://www.ada.org/en/member-center/oral-health-topics/home-care\u003c/span\u003e\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003cstrong\u003eTeaching Kids to Brush Their Teeth: \u003c/strong\u003e\u003ca href="https://growingsmiledental.com/teaching-kids-brush-teeth/"\u003e\u003cspan style="font-weight: 400;"\u003ehttps://growingsmiledental.com/teaching-kids-brush-teeth/\u003c/span\u003e\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003cstrong\u003eHow to Use a Mascot in Presentations: \u003c/strong\u003e\u003ca href="https://visualcontent.space/how-to-use-mascot-to-go-viral/"\u003e\u003cspan style="font-weight: 400;"\u003ehttps://visualcontent.space/how-to-use-mascot-to-go-viral/\u003c/span\u003e\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e',
                id: '2',
                imageUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/lessons/87250741-7a00-4560-9f69-ab9c29a3b63d/generic_design.jpg?response-cache-control=max-age%3D3600\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=foobar%2F20230922%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20230922T132905Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=57020abeb4fd706c9b81a00ae82f5124305b2f662078c20cc50f926363603e6c',
                name: 'Dental Care Mascot Talk',
                parentName: 'Dental Laboratory Technicians',
                resourceClass: PortfolioResourceClass.ASSIGNMENT_SUBMISSION,
                submission: {
                  files: [fileMock],
                  status: PORTFOLIO_PROJECT_SUBMISSION_STATUS.SUBMITTED,
                },
                finishedAt: '2023-08-30T07:30:35Z',
                thumbnailUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/lessons/87250741-7a00-4560-9f69-ab9c29a3b63d/generic_design_thumbnail.png?response-cache-control=max-age%3D3600\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=foobar%2F20230922%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20230922T132905Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=90c5604426c595fa913faf44a6b147086517c842eef9a5298c4723d303fe3739',
                isHighlighted: false,
              },
            },
            {
              cursor: 'MTM',
              node: {
                type: PortfolioProjectType.LESSON,
                isTeamSubmission: false,
                description:
                  '\u003cp\u003e\u003cspan style="font-weight: 400;"\u003eIn order to improve your skills as a dental lab technician, you will create a dental model using recyclable materials around the house. Research the cast guidelines for a 10 year old patient and design the model for this patient. You can use clay, foam, or other pliable (easy to mold) materials. Label each part of the model so that you can accurately share your design with your supervisors.\u0026nbsp;\u003c/span\u003e\u003c/p\u003e\n\u003cp\u003e\u003cstrong\u003eThe following resources may be helpful for your work:\u003c/strong\u003e\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003e\u003cstrong\u003eDental Cast Guidelines: \u003c/strong\u003e\u003ca href="https://www.americanboardortho.com/orthodontic-professionals/about-board-certification/clinical-examination/certification-renewal-examinations/mail-in-cre-submission-procedure/case-report-examination/case-record-preparation/dental-cast-guide/"\u003e\u003cspan style="font-weight: 400;"\u003ehttps://www.americanboardortho.com/orthodontic-professionals/about-board-certification/clinical-examination/certification-renewal-examinations/mail-in-cre-submission-procedure/case-report-examination/case-record-preparation/dental-cast-guide/\u003c/span\u003e\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\u003cul\u003e\n\u003cli\u003e\u003cstrong\u003eBraces: \u003c/strong\u003e\u003ca href="https://pacificwestdental.com/braces-work-straighten-teeth/"\u003e\u003cspan style="font-weight: 400;"\u003ehttps://pacificwestdental.com/braces-work-straighten-teeth/\u003c/span\u003e\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003cstrong\u003eDental Molds: \u003c/strong\u003e\u003ca href="https://www.firstchoicelab.com/dental-model-pouring/"\u003e\u003cspan style="font-weight: 400;"\u003ehttps://www.firstchoicelab.com/dental-model-pouring/\u003c/span\u003e\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e',
                id: '1',
                imageUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/lessons/87250741-7a00-4560-9f69-ab9c29a3b63d/generic_design.jpg?response-cache-control=max-age%3D3600\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=foobar%2F20230922%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20230922T132905Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=57020abeb4fd706c9b81a00ae82f5124305b2f662078c20cc50f926363603e6c',
                name: 'Orthodontic Engineering',
                parentName: 'Dental Laboratory Technicians',
                resourceClass: PortfolioResourceClass.ASSIGNMENT_SUBMISSION,
                submission: {
                  files: [fileMock],
                  status: PORTFOLIO_PROJECT_SUBMISSION_STATUS.SUBMITTED,
                },
                finishedAt: '2023-08-30T07:30:29Z',
                thumbnailUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/lessons/87250741-7a00-4560-9f69-ab9c29a3b63d/generic_design_thumbnail.png?response-cache-control=max-age%3D3600\u0026X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=foobar%2F20230922%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20230922T132905Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=90c5604426c595fa913faf44a6b147086517c842eef9a5298c4723d303fe3739',
                isHighlighted: false,
              },
            },
          ],
          pageInfo: {
            endCursor: 'MTM',
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: 'MQ',
          },
        },
        studentId: '10458251',
      },
    },
  },
};
export const portfolioCareersEmptyProjectsMock = {
  request: {
    query: PORTFOLIO_PROJECTS,
    variables: { first: 10, type: 'CAREERS' },
  },
  result: {
    data: {
      portfolio: {
        projects: {
          nodes: [],
          edges: [],
          totalCount: 0,
          pageInfo: {
            endCursor: 'MTM',
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: 'MQ',
          },
        },
        studentId: '10458251',
      },
    },
  },
};
export const portfolioLearningProjectsMock = {
  request: {
    query: PORTFOLIO_PROJECTS,
    variables: { first: 10, type: 'PBL' },
  },
  result: {
    data: {
      portfolio: {
        projects: {
          totalCount: 2,
          nodes: [
            {
              type: PortfolioProjectType.LESSON,
              description:
                "<p>Everyday rocky pieces of space debris called meteoroids fly toward the moon from outer space. When these space rocks hit the Moon, they explode like bombs, making holes on the Moon's surface called moon craters. You want to show the students the different sizes of some of the Moon&rsquo;s craters. You will create a bar graph of the width (called the diameter) of 5 different craters.</p>\n<p>You can do research on your own, or just choose 5 of the 10 listed below in the chart. Don&rsquo;t forget to title your graph and use an appropriate scale and labels.</p>\n<p>In addition, create a list of 6-8 questions for the students to answer based on your data. Questions could include &lsquo;Which is the smallest, largest, how much smaller/larger is one than another, how large of a crater would it be if they were all side by side&rsquo;, etc. Be sure to include an answer key for these questions.</p>",
              id: '2',
              name: 'Lunar Astronaut-Lunar Crater Bar Graph',
              imageUrl:
                'http://localstack.lvh.me:4566/dev-bucket/images/tasks/2552fd70-181a-46be-ba92-0efb637d3513/2206_Math-Money%2C%20Time_Data%28gr2-3%29%2805%2912.jpg?response-cache-control=max-age%3D3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=foobar%2F20231005%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231005T071626Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=fab1a7927609ae7af30b403d5a309388b2a9acbcc9dbd080ffc0ede22bae34e2',
              parentName: 'Lunar Astronaut 2206',
              isTeamSubmission: false,
              resourceClass: 'PRODUCT_SUBMISSION',
              submission: {
                files: [
                  {
                    id: '2',
                    isOwner: true,
                    filename: 'EmptyDOC copy 2.pdf',
                    googleWeblink: null,
                    source: 'LOCAL',
                    url: 'http://localstack.lvh.me:4566/dev-bucket/product_submissions/d111a50e-9273-4ed2-b2cb-736182870118/EmptyDOC%20copy%202.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=foobar%2F20231005%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231005T071626Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6ed089fb9ffb70339651cc312f49fa88a81c811d1ff28d59118491d3f3122bc5',
                    createdAt: '2023-10-04T14:10:51Z',
                    submitter: {
                      firstName: 'Allison',
                      lastName: 'Adams',
                      uuid: '215b4d05-97d4-4867-8f70-xxxxxxx',
                      __typename: 'Student',
                    },
                    __typename: 'PortfolioSubmissionFile',
                  },
                ],
                status: 'SUBMITTED',
                __typename: 'PortfolioSubmission',
              },
              finishedAt: '2023-10-04',
              thumbnailUrl:
                'http://localstack.lvh.me:4566/dev-bucket/images/tasks/2552fd70-181a-46be-ba92-0efb637d3513/2206_Math-Money%2C%20Time_Data%28gr2-3%29%2805%2912_thumbnail.png?response-cache-control=max-age%3D3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=foobar%2F20231005%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231005T071626Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=58b24007b7e23fcbcb3ec28db481b3c4241b76b0a48692ada5b65bdb06e29ea9',
              __typename: 'PortfolioProject',
            },
            {
              type: PortfolioProjectType.LESSON,
              description:
                '<p>You want to help the students realize that gravity on the moon is much less than on Earth. As a result, things weigh much less on the Moon. As a matter of fact, objects on the moon weigh ⅙ less than they do on Earth.</p>\n<p>So for example: A cat weighs about 12 lbs on Earth. To get it&rsquo;s weight on the Moon, it would be ⅙ of that. So, that cat would weigh 2 pounds on the Moon.</p>\n<p>You are going to give the students a gravity chart of some common items so they can calculate the weights on Earth or the Moon. You will need to create an answer key for their teacher so he can grade their work on how heavy the items weigh on the Moon or Earth.</p>',
              id: '1',
              name: 'Lunar Astronaut-Gravity Chart',
              imageUrl:
                'http://localstack.lvh.me:4566/dev-bucket/images/tasks/2552fd70-181a-46be-ba92-0efb637d3513/2206_Math-Money%2C%20Time_Data%28gr2-3%29%2805%2912.jpg?response-cache-control=max-age%3D3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=foobar%2F20231005%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231005T071626Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=fab1a7927609ae7af30b403d5a309388b2a9acbcc9dbd080ffc0ede22bae34e2',
              parentName: 'Lunar Astronaut 2206',
              isTeamSubmission: false,
              resourceClass: 'PRODUCT_SUBMISSION',
              submission: {
                files: [
                  {
                    id: '1',
                    isOwner: true,
                    filename: 'EmptyDOC copy 2.pdf',
                    googleWeblink: null,
                    source: 'LOCAL',
                    url: 'http://localstack.lvh.me:4566/dev-bucket/product_submissions/3fc3a2a3-7d7b-4681-8442-06757f1c1145/EmptyDOC%20copy%202.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=foobar%2F20231005%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231005T071626Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=5cccb8b82e95dd6e1e9b86acfe7850540e4407f1faea3df162223ae7df368ad1',
                    createdAt: '2023-10-04T14:10:45Z',
                    submitter: {
                      firstName: 'Allison',
                      lastName: 'Adams',
                      uuid: '215b4d05-97d4-4867-8f70-xxxxxxx',
                      __typename: 'Student',
                    },
                    __typename: 'PortfolioSubmissionFile',
                  },
                ],
                status: 'SUBMITTED',
                __typename: 'PortfolioSubmission',
              },
              finishedAt: '2023-10-04',
              thumbnailUrl:
                'http://localstack.lvh.me:4566/dev-bucket/images/tasks/2552fd70-181a-46be-ba92-0efb637d3513/2206_Math-Money%2C%20Time_Data%28gr2-3%29%2805%2912_thumbnail.png?response-cache-control=max-age%3D3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=foobar%2F20231005%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231005T071626Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=58b24007b7e23fcbcb3ec28db481b3c4241b76b0a48692ada5b65bdb06e29ea9',
              __typename: 'PortfolioProject',
            },
          ],
          edges: [
            {
              cursor: 'MQ',
              node: {
                type: PortfolioProjectType.LESSON,
                description:
                  "<p>Everyday rocky pieces of space debris called meteoroids fly toward the moon from outer space. When these space rocks hit the Moon, they explode like bombs, making holes on the Moon's surface called moon craters. You want to show the students the different sizes of some of the Moon&rsquo;s craters. You will create a bar graph of the width (called the diameter) of 5 different craters.</p>\n<p>You can do research on your own, or just choose 5 of the 10 listed below in the chart. Don&rsquo;t forget to title your graph and use an appropriate scale and labels.</p>\n<p>In addition, create a list of 6-8 questions for the students to answer based on your data. Questions could include &lsquo;Which is the smallest, largest, how much smaller/larger is one than another, how large of a crater would it be if they were all side by side&rsquo;, etc. Be sure to include an answer key for these questions.</p>",
                id: '2',
                imageUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/tasks/2552fd70-181a-46be-ba92-0efb637d3513/2206_Math-Money%2C%20Time_Data%28gr2-3%29%2805%2912.jpg?response-cache-control=max-age%3D3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=foobar%2F20231005%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231005T071626Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=fab1a7927609ae7af30b403d5a309388b2a9acbcc9dbd080ffc0ede22bae34e2',
                name: 'Lunar Astronaut-Lunar Crater Bar Graph',
                isTeamSubmission: false,
                parentName: 'Lunar Astronaut 2206',
                resourceClass: 'PRODUCT_SUBMISSION',
                submission: {
                  files: [
                    {
                      id: 'file-id',
                      createdAt: '2023-10-04',
                      submitter: {
                        firstName: 'Allison',
                        lastName: 'Adams',
                        uuid: '215b4d05-97d4-4867-8f70-xxxxxxx',
                      },
                      isOwner: true,
                      filename: 'EmptyDOC copy 2.pdf',
                      googleWeblink: null,
                      source: 'LOCAL',
                      url: 'http://localstack.lvh.me:4566/dev-bucket/product_submissions/d111a50e-9273-4ed2-b2cb-736182870118/EmptyDOC%20copy%202.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=foobar%2F20231005%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231005T071626Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6ed089fb9ffb70339651cc312f49fa88a81c811d1ff28d59118491d3f3122bc5',
                      __typename: 'PortfolioSubmissionFile',
                    },
                  ],
                  status: 'SUBMITTED',
                  __typename: 'PortfolioSubmission',
                },
                finishedAt: '2023-10-04',
                thumbnailUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/tasks/2552fd70-181a-46be-ba92-0efb637d3513/2206_Math-Money%2C%20Time_Data%28gr2-3%29%2805%2912_thumbnail.png?response-cache-control=max-age%3D3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=foobar%2F20231005%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231005T071626Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=58b24007b7e23fcbcb3ec28db481b3c4241b76b0a48692ada5b65bdb06e29ea9',
                __typename: 'PortfolioProject',
              },
              __typename: 'PortfolioProjectEdge',
            },
            {
              cursor: 'Mg',
              node: {
                type: PortfolioProjectType.LESSON,
                description:
                  '<p>You want to help the students realize that gravity on the moon is much less than on Earth. As a result, things weigh much less on the Moon. As a matter of fact, objects on the moon weigh ⅙ less than they do on Earth.</p>\n<p>So for example: A cat weighs about 12 lbs on Earth. To get it&rsquo;s weight on the Moon, it would be ⅙ of that. So, that cat would weigh 2 pounds on the Moon.</p>\n<p>You are going to give the students a gravity chart of some common items so they can calculate the weights on Earth or the Moon. You will need to create an answer key for their teacher so he can grade their work on how heavy the items weigh on the Moon or Earth.</p>',
                id: '1',
                imageUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/tasks/2552fd70-181a-46be-ba92-0efb637d3513/2206_Math-Money%2C%20Time_Data%28gr2-3%29%2805%2912.jpg?response-cache-control=max-age%3D3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=foobar%2F20231005%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231005T071626Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=fab1a7927609ae7af30b403d5a309388b2a9acbcc9dbd080ffc0ede22bae34e2',
                name: 'Lunar Astronaut-Gravity Chart',
                isTeamSubmission: false,
                parentName: 'Lunar Astronaut 2206',
                resourceClass: 'PRODUCT_SUBMISSION',
                submission: {
                  files: [
                    {
                      isOwner: true,
                      filename: 'EmptyDOC copy 2.pdf',
                      id: '1',
                      createdAt: '2023-10-04T14:10:45Z',
                      submitter: {
                        firstName: 'Allison',
                        lastName: 'Adams',
                        uuid: '215b4d05-97d4-4867-8f70-xxxxxxx',
                      },
                      googleWeblink: null,
                      source: 'LOCAL',
                      url: 'http://localstack.lvh.me:4566/dev-bucket/product_submissions/3fc3a2a3-7d7b-4681-8442-06757f1c1145/EmptyDOC%20copy%202.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=foobar%2F20231005%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231005T071626Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=5cccb8b82e95dd6e1e9b86acfe7850540e4407f1faea3df162223ae7df368ad1',
                      __typename: 'PortfolioSubmissionFile',
                    },
                  ],
                  status: 'SUBMITTED',
                  __typename: 'PortfolioSubmission',
                },
                finishedAt: '2023-10-04',
                thumbnailUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/tasks/2552fd70-181a-46be-ba92-0efb637d3513/2206_Math-Money%2C%20Time_Data%28gr2-3%29%2805%2912_thumbnail.png?response-cache-control=max-age%3D3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=foobar%2F20231005%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231005T071626Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=58b24007b7e23fcbcb3ec28db481b3c4241b76b0a48692ada5b65bdb06e29ea9',
                __typename: 'PortfolioProject',
              },
              __typename: 'PortfolioProjectEdge',
            },
          ],
          pageInfo: {
            endCursor: 'Mg',
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: 'MQ',
            __typename: 'PageInfo',
          },
          __typename: 'PortfolioProjectConnection',
        },
        studentId: '10458831',
        __typename: 'Portfolio',
      },
    },
  },
};

export const portfolioLearningEmptyProjectsMock: MockedResponse<TPortfolioProjectConnectionData> = {
  request: {
    query: PORTFOLIO_PROJECTS,
    variables: { type: 'PBL' },
  },
  result: {
    data: {
      portfolio: {
        projects: {
          totalCount: 0,
          edges: [],
          pageInfo: {
            endCursor: 'MTM',
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: 'MQ',
          },
        },
        studentId: '10458251',
      },
    },
  },
};

export const portfolioPersonalEmptyProjectsMock: MockedResponse<TPortfolioProjectConnectionData> = {
  request: {
    query: PORTFOLIO_PROJECTS,
    variables: { first: 10, type: 'PERSONAL' },
  },
  result: {
    data: {
      portfolio: {
        projects: {
          totalCount: 0,
          edges: [],
          pageInfo: {
            endCursor: '',
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: '',
          },
        },
        studentId: '10458831',
      },
    },
  },
};

export const portfolioPersonalProjectsMock: MockedResponse<TPortfolioProjectConnectionData> = {
  request: {
    query: PORTFOLIO_PROJECTS,
    variables: { first: 10, type: 'PERSONAL' },
  },
  result: {
    data: {
      portfolio: {
        projects: {
          totalCount: 1,
          edges: [
            {
              cursor: 'MQ',
              node: {
                description: 'Test',
                id: '1',
                imageUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/portfolio_projects/725e6756-6aad-4629-83fa-bf0d5a2fdcfb/Alaska_icon.jpeg?response-cache-control=max-age%3D3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=foobar%2F20231006%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231006T055752Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=16c4effc5d11aac56219986c2a2c7259930d494bea8b3471290cbfe0fb218615',
                name: 'testProject',
                parentName: '',
                resourceClass: PortfolioResourceClass.PORTFOLIO_PROJECT,
                submission: {
                  files: [],
                  status: PORTFOLIO_PROJECT_SUBMISSION_STATUS.SUBMITTED,
                },
                finishedAt: '2023-10-06',
                thumbnailUrl:
                  'http://localstack.lvh.me:4566/dev-bucket/images/portfolio_projects/725e6756-6aad-4629-83fa-bf0d5a2fdcfb/Alaska_icon_thumbnail.png?response-cache-control=max-age%3D3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=foobar%2F20231006%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231006T055752Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=e79ee8c9fd114d3ab6eea16b1d6de4aba32f11fb7b46237823d16af053c0dd7f',
                isHighlighted: false,
                isTeamSubmission: false,
                type: PortfolioProjectType.LESSON,
              },
            },
          ],
          pageInfo: {
            endCursor: 'MQ',
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: 'MQ',
          },
        },
        studentId: '10458831',
      },
    },
  },
};
export const updateResumeSpy = jest.fn();

export const updateResumeMock: MockedResponse<TUpdateResumeData> = {
  request: {
    query: UPDATE_RESUME,
    variables: {
      input: {
        bio: 'test bio',
        contactLinks: [
          { value: 'mail@test.com', visible: true, type: 'EMAIL' },
          { value: '1234567890', visible: true, type: 'PHONE' },
          { value: 'linkedin.com', visible: true, type: 'LINKEDIN' },
          { value: 'custom2.com', visible: false, type: 'CUSTOM' },
        ],
        highlightedProjectsEnabled: false,
        name: 'Amanda Jewess- Test Name',
        sharedUrlEnabled: false,
        experiences: [],
        educations: [],
        extraCurriculars: [],
        highlightedProjects: [],
        highlightedBadgeIds: [],
      },
    },
  },
  result: () => {
    updateResumeSpy();

    return {
      data: {
        updateResume: {
          resume: {
            bio: 'test bio',
            contactLinks: [
              { id: '182', type: CONTACT_LINK_TYPES.EMAIL, value: 'mail@test.com', visible: true },
              { id: '183', type: CONTACT_LINK_TYPES.PHONE, value: '1234567890', visible: true },
              {
                id: '184',
                type: CONTACT_LINK_TYPES.LINKEDIN,
                value: 'linkedin.com',
                visible: true,
              },
              { id: '185', type: CONTACT_LINK_TYPES.CUSTOM, value: 'custom.com', visible: true },
              {
                id: 'custom-id',
                value: 'custom2.com',
                visible: false,
                type: CONTACT_LINK_TYPES.CUSTOM,
              },
            ],
            highlightedProjectsEnabled: false,
            name: 'Amanda Jewess- Test Name',
            sharedUrlEnabled: false,
            experiences: [],
            externalResumes: [],
            educations: [],
            sharedUrl: 'someURL',
            avatarUrl: '',
            id: '11',
            extraCurriculars: [],
            highlightedProjects: [],
            badges: [],
            dcProjects: { nodes: [] },
            dlProjects: { nodes: [] },
            personalProjects: { nodes: [] },
            highlightedBadges: [],
            shareCode: 'share-code',
          },
        },
      },
    };
  },
};

export const updateExperienceSpy = jest.fn();

export const updateExperienceMock: MockedResponse = {
  request: {
    query: UPDATE_RESUME,
    variables: {
      input: {
        bio: '',
        contactLinks: [
          { value: '', visible: true, type: 'EMAIL' },
          { value: '', visible: true, type: 'PHONE' },
          { value: '', visible: true, type: 'LINKEDIN' },
        ],
        highlightedProjectsEnabled: false,
        name: 'Amanda Jewess',
        sharedUrlEnabled: false,
        experiences: [
          {
            description: 'test experience description',
            name: 'test experience',
            endedAt: '2023-12-01',
            startedAt: '2023-01-01',
            visible: false,
          },
        ],
        educations: [],
        extraCurriculars: [],
        highlightedProjects: [],
        highlightedBadgeIds: [],
      },
    },
  },
  // @ts-ignore
  result: () => {
    updateExperienceSpy();

    return {
      data: {
        updateResume: {
          resume: {
            id: 'resume-id',
            name: 'Amanda Jewess - Test Name',
            bio: 'test bio',
            avatarUrl: null,
            highlightedProjectsEnabled: false,
            sharedUrlEnabled: false,
            sharedUrl: '',
            contactLinks: [
              {
                id: '182',
                value: 'mail@test.com',
                visible: true,
                type: 'EMAIL',
              },
              {
                id: '183',
                value: '1234567890',
                visible: true,
                type: 'PHONE',
              },
              {
                id: '184',
                value: 'linkedin.com',
                visible: true,
                type: 'LINKEDIN',
              },

              {
                id: '191',
                value: 'custom2.com',
                visible: false,
                type: 'CUSTOM',
              },
            ],
            experiences: [
              {
                description: 'test experience description',
                name: 'test experience',
                endedAt: '2023-12-01',
                startedAt: '2023-01-01',
                visible: false,
                id: '111',
              },
            ],
            extraCurriculars: [],
            externalResumes: [],
            educations: [],
            personalProjects: { nodes: [] },
            dcProjects: { nodes: [] },
            dlProjects: { nodes: [] },
            badges: [],
            highlightedBadges: [],
          },
        },
      },
    };
  },
};

export const updateEducationSpy = jest.fn();

export const updateEducationMock = {
  request: {
    query: UPDATE_RESUME,
    variables: {
      input: {
        bio: '',
        contactLinks: [
          { value: '', visible: true, type: 'EMAIL' },
          { value: '', visible: true, type: 'PHONE' },
          { value: '', visible: true, type: 'LINKEDIN' },
        ],
        highlightedProjectsEnabled: false,
        name: 'Amanda Jewess',
        sharedUrlEnabled: false,
        experiences: [],
        educations: [
          {
            description: 'test experience description',
            name: 'test education',
            endedAt: '2023-12-01',
            startedAt: '2023-01-01',
            visible: false,
          },
        ],
        extraCurriculars: [],
        highlightedProjects: [],
        highlightedBadgeIds: [],
      },
    },
  },
  // @ts-ignore
  result: () => {
    updateEducationSpy();

    return {
      data: {
        updateResume: {
          resume: {
            id: 'resume-id',
            name: 'Amanda Jewess - Test Name',
            bio: 'test bio',
            avatarUrl: null,
            highlightedProjectsEnabled: false,
            sharedUrlEnabled: false,
            sharedUrl: '',
            contactLinks: [
              {
                id: '182',
                value: 'mail@test.com',
                visible: true,
                type: 'EMAIL',
              },
              {
                id: '183',
                value: '1234567890',
                visible: true,
                type: 'PHONE',
              },
              {
                id: '184',
                value: 'linkedin.com',
                visible: true,
                type: 'LINKEDIN',
              },
              {
                id: '185',
                value: 'custom.com',
                visible: true,
                type: 'CUSTOM',
              },
              {
                id: '191',
                value: 'custom2.com',
                visible: false,
                type: 'CUSTOM',
              },
            ],
            experiences: [],
            extraCurriculars: [],
            externalResumes: [],
            educations: [
              {
                description: 'test education description',
                name: 'test education',
                endedAt: '2023-12-01',
                startedAt: '2023-01-01',
                visible: false,
                id: '111',
              },
            ],
            personalProjects: { nodes: [] },
            dcProjects: { nodes: [] },
            dlProjects: { nodes: [] },
            badges: [],
            highlightedBadges: [],
          },
        },
      },
    };
  },
};

export const updateExtraCurricularsSpy = jest.fn();

export const updateExtraCurricularsMock = {
  request: {
    query: UPDATE_RESUME,
    variables: {
      input: {
        bio: '',
        contactLinks: [
          { value: '', visible: true, type: 'EMAIL' },
          { value: '', visible: true, type: 'PHONE' },
          { value: '', visible: true, type: 'LINKEDIN' },
        ],
        highlightedProjectsEnabled: false,
        name: 'Amanda Jewess',
        sharedUrlEnabled: false,
        experiences: [],
        educations: [],
        extraCurriculars: [
          {
            description: 'test experience description',
            name: 'test extra-curriculars',
            endedAt: '2023-12-01',
            startedAt: '2023-01-01',
            visible: false,
          },
        ],
        highlightedProjects: [],
        highlightedBadgeIds: [],
      },
    },
  },
  // @ts-ignore
  result: () => {
    updateExtraCurricularsSpy();

    return {
      data: {
        updateResume: {
          resume: {
            id: 'resume-id',
            name: 'Amanda Jewess - Test Name',
            bio: 'test bio',
            avatarUrl: null,
            highlightedProjectsEnabled: false,
            sharedUrlEnabled: false,
            sharedUrl: '',
            contactLinks: [
              {
                id: '182',
                value: 'mail@test.com',
                visible: true,
                type: 'EMAIL',
              },
              {
                id: '183',
                value: '1234567890',
                visible: true,
                type: 'PHONE',
              },
              {
                id: '184',
                value: 'linkedin.com',
                visible: true,
                type: 'LINKEDIN',
              },
              {
                id: '185',
                value: 'custom.com',
                visible: true,
                type: 'CUSTOM',
              },
              {
                id: '191',
                value: 'custom2.com',
                visible: false,
                type: 'CUSTOM',
              },
            ],
            experiences: [],
            extraCurriculars: [
              {
                description: 'test extraCurriculars description',
                name: 'test extraCurriculars',
                endedAt: '2023-12-01',
                startedAt: '2023-01-01',
                visible: false,
                id: '111',
              },
            ],
            externalResumes: [],
            educations: [],
            personalProjects: { nodes: [] },
            dcProjects: { nodes: [] },
            dlProjects: { nodes: [] },
            badges: [],
            highlightedBadges: [],
          },
        },
      },
    };
  },
};
