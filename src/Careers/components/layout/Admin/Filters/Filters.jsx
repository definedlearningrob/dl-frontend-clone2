import PropTypes from 'prop-types';

import '@dc/components/layout/Admin/Filters/Filters.sass';

LayoutAdminFilters.propTypes = {
  children: PropTypes.node.isRequired,
};

function LayoutAdminFilters({ children }) {
  return <div className='admin-filters'>{children}</div>;
}

export default LayoutAdminFilters;
