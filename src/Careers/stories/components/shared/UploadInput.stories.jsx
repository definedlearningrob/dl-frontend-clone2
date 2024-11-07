import { useState } from 'react';

import SharedUploadInput from '@dc/shared/UploadInput/UploadInput';

export default {
  component: SharedUploadInput,
  title: 'Upload Input',
  parameters: {
    componentSubtitle: 'shared upload input with label',
  },
};

export const Default = () => {
  const [files, setFiles] = useState([]);

  return (
    <SharedUploadInput inputConfig={{ onChange: setFiles, value: files }} label='Upload input' />
  );
};
