import { useEffect, useState } from 'react';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import ExtensionsModal from '@dc/components/Extensions/Modal/Modal';
import ExtensionsList from '@dc/components/Extensions/List/List';
import ExtensionListHeader from '@dc/components/Extensions/List/Header/Header';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';

import styles from './Extensions.module.sass';

const UserExtensionFields = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [scope, setScope] = useState(ARCHIVABLE_STATUSES.ACTIVE);
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  const toggleModal = () => setModalOpen(!isModalOpen);

  return (
    <SharedMainContent className={styles.extensionsWrapper}>
      <SharedFilterProvider omitUrl={true}>
        {({ filter }) => (
          <>
            <ExtensionListHeader
              //@ts-ignore
              scope={scope}
              setPage={setCurrentPage}
              setScope={setScope}
              onModalOpen={toggleModal}
            />
            <ExtensionsList
              filter={filter}
              page={currentPage}
              scope={scope}
              setPage={setCurrentPage}
            />
          </>
        )}
      </SharedFilterProvider>
      <ExtensionsModal isOpen={isModalOpen} onDismiss={toggleModal} />
    </SharedMainContent>
  );
};

export default UserExtensionFields;
