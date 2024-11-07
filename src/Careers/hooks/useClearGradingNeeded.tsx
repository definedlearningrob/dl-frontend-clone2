import { useApolloClient } from '@apollo/client';
import { useUpdateEffect } from 'react-use';

type Args = {
  studentUuid: string;
  itemsToGrade: (Record<any, unknown> & {
    status: 'not-answered' | 'not-accepted' | 'updated' | 'accepted' | 'not-graded';
  })[];
  course: { id: string; gradingNeeded: boolean };
};

export const useClearGradingNeeded = ({ studentUuid, itemsToGrade = [], course }: Args) => {
  const { cache } = useApolloClient();

  const statuses = ['not-graded', 'updated'];

  const hasItemsToGrade = itemsToGrade.some(({ status }) => statuses.includes(status));

  useUpdateEffect(() => {
    if (!hasItemsToGrade) {
      cache.modify({
        id: cache.identify({ __typename: 'Student', uuid: studentUuid }),
        fields: {
          gradingNeeded: () => false,
        },
      });

      if (course) {
        setTimeout(() => {
          cache.evict({
            id: cache.identify({ __typename: 'Course', id: course.id }),
            fieldName: 'gradingNeeded',
          });
          cache.gc();
        }, 1500);
      }
    }
  }, [hasItemsToGrade]);
};
