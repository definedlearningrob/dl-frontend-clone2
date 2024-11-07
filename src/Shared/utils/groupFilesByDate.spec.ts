import { TProductSubmissionFile } from '@pbl/graphql/student/queries/projectProducts';

import { SUBMISSION_FILE_SOURCE } from '@shared/resources/enums';

import { groupFilesByDate } from './groupFilesByDate';

const genericFiles: TProductSubmissionFile[] = [
  {
    id: '1',
    createdAt: '2021-03-01T12:00:00.000Z',
    submitter: {
      firstName: 'John',
      lastName: 'Doe',
      uuid: '1',
    },
    filename: 'file1',
    url: 'url1',
    source: SUBMISSION_FILE_SOURCE.LOCAL,
    googleWeblink: 'googleWeblink1',
  },
  {
    id: '2',
    createdAt: '2021-03-01T12:00:00.000Z',
    submitter: {
      firstName: 'John',
      lastName: 'Doe',
      uuid: '2',
    },
    filename: 'file1',
    url: 'url1',
    source: SUBMISSION_FILE_SOURCE.LOCAL,
    googleWeblink: 'googleWeblink1',
  },
  {
    id: '3',
    createdAt: '2021-03-01T12:00:00.000Z',
    submitter: {
      firstName: 'John',
      lastName: 'Doe',
      uuid: '3',
    },
    filename: 'file1',
    url: 'url1',
    source: SUBMISSION_FILE_SOURCE.LOCAL,
    googleWeblink: 'googleWeblink1',
  },
];

describe('groupTeamFilesByDate', () => {
  it('should not group files when they are from diffrent users', () => {
    const groupedFiles = groupFilesByDate(genericFiles);

    expect(groupedFiles).toHaveLength(3);
  });

  it('should reverse the entries', () => {
    const groupedFiles = groupFilesByDate(genericFiles);

    genericFiles.map((file, index) => {
      const currentIndex = groupedFiles.length - 1 - index;

      expect(groupedFiles[currentIndex].id).toEqual(file.id);
    });
  });

  it('should group the files when they are from the same user and within 300 seconds(5min)', () => {
    const newFiles = [
      ...genericFiles,
      {
        id: '4',
        createdAt: '2021-03-01T12:03:00.000Z',
        submitter: {
          firstName: 'John',
          lastName: 'Doe',
          uuid: '3',
        },
        filename: 'file1',
        url: 'url1',
        source: SUBMISSION_FILE_SOURCE.LOCAL,
        googleWeblink: 'googleWeblink1',
      },
      {
        id: '5',
        createdAt: '2021-03-01T12:06:00.000Z',
        submitter: {
          firstName: 'John',
          lastName: 'Doe',
          uuid: '3',
        },
        filename: 'file1',
        url: 'url1',
        source: SUBMISSION_FILE_SOURCE.LOCAL,
        googleWeblink: 'googleWeblink1',
      },
      {
        id: '6',
        createdAt: '2021-03-01T12:11:01.000Z',
        submitter: {
          firstName: 'John',
          lastName: 'Doe',
          uuid: '3',
        },
        filename: 'file1',
        url: 'url1',
        source: SUBMISSION_FILE_SOURCE.LOCAL,
        googleWeblink: 'googleWeblink1',
      },
      {
        id: '7',
        createdAt: '2021-03-01T12:11:05.000Z',
        submitter: {
          firstName: 'John',
          lastName: 'Doe',
          uuid: '4',
        },
        filename: 'file1',
        url: 'url1',
        source: SUBMISSION_FILE_SOURCE.LOCAL,
        googleWeblink: 'googleWeblink1',
      },
      {
        id: '7',
        createdAt: '2021-03-01T12:16:04.000Z',
        submitter: {
          firstName: 'John',
          lastName: 'Doe',
          uuid: '4',
        },
        filename: 'file1',
        url: 'url1',
        source: SUBMISSION_FILE_SOURCE.LOCAL,
        googleWeblink: 'googleWeblink1',
      },
    ];
    const groupedFiles = groupFilesByDate(newFiles);

    expect(groupedFiles).toHaveLength(5);
    expect(groupedFiles[0].content).toHaveLength(2); // 300 seconds diff user 4
    expect(groupedFiles[1].content).toHaveLength(1); // more than 300 seconds diff user 3
    expect(groupedFiles[2].content).toHaveLength(3); // all files are random within 300 seconds user 3
    expect(groupedFiles[3].content).toHaveLength(1); // within time but user 2
    expect(groupedFiles[4].content).toHaveLength(1); // within time but user 1
  });
});
