import { NOTIFICATION_TYPES } from '@shared/resources/constants';

export type Notification = {
  actor: {
    firstName: string;
    lastName: string;
    uuid: string;
  };
  body: string;
  id: string;
  read: boolean;
  updatedAt: string;
  target: {
    id: string;
  };
  type?: NOTIFICATION_TYPES;
};

export type TNotificationsData = {
  notifications: {
    nodesCount: number;
    pagesCount: number;
    nodes: Notification[];
  };
};

export type TNotificationsVariables = {
  scope: string;
  page: number;
  perPage: number;
  type?: NOTIFICATION_TYPES;
};
