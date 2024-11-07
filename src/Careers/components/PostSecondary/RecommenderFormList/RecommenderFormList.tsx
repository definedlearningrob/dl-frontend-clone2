import { AnimatePresence, motion } from 'framer-motion';
import cx from 'classnames';
import { t } from 'i18next';
import { useMemo } from 'react';

import SharedTable from '@dc/shared/Table/Table';
import { TRecommender } from '@dc/graphql/student/queries/institutionApplication';
import {
  APPLICATION_FORM_TYPE,
  INSTITUTION_APPLICATION_STATUS,
  RECOMMENDER_TYPE,
} from '@dc/resources/enums';
import { TableDateCell } from '@dc/shared/TableDateCell/TableDateCell';

import { ReactComponent as ArrowIcon } from '@shared/assets/icons/chevron_down.svg';
import TableBodyLoader from '@shared/components/TableBodyLoader/TableBodyLoader';
import { useToggle } from '@shared/hooks/useToggle';
import { Badge } from '@shared/components/Badge/Badge';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { NeedsAttentionMarker } from '@shared/components/NeedsAttentionMarker/NeedsAttentionMarker';

import styles from './RecommenderFormList.module.sass';

type BadgeVariant = 'neutral' | 'primary' | 'secondary' | 'info' | 'danger' | 'success';

type Props = {
  recommender: TRecommender;
  loading: boolean;
  shouldCounselorSectionBeClosed: boolean;
};

type RowData = {
  id: number;
  formType: string;
  downloadedDate: string;
  submittedDate: string;
  status: INSTITUTION_APPLICATION_STATUS;
  openedByInstitution: string;
};

const formNamesMap: { [key: string]: APPLICATION_FORM_TYPE } = APPLICATION_FORM_TYPE;

const tableConstants = [
  {
    render: (rowData: RowData) => {
      const needsAttention = ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'].includes(rowData.status);

      return (
        <>
          {needsAttention && (
            <NeedsAttentionMarker
              className='!mb-0'
              size='md'
              text={t('student.postSecondary.applicationsSection.actionItem')}
            />
          )}
          <div className='leading-base font-bold text-neutral-800 inline-block'>
            {formNamesMap[rowData.formType]}
          </div>
        </>
      );
    },
  },
  {
    render: (rowData: RowData) => <TableDateCell date={rowData.submittedDate} />,
  },
  {
    render: (rowData: RowData) => <TableDateCell date={rowData.downloadedDate} />,
  },
  {
    render: (rowData: RowData) => {
      const applicationStatus = {
        IN_PROGRESS: {
          type: 'secondary' as BadgeVariant,
          label: t('student.postSecondary.applicationsSection.inProgress'),
        },
        COMPLETED: {
          type: 'secondary' as BadgeVariant,
          label: t('student.postSecondary.applicationsSection.inProgress'),
        },
        SUBMITTED: {
          type: 'success' as BadgeVariant,
          label: t('student.postSecondary.applicationsSection.submitted'),
        },
        DOWNLOADED: {
          type: 'success' as BadgeVariant,
          label: t('student.postSecondary.applicationsSection.submitted'),
        },
        NOT_STARTED: {
          type: 'neutral' as BadgeVariant,
          label: t('student.postSecondary.applicationsSection.notStarted'),
        },
      }[rowData.status];

      return (
        <div className={styles.statusColumn}>
          <div className={styles.badgeWrapper}>
            <Badge type={applicationStatus.type}>{applicationStatus.label}</Badge>
          </div>
        </div>
      );
    },
  },
];

export const RecommenderFormList = ({
  recommender,
  shouldCounselorSectionBeClosed,
  loading,
}: Props) => {
  const { firstName, lastName, type, formStatuses = [] } = recommender;
  const recommenderName = `${firstName} ${lastName}`;
  const [isOpen, toggleOpen] = useToggle(
    !shouldCounselorSectionBeClosed || recommender.type !== RECOMMENDER_TYPE.COUNSELOR
  );
  const arrowClass = cx({
    [styles.isRotated]: isOpen,
  });

  const headers = useMemo(
    () => [
      { title: t('student.postSecondary.applicationsSection.modal.form') },
      { title: t('student.postSecondary.applicationsSection.modal.submitted') },
      { title: t('student.postSecondary.applicationsSection.modal.downloadBy') },
      { title: t('student.postSecondary.applicationsSection.modal.status') },
    ],
    []
  );

  const roleName = t(
    `student.postSecondary.applicationsSection.recommender.${RECOMMENDER_TYPE[type]}`
  );

  return (
    <div key={recommender.lastName} className={styles.applicationTable}>
      <div className='flex p-sm cursor-pointer' onClick={toggleOpen}>
        <div className={styles.actionName}>
          <p className='text-xxs leading-lg font-medium m-0 text-font-secondary'>{roleName}</p>
          <h6 className='text-xs leading-base font-bold mb-0'>{recommenderName}</h6>
        </div>
        <IconContainer Icon={ArrowIcon} className={arrowClass} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key='content'
            animate='open'
            exit='collapsed'
            initial='collapsed'
            transition={{ duration: 0.5, opacity: { duration: 0.1, delay: 0.2 } }}
            variants={{
              open: {
                height: 'auto',
                opacity: 1,
              },
              collapsed: { height: 0, opacity: 0 },
            }}>
            <SharedTable tableClassname='!h-auto rounded-0'>
              <SharedTable.Head
                cols={headers}
                columnClassname='text-xs leading-lg font-medium pl-0 text-font-secondary'
              />
              {loading && <TableBodyLoader />}
              {!loading && (
                <SharedTable.Body
                  cols={tableConstants}
                  columnClassname='text-xs py-sm relative flex flex-col justify-center'
                  data={formStatuses}
                />
              )}
            </SharedTable>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
