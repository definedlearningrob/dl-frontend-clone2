import { useState } from 'react';

import SharedImageInput from '@dc/shared/ImageInput/ImageInput';

export default {
  component: SharedImageInput,
  title: 'Image Input',
  parameters: {
    componentSubtitle: 'shared image input with label',
  },
};

export const Default = () => {
  const [image, setImage] = useState(null);

  return (
    <SharedImageInput inputConfig={{ onChange: setImage, value: image }} label='Image input' />
  );
};
