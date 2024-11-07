import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import GradingModal from '@dc/components/User/Student/GradingModal/GradingModal';
import Item from '@dc/components/User/Student/CoursesActivity/Course/Item/Item';
import useCourseActivity from '@dc/hooks/useCourseActivity';
import { useClearGradingNeeded } from '@dc/hooks/useClearGradingNeeded';

import { useMessaging } from '@shared/hooks/useMessaging';
import { callToast } from '@shared/components/Toaster/Toaster';

UserGradingSchoolClassStudentItemCourseActivity.propTypes = {
  student: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    uuid: PropTypes.string,
  }),
};

function UserGradingSchoolClassStudentItemCourseActivity({ student }) {
  const { itemToGrade, itemsToGrade } = useCourseActivity();
  const { t } = useTranslation();
  const { setMessagingState, messagingState } = useMessaging();

  useClearGradingNeeded({ studentUuid: student.uuid, itemsToGrade });

  const onSendMessage = () => callToast('success', t('messaging.sentSuccessfully'));

  const setupMessageModal = (context) => {
    setMessagingState({
      ...messagingState,
      show: true,
      actionContext: context,
      receiver: { ...student, name: `${student.firstName} ${student.lastName}` },
      onSendMessage,
    });
  };

  return (
    <>
      <ul>
        {itemsToGrade.map((item, index) => (
          <Item key={index} item={item} itemIndex={index} setupMessageModal={setupMessageModal} />
        ))}
      </ul>
      {itemToGrade && <GradingModal />}
    </>
  );
}

export default UserGradingSchoolClassStudentItemCourseActivity;
