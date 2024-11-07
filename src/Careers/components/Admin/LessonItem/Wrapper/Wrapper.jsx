import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';

AdminLessonItemWrapper.propTypes = {
  children: PropTypes.object,
};

function AdminLessonItemWrapper({ children }) {
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  return <div>{children}</div>;
}

export default AdminLessonItemWrapper;
