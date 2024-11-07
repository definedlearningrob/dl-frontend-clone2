import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash-es';

import { ResumeFileItem } from '@shared/components/PortfolioResume/UploadModal/ResumeFileItem';

StudentPortfolioResumeUploadModalFileList.propTypes = {
  files: PropTypes.array,
  isSaving: PropTypes.bool,
  projectId: PropTypes.string,
  setFiles: PropTypes.func,
  uploadFilesProgress: PropTypes.shape({
    file: PropTypes.object,
    progress: PropTypes.number,
  }),
};

function StudentPortfolioResumeUploadModalFileList({ files, setFiles }) {
  const handleFileDeletion = (passedFile) => {
    const filteredFiles = files.filter((file) => file.filename !== passedFile.filename);

    setFiles(filteredFiles);
  };

  const addUploadedFile = (passedFile) => {
    setFiles((prevFiles) => {
      const filteredFiles = prevFiles.filter((file) => file.filename !== passedFile.filename);

      return [...filteredFiles, passedFile];
    });
  };

  const handleUploadCompleted = (uploadedFile) => {
    setFiles((prevFiles) => {
      const filteredFiles = prevFiles.filter((file) => file.filename !== uploadedFile.filename);

      return [...filteredFiles, { ...uploadedFile, isUploaded: true }];
    });
  };

  if (isEmpty(files)) {
    return null;
  }

  return (
    <ul>
      {files.map((file) => (
        <ResumeFileItem
          key={file.filename}
          addUploadedFile={addUploadedFile}
          file={file}
          onDelete={handleFileDeletion}
          onUploadComplete={handleUploadCompleted}
        />
      ))}
    </ul>
  );
}

export default StudentPortfolioResumeUploadModalFileList;
