import PropTypes from 'prop-types';

import './ListItem.sass';

ProjectOverviewListItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  title: PropTypes.string.isRequired,
};

function ProjectOverviewListItem({ children, title }) {
  return (
    <li className='user-project-overview-item'>
      <strong className='user-project-overview-item__title'>{title}:</strong>
      {children}
    </li>
  );
}

export default ProjectOverviewListItem;
