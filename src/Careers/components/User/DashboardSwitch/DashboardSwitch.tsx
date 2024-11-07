import { useTranslation } from 'react-i18next';

import SharedDropdown from '@dc/shared/Dropdown/Dropdown';
import useExpandSidebar from '@dc/hooks/useExpandSidebar';
import useUserInfo from '@dc/hooks/useUserInfo';
import { ROLES } from '@dc/resources/constants';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as AdminIcon } from '@shared/svg/admin.svg';
import { ReactComponent as ArrowIcon } from '@shared/svg/chevron_down.svg';
import { ReactComponent as UserIcon } from '@shared/svg/educator.svg';
import { Tooltip } from '@shared/components/Tooltip';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

import './DashboardSwitch.sass';

function UserDashboardSwitch() {
  const { t } = useTranslation();
  const {
    userInfo: { role },
  } = useUserInfo<TUserInfo>();
  const { activeDashboard, optionDashboard, toggleDashboardType } = useExpandSidebar();
  const { isExpanded } = useNavigation();
  const isEntityAdmin = activeDashboard.value === ROLES.ENTITY_ADMIN;

  if (role !== ROLES.ENTITY_ADMIN) return null;

  const activeDashboardIcon = isEntityAdmin ? <AdminIcon /> : <UserIcon />;
  const optionDashboardIcon = isEntityAdmin ? <UserIcon /> : <AdminIcon />;

  return (
    <SharedDropdown>
      <SharedDropdown.Dropdown className='dashboard-switch'>
        <SharedDropdown.Trigger className=''>
          <button className='dashboard-switch__button'>
            <SharedIcon icon={activeDashboardIcon} size='xs' />
            {isExpanded && (
              <div className='dashboard-switch__text-wrapper'>
                <div className='dashboard-switch__main-text'>
                  {t(`user.navigation.switch.${activeDashboard.label}`)}
                </div>
                <div className='dashboard-switch__secondary-text'>
                  {t('user.navigation.switch.workspace')}
                </div>
              </div>
            )}
            <SharedIcon className='dashboard-switch__chevron-icon' icon={<ArrowIcon />} size='xs' />
          </button>
        </SharedDropdown.Trigger>
        <SharedDropdown.Options className='dashboard-switch__list' onDropdownOpen={() => {}}>
          <Tooltip
            disabled={isExpanded}
            message={t(`user.navigation.switch.${optionDashboard.label}`)}
            side='right'>
            <SharedDropdown.Option
              className='dashboard-switch__button'
              onClick={toggleDashboardType}>
              <SharedIcon icon={optionDashboardIcon} size='xs' />
              {isExpanded && (
                <div className='dashboard-switch__text-wrapper'>
                  <div className='dashboard-switch__main-text'>
                    {t(`user.navigation.switch.${optionDashboard.label}`)}
                  </div>
                </div>
              )}
            </SharedDropdown.Option>
          </Tooltip>
        </SharedDropdown.Options>
      </SharedDropdown.Dropdown>
    </SharedDropdown>
  );
}

export default UserDashboardSwitch;
