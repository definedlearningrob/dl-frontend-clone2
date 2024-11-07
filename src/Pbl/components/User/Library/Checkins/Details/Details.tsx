import { useQuery } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import CHECKIN_PROJECTS, {
  type TCheckInQuestionData,
  type TCheckInQuestionVariables,
} from '@pbl/graphql/user/queries/checkInQuestion';
import { TLibraryCheckin } from '@pbl/graphql/user/queries/checkInQuestions';

import SharedCard from '@shared/components/Card/Card';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import DataSuspense from '@shared/components/DataSuspense/DataSuspense';

import AssignedInWrapper from './AssginedIn/AssignedInWrapper';
import QuestionWrapper from './Question/Question';
import styles from './Details.module.sass';

type UserLibraryCheckinsDetailsProps = {
  openModal: (checkins: TLibraryCheckin[]) => void;
};

const UserLibraryCheckinsDetails = ({ openModal }: UserLibraryCheckinsDetailsProps) => {
  const { checkinId } = useParams<{ checkinId: string }>();
  const { data, loading, error } = useQuery<TCheckInQuestionData, TCheckInQuestionVariables>(
    CHECKIN_PROJECTS,
    { variables: { id: checkinId } }
  );
  const history = useHistory();
  const { t } = useTranslation();

  const onClose = () => {
    history.push('/library/checkins');
  };

  const handleArchive = () => {
    if (data) {
      openModal([data.checkInQuestion]);
    }
  };

  const renderContent = () => {
    if (!loading && !error && data) {
      return (
        <>
          <QuestionWrapper
            key={checkinId}
            checkin={data.checkInQuestion}
            onArchive={handleArchive}
          />
          <AssignedInWrapper projects={data.checkInQuestion.tasks} />
        </>
      );
    }
  };

  return (
    <SharedCard className={styles.wrapper}>
      <SharedCard.Header className={styles.header}>
        <SharedCard.Title className={styles.heading} size='small'>
          {t('user.library.checkins.details.header')}
        </SharedCard.Title>
        <DeprecatedIconButton.Close onClick={onClose} />
      </SharedCard.Header>
      <SharedCard.Body className={styles.body}>
        <DataSuspense error={error} loading={loading}>
          {renderContent()}
        </DataSuspense>
      </SharedCard.Body>
    </SharedCard>
  );
};

export default UserLibraryCheckinsDetails;
