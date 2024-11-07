import dayjs from 'dayjs';

import { SubmissionContent } from '@shared/components/Submissions/helpers/types';
import { TFile } from '@shared/resources/types';

type SubmissionContentWithFiles = Omit<SubmissionContent, 'content'> & {
  content: TFile[];
};

const MAX_TIME_DIFF_TO_GROUP = 300; // 5 minutes in seconds

export const groupFilesByDate = (files: TFile[]) => {
  const groupedFiles = files.reduce((acc, file, currIndex) => {
    const prevItem = acc[currIndex - 1] || acc.at(-1);

    // last item is from same person
    if (prevItem?.author.uuid === file.submitter.uuid) {
      const currentTime = file.createdAt;
      const prevTime = prevItem.date;

      const diff = dayjs(currentTime).diff(prevTime, 'second');

      const isWithinTime = Math.abs(diff) < MAX_TIME_DIFF_TO_GROUP;

      if (isWithinTime && prevItem.content) {
        prevItem.content.push(file);
        prevItem.date = file.createdAt;

        return acc;
      }
    }

    acc.push({
      id: file.id,
      author: {
        name: `${file.submitter.firstName} ${file.submitter.lastName}`,
        uuid: file.submitter.uuid,
      },
      date: file.createdAt,
      content: [file],
    });

    return acc;
  }, [] as any as SubmissionContentWithFiles[]);

  return groupedFiles;
};
