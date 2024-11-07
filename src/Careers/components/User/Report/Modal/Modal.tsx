import cx from 'classnames';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ReportLevels } from '@dc/resources/enums';
import { ASSESSMENT_REPORT_FILE } from '@dc/graphql/user/queries/assessmentReport';
import { GENERATE_ASSESSMENT_REPORT } from '@dc/graphql/user/mutations/generateAssessmentReport';
import GENERATE_COURSE_REPORT from '@dc/graphql/user/mutations/generateCourseReport';
import courseReportQuery from '@dc/graphql/user/queries/courseReport';
import GENERATE_PLAN_REPORT from '@dc/graphql/user/mutations/generatePlanReport';
import planReportQuery from '@dc/graphql/user/queries/planReport';
import { useReports } from '@dc/hooks/useReports';

import { useReportGenerator } from '@shared/hooks/useReportGenerator';
import { Kicker } from '@shared/components/Kicker';
import SharedModal from '@shared/components/Modal/Modal';
import { useFileDownload } from '@shared/hooks/useFileDownload';
import { RadioButton } from '@shared/components/RadioButton/RadioButton';

import './Modal.sass';

type Props = {
  level: ReportLevels;
  levelUuid: string;
  onClose: () => void;
  plans?: { id: string; name: string }[];
  self?: boolean;
};

const types = {
  ASSESSMENT: 'assessment',
  COURSE: 'course',
  PLAN: 'plan',
} as const;

const reportDocumentNodeMaps = {
  [types.ASSESSMENT]: {
    query: ASSESSMENT_REPORT_FILE,
    mutation: GENERATE_ASSESSMENT_REPORT,
  },
  [types.COURSE]: {
    query: courseReportQuery,
    mutation: GENERATE_COURSE_REPORT,
  },
  [types.PLAN]: {
    query: planReportQuery,
    mutation: GENERATE_PLAN_REPORT,
  },
};

type TReportKinds = 'assessment' | 'course' | 'plan';

function UserReportModal({ level, levelUuid, onClose, plans = [], self }: Props) {
  const [checkedType, setCheckedType] = useState<TReportKinds | null>(null);
  const [checkedPlanId, setCheckedPlanId] = useState<string | null>(null);
  const { t } = useTranslation();
  const { setFileToDownload } = useFileDownload();
  const { generateReport, loading } = useReportGenerator();
  const { reportStartYear } = useReports();

  const handleGenerateReport = async () => {
    if (!checkedType) return;

    await generateReport();
    onClose();
  };

  const checkPlanId = ({ target: { id } }: ChangeEvent<HTMLInputElement>) => {
    const isSelected = id === checkedPlanId;

    if (isSelected) return;

    setCheckedType(types.PLAN);
    setCheckedPlanId(id);

    setFileToDownload({
      mutation: GENERATE_PLAN_REPORT,
      query: planReportQuery,
      variables: { levelUuid, level, startYear: reportStartYear, planId: id },
    });
  };

  const changeType = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as TReportKinds;
    const isSelected = name === checkedType;

    if (isSelected) return;

    setFileToDownload({
      mutation: reportDocumentNodeMaps[name].mutation,
      query: reportDocumentNodeMaps[name].query,
      variables: { levelUuid, level, startYear: reportStartYear },
    });

    setCheckedPlanId(null);
    setCheckedType(name);
  };

  const selectedDescription = {
    [ReportLevels.ENTITY]: t('user.report.modal.entityDescription'),
    [ReportLevels.SCHOOL_CLASS]: t('user.report.modal.schoolClassDescription'),
    [ReportLevels.USER]: t('user.report.modal.userDescription'),
  }[level];

  const description = self ? t('user.report.modal.selfDescription') : selectedDescription;
  const plansSectionClasses = cx('user-report-modal__plans-section', {
    '-loaded': plans.length,
  });

  return (
    <SharedModal isOpen={true} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('user.report.modal.header')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <span className='user-report-modal__description'>{description}</span>
        <div className='user-report-modal__report-section'>
          <Kicker>{t('user.report.modal.assessmentKicker')}</Kicker>
          <div className='user-report-modal__check-wrapper'>
            <RadioButton
              checked={checkedType === types.ASSESSMENT}
              className='user-report-modal__checkbox'
              name={types.ASSESSMENT}
              onChange={changeType}>
              {t('user.report.modal.assessment')}
            </RadioButton>
          </div>
        </div>
        <div className='user-report-modal__report-section'>
          <Kicker>{t('user.report.modal.coursesKicker')}</Kicker>
          <div className='user-report-modal__check-wrapper'>
            <RadioButton
              checked={checkedType === types.COURSE}
              className='user-report-modal__checkbox'
              name={types.COURSE}
              onChange={changeType}>
              {t('user.report.modal.courses')}
            </RadioButton>
          </div>
        </div>
        <div className={plansSectionClasses}>
          {plans.length > 0 && (
            <div className='user-report-modal__report-section'>
              <Kicker>{t('user.report.modal.plansKicker')}</Kicker>
              {plans.map(({ id, name }) => (
                <div key={id} className='user-report-modal__check-wrapper'>
                  <RadioButton
                    checked={checkedPlanId === id}
                    className='user-report-modal__checkbox'
                    id={id}
                    name={types.PLAN}
                    onChange={checkPlanId}>
                    {name}
                  </RadioButton>
                </div>
              ))}
            </div>
          )}
        </div>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button isLoading={loading} variant='primary-outlined' onClick={onClose}>
          {t('common.actions.close')}
        </SharedModal.Button>
        <SharedModal.Button
          disabled={!checkedType}
          isLoading={loading}
          variant='primary'
          onClick={handleGenerateReport}>
          {t('user.report.modal.submit')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
}

export default UserReportModal;
