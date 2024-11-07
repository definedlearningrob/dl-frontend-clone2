import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { isEmpty } from 'lodash-es';
import { DocumentNode } from 'graphql';

import { FILE_TO_DOWNLOAD_KEY } from '@shared/resources/constants';

type FileDownloadContext = {
  fileToDownload: FileToDownloadConfig | null;
  setFileToDownload: (fileConfig: FileToDownloadConfig | null) => void;
};

type FileToDownloadConfig = {
  query: DocumentNode;
  mutation: DocumentNode;
  variables: any;
  id?: string;
};

const FileDownloadContext = createContext<FileDownloadContext>({} as FileDownloadContext);

type Props = {
  children: ReactNode;
};

export const FileDownloadProvider = ({ children }: Props) => {
  const cachedFileToDownload = localStorage.getItem(FILE_TO_DOWNLOAD_KEY) || '';

  try {
    JSON.parse(cachedFileToDownload);
  } catch {
    localStorage.removeItem(FILE_TO_DOWNLOAD_KEY);
  }

  const [fileToDownload, setFileToDownload] = useState(
    cachedFileToDownload ? JSON.parse(cachedFileToDownload) : null
  );

  const setFileToDownloadWithCache = (file: FileToDownloadConfig | null) => {
    if (!file) {
      localStorage.removeItem(FILE_TO_DOWNLOAD_KEY);
    } else {
      localStorage.setItem(FILE_TO_DOWNLOAD_KEY, JSON.stringify(file));
    }
    setFileToDownload(file);
  };

  const memoizedContextValue = useMemo(
    () => ({
      fileToDownload,
      setFileToDownload: setFileToDownloadWithCache,
    }),
    [fileToDownload, setFileToDownloadWithCache]
  );

  return (
    <FileDownloadContext.Provider value={memoizedContextValue}>
      {children}
    </FileDownloadContext.Provider>
  );
};

export const useFileDownload = () => {
  const context = useContext(FileDownloadContext);

  if (isEmpty(context)) {
    throw new Error('useFileDownload must be used within a FileDownloadProvider');
  }

  return context;
};
