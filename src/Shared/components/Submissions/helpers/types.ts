import { ReactNode } from 'react';

export type SubmissionContent = {
  id: string;
  author: {
    uuid: string;
    name: string;
  };
  date: string;
  content: ReactNode;
};
