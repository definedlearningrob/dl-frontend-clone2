import { InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

import { dualPagination } from '@shared/utils/cache';

export default new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        assignedTasks: {
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
          read(existing) {
            return existing;
          },
        },
        myTasks: {
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
        schoolClasses: {
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
        tracks: {
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
        schoolClassActivityLog: relayStylePagination(),
        task: {
          keyArgs: ['id', 'teamId'],
        },
        tasks: dualPagination(),
      },
    },
    Task: {
      merge: true,
      keyFields: (data) => {
        const hasTeam = Object.keys(data).find((fieldName) => fieldName === 'team');

        if (hasTeam) return ['id', 'team', ['id']];

        return ['id'];
      },
    },
    Unit: {
      merge: true,
    },
    Catalog: {
      fields: {
        tracks: {
          merge(
            { nodes = [] } = {},
            { nodes: incomingNodes = [], pagesCount = 0, nodesCount = 0 } = {}
          ) {
            return {
              nodes: [...nodes, ...incomingNodes],
              pagesCount,
              nodesCount,
            };
          },
          read(existing) {
            return existing;
          },
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
    Portfolio: {
      fields: {
        projects: relayStylePagination(['$type']),
      },
      keyFields: ['studentId'],
    },
    AdminDashboard: {
      fields: {
        users: {
          merge: true,
        },
        entity: {
          merge: true,
        },
        entities: {
          merge: true,
        },
      },
    },
    TeacherDashboard: {
      keyFields: ['userId'],
      fields: {
        activityLog: relayStylePagination(),
      },
    },
    Entity: {
      keyFields: ['uuid'],
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
    SchoolClass: {
      keyFields: ['uuid'],
      merge: true,
    },
    CheckInGroup: {
      keyFields: false,
    },
    CheckInQuestion: {
      keyFields: false,
    },
    Team: {
      keyFields: (data) => {
        const hasUUID = Object.keys(data).find((fieldName) => fieldName === 'uuid');

        if (hasUUID) return ['uuid'];

        return ['id'];
      },
    },
    Student: {
      keyFields: (data) => {
        const hasUUID = Object.keys(data).some((fieldName) => fieldName === 'uuid');

        if (hasUUID) return ['uuid'];

        return false;
      },
    },
    PortfolioProject: {
      keyFields: ['id', 'resourceClass'],
    },
    PortfolioSubmission: {
      merge: true,
    },
    PlanReport: {
      merge: true,
    },

    Reports: {
      merge: false,
    },
    Badge: {
      keyFields: ['id', 'resource'],
    },
  },
});
