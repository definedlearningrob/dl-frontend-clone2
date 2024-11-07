export const adminUsersWithEntity = {
  adminDashboard: {
    entity: {
      users: {
        nodes: [
          {
            entity: {
              name: 'SAMPLE ENTITY',
              parent: {
                name: null,
                uuid: '45676543',
              },
              uuid: '456543',
              __typename: 'EntityData',
            },
            firstName: 'Great',
            gradingNeeded: true,
            lastName: 'Teacher',
            role: 'TEACHER',
            schoolClassesCount: 1,
            uuid: '45676543',
            __typename: 'UserData',
          },
          {
            entity: {
              name: 'FIRST ENTITY',
              parent: {
                name: null,
                uuid: '45676543g',
              },
              uuid: '4565g43',
            },
            firstName: 'Great',
            gradingNeeded: false,
            lastName: 'Teacher',
            role: 'ENTITY_ADMIN',
            schoolClassesCount: 1,
            uuid: '45676543f',
          },
        ],
        pagesCount: 1,
        __typename: 'UserDataPage',
      },
      uuid: '45678754321',
      __typename: 'EntityData',
    },
    userId: '4',
    __typename: 'AdminDashboard',
  },
};
