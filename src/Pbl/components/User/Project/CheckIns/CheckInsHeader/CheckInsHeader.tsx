import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useCustomizeProject from '@pbl/hooks/useCustomizeProject';
import useUserInfo from '@pbl/hooks/useUserInfo';
import { TUserInfo } from '@pbl/graphql/user/queries/userInfo';

import DataBadge from '@shared/components/DataBadge/DataBadge';
import SharedButton from '@shared/components/Button/Button';
import SharedDropdown from '@shared/components/Dropdown/Dropdown';

import styles from './CheckInsHeader.module.sass';

type Props = {
  allQuestionsLength: number;
  toggleCreateQuestionModalIsOpen: () => void;
};

const CheckInsHeader = ({ allQuestionsLength, toggleCreateQuestionModalIsOpen }: Props) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { editMode } = useCustomizeProject();
  const { projectId } = useParams<{ projectId: string }>();
  const { userInfo } = useUserInfo<TUserInfo>();

  const redirectToLibrary = () => history.push(`/projects/${projectId}/checkins`);

  return (
    <>
      <div className={styles.headerContainer}>
        <DataBadge
          badgeValue={allQuestionsLength}
          text={t('project.checkIns.checkInsQuestionList')}
        />
        <div className={styles.headerBottom}>
          <p className={styles.text}>{t('project.checkIns.checkInsQuestionListInfo')}</p>
          {editMode && !userInfo.isSystemAdmin && (
            <SharedDropdown>
              <SharedDropdown.Dropdown>
                <SharedDropdown.Trigger>
                  <SharedButton className={styles.trigger} size='sm' variant='primary'>
                    {t('project.checkIns.createNewCheckInQuestion.addCheckIn')}
                  </SharedButton>
                </SharedDropdown.Trigger>
                <SharedDropdown.Options>
                  <SharedDropdown.Option onClick={toggleCreateQuestionModalIsOpen}>
                    {t('project.checkIns.createNewCheckInQuestion.createNew')}
                  </SharedDropdown.Option>
                  <SharedDropdown.Option onClick={redirectToLibrary}>
                    {t('project.checkIns.createNewCheckInQuestion.fromLibrary')}
                  </SharedDropdown.Option>
                </SharedDropdown.Options>
              </SharedDropdown.Dropdown>
            </SharedDropdown>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckInsHeader;
