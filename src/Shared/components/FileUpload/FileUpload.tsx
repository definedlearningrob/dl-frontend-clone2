import { PropsWithChildren, useState } from 'react';
import { FileError } from 'react-dropzone';

import { GoogleUploadHandlerData } from '@shared/resources/types';
import { UPLOAD_FILE_TYPE } from '@shared/resources/enums';

import SharedDropableArea from '../DropableArea/DropableArea';
import GoogleDropableArea from '../GoogleDropableArea/GoogleDropableArea';

import FileTypeSelector from './FileTypeSelector/FileTypeSelector';
import styles from './FilesUpload.module.sass';

type Props = PropsWithChildren<{
  onFilePick: (files: File[]) => Promise<void>;
  onGoogleFilePick: (data: GoogleUploadHandlerData) => Promise<void>;
  disabled?: boolean;
  validator?: (file: File) => FileError | null;
}>;

const FilesUploadSection = ({
  children,
  onFilePick,
  onGoogleFilePick,
  disabled,
  validator,
}: Props) => {
  const [uploadType, setUploadType] = useState<UPLOAD_FILE_TYPE>(UPLOAD_FILE_TYPE.FILE);

  return (
    <div className={styles.wrapper}>
      <FileTypeSelector type={uploadType} onChange={setUploadType} />
      {children}
      {uploadType === UPLOAD_FILE_TYPE.FILE ? (
        <SharedDropableArea
          className='!pt-0 h-[120px]'
          disabled={disabled}
          multiple={true}
          validator={validator}
          onDrop={onFilePick}
        />
      ) : (
        <GoogleDropableArea
          className='!pt-0 h-[120px]'
          disabled={disabled}
          onChange={onGoogleFilePick}
        />
      )}
    </div>
  );
};

export default FilesUploadSection;
