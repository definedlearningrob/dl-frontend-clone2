import { useTranslation } from 'react-i18next';

import { TCheckInQuestionData } from '@pbl/graphql/user/queries/checkInQuestion';

import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import ItemWrapper from '@shared/components/ItemWrapper/ItemWrapper';

import AssginedInList from './List/List';
import styles from './AssignedInWrapper.module.sass';

type AssignedInWrapperProps = {
  projects: TCheckInQuestionData['checkInQuestion']['tasks'];
};

const AssignedInWrapper = ({ projects }: AssignedInWrapperProps) => {
  const { t } = useTranslation();

  return (
    <ItemWrapper>
      <ItemWrapper.Header>
        <ItemWrapper.Kicker>
          {t('user.library.checkins.details.assignedIn').toUpperCase()}
        </ItemWrapper.Kicker>
        <DeprecatedIconButton.Add className={styles.headerButton} />
      </ItemWrapper.Header>
      <ItemWrapper.Body>
        <AssginedInList projects={projects} />
      </ItemWrapper.Body>
    </ItemWrapper>
  );
};

export default AssignedInWrapper;
