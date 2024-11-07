import { useMemo } from 'react';
import { useField } from 'formik';
import { PartnerFile } from '@graphql/dc/users/types';

import useUserInfo from '@dc/hooks/useUserInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';

import SharedDropableArea from '@shared/components/DropableArea/DropableArea';
import FileList from '@shared/components/FileList/FileList';

type DocumentFile = Pick<PartnerFile, 'filename' | 'createdAt' | 'url' | 'id'> & {
  submitter: Pick<PartnerFile['submitter'], 'uuid' | 'firstName' | 'lastName'>;
};

type NewDocumentFile = {
  file: File;
  src: string;
  createdAt: string;
};

export const PartnerDocuments = () => {
  const { userInfo } = useUserInfo<TUserInfo>();

  const [{ value: documents }, , { setValue: setDocuments }] =
    useField<DocumentFile[]>('documents');
  const [{ value: newDocuments }, , { setValue: setNewDocuments }] =
    useField<NewDocumentFile[]>('newDocuments');

  const handleUploadFiles = (files: File[]) => {
    const mappedFiles = files.map((file) => {
      const src = URL.createObjectURL(file);

      return { file, src, createdAt: new Date().toISOString() };
    });
    setNewDocuments([...newDocuments, ...mappedFiles]);
  };

  const handleArchiveFile = async (id: string) => {
    if (id.startsWith('new-')) {
      setNewDocuments(newDocuments.filter((_, index) => `new-${index}` !== id));
    } else {
      setDocuments(documents.filter((document) => document.id !== id));
    }
  };

  const currentUser = {
    uuid: userInfo.uuid,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
  };

  const allDocuments = useMemo(
    () => [
      ...documents,
      ...newDocuments.map((document, index) => ({
        filename: document.file.name,
        createdAt: document.createdAt,
        url: document.src,
        id: `new-${index}`,
        submitter: currentUser,
      })),
    ],
    [documents, newDocuments]
  );

  return (
    <div className='flex flex-col gap-base xxxl:gap-md'>
      <SharedDropableArea
        className='!p-0 h-[220px] xxxl:h-[420px]'
        multiple={true}
        onDrop={handleUploadFiles}
      />
      <FileList
        canArchiveAllFiles={true}
        className='!gap-x xxxl:!gap-sm'
        files={allDocuments}
        rounded={true}
        showDate={true}
        showModalOnArchive={false}
        showSubmitter={true}
        variant='light'
        onArchive={handleArchiveFile}
      />
    </div>
  );
};
