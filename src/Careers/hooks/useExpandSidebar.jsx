import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { ROLES } from '@dc/resources/constants';

ExpandSidebarProvider.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.object,
};

const ExpandSidebarContext = createContext();

export function ExpandSidebarProvider({ children, value }) {
  const history = useHistory();

  const [hideHeader, setHideHeader] = useState(false);

  const adminDashboardObject = {
    value: ROLES.ENTITY_ADMIN,
    label: 'entityAdmin',
    dashboardLink: '/',
  };
  const teacherDashboardObject = {
    value: ROLES.TEACHER,
    label: 'teacher',
    dashboardLink: '/teacher-dashboard',
  };

  const getInitialDashboardState = () => {
    const adminTeacherDashboardInitialPathRegex = /teacher-dashboard$/;
    const { pathname } = history.location;

    return adminTeacherDashboardInitialPathRegex.test(pathname)
      ? { active: teacherDashboardObject, option: adminDashboardObject }
      : { active: adminDashboardObject, option: teacherDashboardObject };
  };

  const [{ active, option }, setDashboardType] = useState(getInitialDashboardState);

  const toggleDashboardType = () => {
    setDashboardType({
      active: option,
      option: active,
    });

    history.push(option.dashboardLink);
  };

  return (
    <ExpandSidebarContext.Provider
      value={{
        activeDashboard: active,
        hideHeader,
        optionDashboard: option,
        setHideHeader,
        toggleDashboardType,
        ...value,
      }}>
      {children}
    </ExpandSidebarContext.Provider>
  );
}

function useExpandSidebar() {
  const { activeDashboard, hideHeader, optionDashboard, setHideHeader, toggleDashboardType } =
    useContext(ExpandSidebarContext);

  return {
    activeDashboard,
    hideHeader,
    optionDashboard,
    setHideHeader,
    toggleDashboardType,
  };
}

export default useExpandSidebar;
