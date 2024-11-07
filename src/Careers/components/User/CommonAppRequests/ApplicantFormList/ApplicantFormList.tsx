import cx from 'classnames';
import isEmpty from 'lodash-es/isEmpty';
import { ReactNode, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import SharedTable from '@dc/shared/Table/Table';
import { APPLICATION_FORM_TYPE, COMMON_APP_FORM_STATUS } from '@dc/resources/enums';
import { StatusBadge } from '@dc/components/User/CommonAppRequests/ApplicantFormList/StatusBadge';
import {
  COMMON_APP_FORM_TYPES,
  CommonAppForm,
  RECOMMENDER_TYPES,
} from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';

import { DateWithTooltip } from '@shared/components/DateWithTooltip/DateWithTooltip';
import { NeedsAttentionMarker } from '@shared/components/NeedsAttentionMarker/NeedsAttentionMarker';

import styles from './ApplicantFormList.module.sass';
import { useLockedFormStatus } from './useLockedFormStatus';
import { ApplicantFormContextMenu } from './ApplicantFormContextMenu';

type Column = {
  render: (form: CommonAppForm, index: number) => ReactNode;
  title: string;
};

type Props = {
  forms: CommonAppForm[];
};

export const ApplicantFormList = ({ forms }: Props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { pathname } = useLocation();
  const hasNoData = isEmpty(forms);
  const { getLockedFormStatus } = useLockedFormStatus(forms);

  const navigateToForm = (form: CommonAppForm) => {
    const isFormLocked = getIsFormLockedStatus(form);

    if (isFormLocked) return;

    switch (form.formType) {
      case COMMON_APP_FORM_TYPES.TEACHER_RECOMMENDATION:
        history.push(`${pathname}/forms/teacher-recommendation`);
        break;
      case COMMON_APP_FORM_TYPES.COUNSELOR_EARLY_DECISION:
        history.push(`${pathname}/forms/early-decision`);
        break;
      case COMMON_APP_FORM_TYPES.COUNSELOR_EARLY_DECISION_2:
        history.push(`${pathname}/forms/early-decision2`);
        break;
      case COMMON_APP_FORM_TYPES.COUNSELOR_FEE_WAIVER:
        history.push(`${pathname}/forms/fee-waiver`);
        break;
      case COMMON_APP_FORM_TYPES.COUNSELOR_FINAL_REPORT:
        history.push(`${pathname}/forms/final-report`);
        break;
      case COMMON_APP_FORM_TYPES.COUNSELOR_MIDYEAR_REPORT:
        history.push(`${pathname}/forms/mid-year-report`);
        break;
      case COMMON_APP_FORM_TYPES.COUNSELOR_RECOMMENDATION:
        history.push(`${pathname}/forms/counselor-recommendation`);
        break;
      case COMMON_APP_FORM_TYPES.COUNSELOR_OPTIONAL_REPORT:
        history.push(`${pathname}/forms/optional-report`);
        break;
      case COMMON_APP_FORM_TYPES.COUNSELOR_OPTIONAL_REPORT_2:
        history.push(`${pathname}/forms/optional-report2`);
        break;
      case COMMON_APP_FORM_TYPES.COUNSELOR_SECONDARY_REPORT:
        history.push(`${pathname}/forms/secondary-report`);
        break;
    }
  };

  const getIsFormLockedStatus = (form: CommonAppForm) => {
    const formLockedStatus = getLockedFormStatus(form.formType);

    return formLockedStatus.isLocked;
  };

  const columns: Column[] = useMemo(
    () => [
      {
        title: t('user.postSecondary.commonAppRequests.applicationFormList.formName'),
        render: ({ formType, deadline, status }: CommonAppForm) => {
          const monthBeforeDeadline = dayjs(deadline).subtract(1, 'month');
          const isSubmitted = status === COMMON_APP_FORM_STATUS.SUBMITTED;

          const needsAttention = !isSubmitted && dayjs().isAfter(monthBeforeDeadline);

          return (
            <div>
              {needsAttention && (
                <NeedsAttentionMarker text={t('user.postSecondary.commonAppRequests.deadline')} />
              )}
              <div className={styles.formName}>{APPLICATION_FORM_TYPE[formType]}</div>
            </div>
          );
        },
      },
      {
        title: t('user.postSecondary.commonAppRequests.applicationFormList.recommenderType'),
        render: (form: CommonAppForm) => (
          <div className={styles.recommenderType}>
            {t(
              `user.postSecondary.commonAppRequests.applicationFormList.formValues.${
                form.formType.includes(RECOMMENDER_TYPES.TEACHER) ? 'teacher' : 'counselor'
              }`
            )}
          </div>
        ),
      },
      {
        title: t('user.postSecondary.commonAppRequests.applicationFormList.status'),
        render: (form: CommonAppForm) => (
          <StatusBadge
            formType={form.formType}
            status={form.status}
            {...getLockedFormStatus(form.formType)}
          />
        ),
      },
      {
        title: t('user.postSecondary.commonAppRequests.deadline'),
        render: ({ deadline }: CommonAppForm) => <DateWithTooltip date={deadline} />,
      },
      {
        title: '',
        render: (form: CommonAppForm) => (
          <ApplicantFormContextMenu
            form={form}
            isFormLocked={getLockedFormStatus(form.formType).isLocked}
            navigateToForm={navigateToForm}
          />
        ),
      },
    ],
    [forms]
  );

  const tableColumnClassnames = cx(
    'flex items-center relative',
    '!px-xs xxxl:!px-x first:!pl-base xxxl:first:!pl-md',
    'last:!pr-base !py-sm',
    'text-xs cursor-pointer'
  );

  return (
    <>
      <SharedTable
        tableClassname={styles.table}
        tableWrapperClassname={cx({
          [styles.emptyTableWrapper]: hasNoData,
        })}>
        <SharedTable.Head
          cols={columns}
          columnClassname={cx(styles.tableHeadCell, tableColumnClassnames)}
        />
        <SharedTable.Body
          cols={columns}
          columnClassname={tableColumnClassnames}
          data={forms}
          rowClassname={cx('group/row', styles.tableRow)}
          onRowClick={(_, form) => navigateToForm(form)}
        />
      </SharedTable>
      {hasNoData && (
        <div className={styles.emptyFormsMessage}>
          {t('user.postSecondary.commonAppRequests.applicationFormList.empty')}
        </div>
      )}
    </>
  );
};
