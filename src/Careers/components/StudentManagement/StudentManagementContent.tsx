import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { useRef, useState } from 'react';
import { compact, isEmpty } from 'lodash-es';

import { StudentFilters } from '@dc/components/StudentManagement/StudentFilters';
import { STUDENT_MANAGEMENT_QUERY } from '@dc/graphql/user/queries/studentManagement';
import { COUNSELORS } from '@dc/graphql/user/queries/counselors';
import { useTogglePostSecondaryApplicationsForStudents } from '@dc/graphql/user/hooks/useTogglePostSecondaryApplicationsForStudent';
import { useAssignStudentsToCounselor } from '@dc/graphql/user/hooks/useAssignStudentsToCounselor';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';

import { ArchivableStatusTypes } from '@pbl/resources/enums';

import { SORT_ORDER } from '@shared/resources/enums';
import SharedButton from '@shared/components/Button/Button';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { callPromiseToast, callToast } from '@shared/components/Toaster/Toaster';
import { DEFAULT_PAGE_SIZE, NewTableRef } from '@shared/components/NewTable/NewTable';

import { StudentManagementTable } from './StudentManagementTable';

export const StudentManagementContent = () => {
  const { t } = useTranslation();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const tableApiRef = useRef<NewTableRef | null>(null);
  const { togglePostSecondaryApplicationsForStudents, isLoading: isToggleApplicationsLoading } =
    useTogglePostSecondaryApplicationsForStudents();
  const { assignStudentsToCounselor, isLoading: isAssignStudentsLoading } =
    useAssignStudentsToCounselor();
  const { userInfo } = useUserInfo<TUserInfo>();
  const { loading: counselorsLoading } = useQuery(COUNSELORS);

  const isCounselor = userInfo.permissions.counselor;

  const {
    data: studentData,
    loading: studentsLoading,
    refetch,
  } = useQuery(STUDENT_MANAGEMENT_QUERY, {
    variables: {
      perPage: DEFAULT_PAGE_SIZE,
      fullNameSortOrder: SORT_ORDER.ASC,
      filter: { counselorUuidEq: isCounselor ? userInfo.uuid : undefined },
      scope: ArchivableStatusTypes.ACTIVE,
    },
    skip: counselorsLoading,
  });

  if (counselorsLoading || studentsLoading) {
    return <SharedLoadingSpinner className='h-full' size='small' />;
  }

  if (!studentData) {
    return <div className='text-center p-base'>{t('shared.dataLoader.error')}</div>;
  }

  const selectedRowsWithApplicationsEnabled = compact(
    selectedRows.map((studentUuid) => {
      const selectedStudent = studentData.students.nodes.find(({ uuid }) => uuid === studentUuid);

      return selectedStudent?.canPostSecondarySettingBeChanged ? selectedStudent : null;
    })
  );

  const allSelectedEnabled =
    !isEmpty(selectedRowsWithApplicationsEnabled) &&
    selectedRowsWithApplicationsEnabled.every(
      (selectedStudent) => selectedStudent.postSecondaryApplicationsStatus.isEnabled
    );

  const toggleCollegeApplications = async () => {
    const shouldEnableApplications = !allSelectedEnabled;
    const applicationsToToggle = selectedRowsWithApplicationsEnabled.map((student) => student.uuid);
    tableApiRef.current?.clearSelectedRows();
    const togglePromise = togglePostSecondaryApplicationsForStudents(
      applicationsToToggle,
      shouldEnableApplications
    );

    const toastKey = shouldEnableApplications
      ? 'user.postSecondary.collegeApplicationsEnabled'
      : 'user.postSecondary.collegeApplicationsDisabled';
    callPromiseToast(togglePromise, {
      successText: t(toastKey, { count: applicationsToToggle.length }),
      pendingText: t('common.notifications.pending.generic'),
      errorText: t('common.notifications.error.generic'),
    });

    await togglePromise;
  };

  const handleAssignStudentsToCounselor = async () => {
    await assignStudentsToCounselor(selectedRows);

    callToast('success', t('user.postSecondary.assignedStudents', { count: selectedRows.length }));
    tableApiRef.current?.clearSelectedRows();
  };

  const isLoading = isToggleApplicationsLoading || isAssignStudentsLoading;

  return (
    <>
      <div className='p-base'>
        <div className='flex items-center gap-sm mb-sm'>
          <h5 className='flex-1 mb-0 text-sm'>{t('user.postSecondary.studentManagement')}</h5>
          <SharedButton
            disabled={isLoading || isEmpty(selectedRowsWithApplicationsEnabled)}
            variant='primary-outlined'
            onClick={toggleCollegeApplications}>
            {allSelectedEnabled
              ? t('user.postSecondary.disableCollegeApplications')
              : t('user.postSecondary.enableCollegeApplications')}
          </SharedButton>
          {isCounselor && (
            <SharedButton
              disabled={isLoading || isEmpty(selectedRows)}
              variant='primary'
              onClick={handleAssignStudentsToCounselor}>
              {t('user.postSecondary.assignToMe')}
            </SharedButton>
          )}
        </div>
        <StudentFilters />
      </div>
      <StudentManagementTable
        refetchData={refetch}
        students={studentData.students}
        tableApiRef={tableApiRef}
        updateSelectedRows={setSelectedRows}
      />
    </>
  );
};
