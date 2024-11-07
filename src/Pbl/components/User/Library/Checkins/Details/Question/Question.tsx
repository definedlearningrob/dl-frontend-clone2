import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { TLibraryCheckin } from '@pbl/graphql/user/queries/checkInQuestions';

import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import ItemWrapper from '@shared/components/ItemWrapper/ItemWrapper';

import QuestionEditMode from './EditMode/EditMode';
import styles from './Question.module.sass';

type QuestionWrapperProps = {
  checkin: TLibraryCheckin;
  onArchive: (checkins: TLibraryCheckin[]) => void;
};
const QuestionWrapper = ({ checkin, onArchive }: QuestionWrapperProps) => {
  const { state } = useLocation<{ withEdit: boolean }>();
  const [editMode, setEditMode] = useState(state ? state.withEdit : false);
  const { t } = useTranslation();

  useEffect(() => {
    if (state) {
      setEditMode(state.withEdit);
    }
  }, [state]);

  const toggleEditMode = () => setEditMode((prev) => !prev);

  const handleOnArchive = () => {
    onArchive([checkin]);
  };

  return (
    <ItemWrapper>
      <ItemWrapper.Header>
        <ItemWrapper.Kicker>{t('user.library.checkins.details.question')}</ItemWrapper.Kicker>
        <div className={styles.actions}>
          <DeprecatedIconButton.Edit onClick={toggleEditMode} />
          <DeprecatedIconButton.Delete onClick={handleOnArchive} />
        </div>
      </ItemWrapper.Header>
      <ItemWrapper.Body>
        {editMode ? (
          <QuestionEditMode
            id={checkin.id}
            question={checkin.question}
            onDismiss={toggleEditMode}
          />
        ) : (
          <p className={styles.question}>
            <i>{checkin.question}</i>
          </p>
        )}
      </ItemWrapper.Body>
    </ItemWrapper>
  );
};

export default QuestionWrapper;
