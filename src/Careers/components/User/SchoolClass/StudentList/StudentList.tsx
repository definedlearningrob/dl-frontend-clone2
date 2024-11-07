import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Student from '@dc/components/User/SchoolClass/StudentList/Student/Student';
import { TSchoolClassWithStudents } from '@dc/graphql/user/queries/schoolClassWithStudents';

import { useMessaging } from '@shared/hooks/useMessaging';
import { RECEIVER_TYPES } from '@shared/resources/constants';
import { callToast } from '@shared/components/Toaster/Toaster';

type Props = {
  schoolClass: TSchoolClassWithStudents;
};

function UserSchoolClassStudentList({ schoolClass }: Props) {
  const { messagingState, setMessagingState } = useMessaging();
  const { t } = useTranslation();

  const onMessageSend = () => callToast('success', t('messaging.sentSuccessfully'));

  const setupModal = useCallback((receiver) => {
    setMessagingState({
      ...messagingState,
      show: true,
      receiverType: RECEIVER_TYPES.STUDENT,
      receiver: { ...receiver, name: `${receiver.firstName} ${receiver.lastName}` },
      onSendMessage: onMessageSend,
    });
  }, []);

  return (
    <div className='user-class__students__list'>
      {schoolClass.students.nodes.map((student) => (
        <Student key={student.uuid} setupModal={setupModal} student={student} />
      ))}
    </div>
  );
}

export default UserSchoolClassStudentList;
