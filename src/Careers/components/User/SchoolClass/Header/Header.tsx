import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AnnouncementModal from '@dc/components/Announcements/Modal/Modal';
import schoolClassPlansQuery from '@dc/graphql/user/queries/schoolClassPlans';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import UserDemoLabel from '@dc/components/User/shared/DemoLabel/DemoLabel';
import UserReportModal from '@dc/components/User/Report/Modal/Modal';
import UserSchoolClassHeaderSettingsModal from '@dc/components/User/SchoolClass/Header/Settings/Modal/Modal';
import { ReactComponent as Announcements } from '@dc/svg/announcement.svg';
import { ReportLevels } from '@dc/resources/enums';
import type { TSchoolClass } from '@dc/graphql/user/queries/schoolClass';

import SharedButton from '@shared/components/Button/Button';
import SharedDropdown from '@shared/components/Dropdown/Dropdown';

type Props = {
  schoolClass: TSchoolClass;
  searchProps: object;
};

type TModalState = {
  showAnnouncementsModal?: boolean;
  showClassSettingsModal?: boolean;
  showReportModal?: boolean;
};

function UserSchoolClassHeader({ schoolClass, searchProps }: Props) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState<TModalState>({
    showAnnouncementsModal: false,
    showClassSettingsModal: false,
    showReportModal: false,
  });

  const { data: plansData } = useQuery(schoolClassPlansQuery, {
    variables: { uuid: schoolClass.uuid },
    skip: !showModal.showReportModal,
  });

  const toggleModal = (
    value: 'showAnnouncementsModal' | 'showClassSettingsModal' | 'showReportModal'
  ) => {
    setShowModal({
      [value]: !showModal[value],
    });
  };

  return (
    <header className='user-class__header'>
      <div className='user-class__header__top'>
        <h2 className='user-class__header__class-info'>
          <span className='user-class__header__entity-name'>{schoolClass.entity.name}</span>
          <div className='user-class__header__class-name'>
            {schoolClass.name}
            {schoolClass.isDemo && <UserDemoLabel />}
          </div>
        </h2>
        <SharedButton
          Icon={Announcements}
          className='user-class__header__button'
          variant='primary'
          onClick={() => toggleModal('showAnnouncementsModal')}>
          {t('user.class.makeAnnouncement')}
        </SharedButton>
        <SharedDropdown>
          <SharedDropdown.Trigger>
            <SharedButton className='user-class__header__button' variant='primary-outlined'>
              {t('user.class.more.label')}
            </SharedButton>
          </SharedDropdown.Trigger>
          <SharedDropdown.Options>
            <SharedDropdown.Option onClick={() => toggleModal('showClassSettingsModal')}>
              {t('user.class.more.settings')}
            </SharedDropdown.Option>
            <SharedDropdown.Option onClick={() => toggleModal('showReportModal')}>
              {t('user.class.more.report')}
            </SharedDropdown.Option>
          </SharedDropdown.Options>
        </SharedDropdown>
      </div>
      <div className='user-class__header__bottom'>
        <h2 className='user-class__header__label'>{t('user.class.students')}</h2>
        <SharedFilterProvider.Search
          className='user-class__header__search-bar'
          field='fullName'
          placeholder={t('common.placeholders.searchFor', {
            field: t('user.class.students').toLowerCase(),
          })}
          {...searchProps}
        />
      </div>
      {showModal.showAnnouncementsModal && (
        <AnnouncementModal
          receiver={{
            uuid: schoolClass.uuid,
            entityName: schoolClass.entity.name,
            schoolClassName: schoolClass.name,
          }}
          onModalClose={() => toggleModal('showAnnouncementsModal')}
        />
      )}
      {showModal.showClassSettingsModal && (
        <UserSchoolClassHeaderSettingsModal
          closeModal={() => toggleModal('showClassSettingsModal')}
          schoolClassName={schoolClass.name}
          schoolClassUuid={schoolClass.uuid}
          settings={schoolClass.settings}
          showModal={true}
        />
      )}
      {showModal.showReportModal && (
        <UserReportModal
          level={ReportLevels.SCHOOL_CLASS}
          levelUuid={schoolClass.uuid}
          plans={plansData?.schoolClass.entity.plans}
          onClose={() => toggleModal('showReportModal')}
        />
      )}
    </header>
  );
}

export default UserSchoolClassHeader;
