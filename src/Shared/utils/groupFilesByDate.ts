import dayjs from 'dayjs';

import { TProductSubmissionFile } from '@pbl/graphql/student/queries/projectProducts';

import { SubmissionContent } from '@shared/components/Submissions/helpers/types';

type SubmissionContentWithFiles = Omit<SubmissionContent, 'content'> & {
  content: TProductSubmissionFile[];
};

const MAX_TIME_DIFF_TO_GROUP = 300; // 5 minutes in seconds

export const groupFilesByDate = (files: TProductSubmissionFile[]) => {
  const groupedFiles = files.reduce((acc, file, currIndex) => {
    const prevItem = acc[currIndex - 1] || acc.at(-1);
    const fileDate = file.createdAt;
    const authorName = `${file.submitter.firstName} ${file.submitter.lastName}`;

    // last item is from same person
    if (file.submitter.uuid && prevItem?.author.uuid === file.submitter.uuid) {
      const currentTime = file.createdAt;
      const prevTime = prevItem.date;

      const diff = dayjs(currentTime).diff(prevTime, 'second');

      const isWithinTime = Math.abs(diff) < MAX_TIME_DIFF_TO_GROUP;

      if (isWithinTime && prevItem.content) {
        prevItem.content.push(file);
        prevItem.date = fileDate!;

        return acc;
      }
    }

    acc.push({
      id: file.id,
      author: {
        name: authorName!,
        uuid: file.submitter.uuid,
      },
      date: fileDate!,
      content: [file],
    });

    return acc;
  }, [] as any as SubmissionContentWithFiles[]);

  return groupedFiles.reverse();
};
