import { FieldFunctionOptions, InMemoryCache, StoreObject } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

import { dualPagination } from '@shared/utils/cache';

export default new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        badges: dualPagination(),
        units: dualPagination(),
        tags: dualPagination(),
        announcements: relayStylePagination(),
        allCourses: dualPagination(),
        courses: dualPagination(),
        conversationGroups: relayStylePagination(),
        recentApplications: relayStylePagination(),
        entities: dualPagination(),
        extensionFields: {
          merge({ nodes = [] } = {}, incoming) {
            return {
              nodes: [...nodes, ...incoming.nodes],
              pagesCount: incoming.pagesCount,
              nodesCount: incoming.nodesCount,
            };
          },
          read(existing) {
            return existing;
          },
        },
        notifications: {
          merge({ nodes = [] } = {}, incoming) {
            return {
              nodes: [...nodes, ...incoming.nodes],
              pagesCount: incoming.pagesCount,
              nodesCount: incoming.nodesCount,
            };
          },
          read(
            { nodes = [], pagesCount, nodesCount } = {},
            { readField, args }: FieldFunctionOptions
          ) {
            const newNodes = nodes.filter((node: StoreObject) => {
              const nodeType = readField('type', node);

              return args?.type === nodeType;
            });

            return {
              nodes: newNodes,
              pagesCount,
              nodesCount,
            };
          },
        },
        institutions: {
          merge({ nodes = [] } = {}, incoming) {
            return {
              nodes: [...nodes, ...incoming.nodes],
              pagesCount: incoming.pagesCount,
              nodesCount: incoming.nodesCount,
            };
          },
          read(existing) {
            return existing;
          },
        },
        opportunities: {
          merge({ nodes = [] } = {}, incoming, { variables }) {
            return {
              //@ts-ignore
              nodes: variables.infiniteScroll ? [...nodes, ...incoming.nodes] : incoming.nodes,
              pagesCount: incoming.pagesCount,
              nodesCount: incoming.nodesCount,
            };
          },
          read(existing) {
            return existing;
          },
        },
        partners: {
          merge({ nodes = [] } = {}, incoming, { variables }) {
            return {
              //@ts-ignore
              nodes: variables.infiniteScroll ? [...nodes, ...incoming.nodes] : incoming.nodes,
              pagesCount: incoming.pagesCount,
              nodesCount: incoming.nodesCount,
            };
          },
          read(existing) {
            return existing;
          },
        },
      },
    },
    AdminDashboard: {
      keyFields: ['userId'],
      fields: {
        entity: {
          merge: true,
        },
      },
    },
    Conversation: {
      fields: {
        messages: relayStylePagination(),
      },
    },
    ConversationGroup: {
      keyFields: ['participant', ['uuid']],
    },
    Institution: {
      fields: {
        programs: {
          merge({ nodes = [] } = {}, incoming, { variables }) {
            return {
              //@ts-ignore
              nodes: variables.infiniteScroll ? [...nodes, ...incoming.nodes] : incoming.nodes,
              pagesCount: incoming.pagesCount,
              nodesCount: incoming.nodesCount,
            };
          },
          read(existing) {
            return existing;
          },
        },
      },
    },
    Entity: {
      keyFields: ['uuid'],
      merge: true,
    },
    EntityData: {
      keyFields: ['uuid'],
      fields: {
        settings: {
          merge: true,
        },
      },
    },
    EntitySettings: {
      merge: true,
    },
    Portfolio: {
      fields: {
        projects: relayStylePagination(['$type']),
      },
      keyFields: ['studentId'],
    },
    SchoolClass: {
      keyFields: ['uuid'],
      fields: {
        students: {
          merge({ nodes = [] } = {}, incoming, { readField }) {
            const newNodes = nodes.filter(
              (node: StoreObject) =>
                !incoming.nodes.find(
                  (incomingNode: StoreObject) =>
                    readField('uuid', incomingNode) === readField('uuid', node)
                )
            );

            return { nodes: [...newNodes, ...incoming.nodes], pagesCount: incoming.pagesCount };
          },
          read(existing) {
            return existing;
          },
        },
      },
    },
    Opportunity: {
      merge: true,
      fields: {
        virtualInternship: {
          merge: true,
        },
        entities: {
          merge: false,
        },
      },
    },
    Student: {
      keyFields: (data) => {
        const hasUUID = Object.keys(data).some((fieldName) => fieldName === 'uuid');

        if (hasUUID) return ['uuid'];

        return false;
      },
    },
    TeacherDashboard: {
      keyFields: ['userId'],
      fields: {
        activityLog: relayStylePagination(),
      },
    },

    UserInfo: {
      keyFields: ['uuid'],
    },
    CommonAppData: {
      merge: true,
    },
    LessonItem: {
      keyFields: false,
    },
    Tag: {
      merge: true,
    },
    RecommendationRequest: {
      keyFields: ['applicant', ['uuid']],
    },
    PortfolioProject: {
      keyFields: ['id', 'resourceClass'],
    },
    PlanReport: {
      merge: true,
    },
    Reports: {
      merge: false,
    },
    PortfolioSubmission: {
      merge: true,
    },
    Badge: {
      keyFields: (data) => {
        const hasResource = Object.keys(data).some((fieldName) => fieldName === 'resource');

        if (hasResource) return ['id', 'resource'];

        return ['id'];
      },
    },
    StudentBadge: {
      keyFields: ['id', 'resource'],
    },
    Catalog: {
      merge: true,
    },
  },
});
