import { useState } from 'react';

import { ExtensionList, ExtensionModal } from '@dc/components/EntityInfoExtensions';

export const Extensions = () => {
  const [isAssignModalOpen, setAssignModalOpen] = useState(false);

  const toggleModal = () => setAssignModalOpen(!isAssignModalOpen);

  return (
    <>
      <ExtensionList toggleModal={toggleModal} />
      <ExtensionModal isOpen={isAssignModalOpen} onDismiss={toggleModal} />
    </>
  );
};
