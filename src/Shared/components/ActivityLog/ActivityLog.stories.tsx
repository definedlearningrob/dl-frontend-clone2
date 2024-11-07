import { PropsWithChildren } from 'react';

import ActivityLog, { type TActivityItem } from '@shared/components/ActivityLog/ActivityLog';
import { ACTIVITY_TYPE } from '@shared/resources/enums';

export default {
  component: ActivityLog,
  title: 'Activity Log',
  backgroundColor: 'black',
  parameters: {
    componentSubtitle: 'Activity logs',
  },
};
const Wrapper = ({ children }: PropsWithChildren<{}>) => (
  <div
    style={{
      padding: '8px',
      backgroundColor: 'black',
    }}>
    {children}
  </div>
);

const mockData: TActivityItem[] = [
  {
    cursor: 'ABC',
    node: {
      type: ACTIVITY_TYPE.COURSE_ENROLLMENT,
      updatedAt: '2020-01-01T00:00:00.000Z',
      target: {
        name: 'Test',
        id: '1',
      },
      context: null,
      subject: {
        name: 'teSt',
        id: '2',
      },
    },
  },
  {
    cursor: 'DEF',
    node: {
      type: ACTIVITY_TYPE.COURSE_ASSIGNMENT,
      updatedAt: '2020-01-01T00:00:00.000Z',
      target: {
        name: 'Test',
        id: '1',
      },
      context: null,
      subject: {
        name: 'teSt',
        id: '2',
      },
    },
  },
];

export const Default = () => (
  <Wrapper>
    <ActivityLog data={mockData} loading={false} title='Activities' />
  </Wrapper>
);
