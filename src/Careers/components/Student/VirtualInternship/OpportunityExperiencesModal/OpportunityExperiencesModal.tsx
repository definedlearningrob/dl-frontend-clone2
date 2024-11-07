import { Trans, useTranslation } from 'react-i18next';
import { ChangeEvent, useState } from 'react';
import cx from 'classnames';
import { isEmpty } from 'lodash-es';
import { ApolloError } from '@apollo/client';
import { useUpdateEffect } from 'react-use';

import SharedTable from '@dc/shared/Table/Table';
import { useVirtualInternshipLessons } from '@dc/hooks/useVirtualInternshipLessons';
import { useManageOpportunityExperienceLessons } from '@dc/graphql/student/hooks/useManageOpportunityExperienceLessons';
import { TVirtualInternshipLesson } from '@dc/resources/types';

import SharedModal from '@shared/components/Modal/Modal';
import { ProgressBarWithSteps } from '@shared/components/ProgressBarWithSteps';
import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import TruncatedText from '@shared/components/TruncatedText';
import { callToast } from '@shared/components/Toaster/Toaster';

import styles from './OpportunityExperiencesModal.module.sass';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (selectedExperiences: TVirtualInternshipLesson[]) => void;
};

type Description = {
  introduction: string;
  goal: string;
};

type RowData = {
  id: string;
  name: string;
  thumbnailUrl: string;
  description: Description;
};

export const OpportunityExperiencesModal = ({ isOpen, onClose, onSave }: Props) => {
  const { t } = useTranslation();
  const { experienceOpportunity, virtualInternshipId, studentExperienceOpportunity } =
    useVirtualInternshipLessons({ skip: !isOpen });

  const preselectedExperiences = studentExperienceOpportunity?.lessons
    .filter((lesson) => !isEmpty(lesson))
    .map((lesson) => lesson!.id);

  const [selectedExperiences, setSelectedExperiences] = useState<string[]>(
    preselectedExperiences || []
  );
  const [manageOpportunityExperienceLessons] = useManageOpportunityExperienceLessons();

  useUpdateEffect(() => {
    if (preselectedExperiences) {
      setSelectedExperiences(preselectedExperiences);
    }
  }, [studentExperienceOpportunity]);

  if (!experienceOpportunity || !studentExperienceOpportunity) return null;

  const currentStep = selectedExperiences.length;
  const totalSteps = experienceOpportunity.requiredExperiences;

  const isEnoughSelected = currentStep >= totalSteps;

  const toggleExperienceSelect = (id: string, event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.nodeName === 'BUTTON') return null;

    if (selectedExperiences.includes(id)) {
      setSelectedExperiences((currState) => currState.filter((lessonId) => lessonId !== id));
    } else if (!isEnoughSelected) {
      setSelectedExperiences((currState) => [...currState, id]);
    }
  };

  const handleSave = async () => {
    try {
      const { data } = await manageOpportunityExperienceLessons({
        virtualInternshipId: virtualInternshipId!,
        lessonIds: selectedExperiences,
      });

      if (onSave) {
        const { studentExperienceOpportunityLessons } =
          data!.manageOpportunityExperienceLessons.virtualInternship;
        onSave(studentExperienceOpportunityLessons);
      }
      onClose();
    } catch (e: ApolloError | unknown) {
      if (e instanceof ApolloError) {
        callToast('error', e.message);
      }
    }
  };

  const headers = [
    { title: t('virtualInternship.experienceOpportunity.modal.image') },
    { title: t('virtualInternship.experienceOpportunity.modal.opportunity') },
    { title: t('virtualInternship.experienceOpportunity.modal.details') },
    { title: t('virtualInternship.experienceOpportunity.modal.select') },
  ];

  const tableConstants = [
    {
      render: (rowData: RowData) => (
        <div className={styles.imageWrapper}>
          <img alt={rowData.name} className={styles.image} src={rowData.thumbnailUrl} />
        </div>
      ),
    },
    {
      render: (rowData: RowData) => <span className={styles.title}>{rowData.name}</span>,
    },
    {
      render: (rowData: RowData) => (
        <TruncatedText
          text={rowData.description.introduction}
          textClassName={styles.truncatedText}
        />
      ),
    },
    {
      render: (rowData: RowData) => {
        const isSelected = selectedExperiences.includes(rowData.id);
        const checkboxClassname = cx(styles.checkboxWrapper, { [styles.selected]: isSelected });

        return (
          <div className={checkboxClassname}>
            <SharedCheckbox checked={isSelected} readOnly={true} />
            <div className={styles.buttonWrapper} />
          </div>
        );
      },
    },
  ];

  const rowClassName = cx(styles.tableRow, { [styles.isDisabled]: isEnoughSelected });

  return (
    <SharedModal className={styles.modal} isOpen={isOpen} onDismiss={onClose}>
      <SharedModal.Header className={styles.modalHeader}>
        <SharedModal.Heading className={styles.modalHeading}>
          {t('virtualInternship.experienceOpportunity.modal.title')}
        </SharedModal.Heading>
      </SharedModal.Header>
      <div className={styles.progressWrapper}>
        <ProgressBarWithSteps
          className={styles.progressBar}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
        <div className={styles.selectedLabel}>
          <Trans
            i18nKey='virtualInternship.experienceOpportunity.modal.selected'
            values={{
              currentStep,
              totalSteps,
            }}>
            <span className={styles.counter} />
          </Trans>
        </div>
      </div>
      <SharedModal.Body className={styles.modalBody}>
        <div className={styles.tableWrapper}>
          <SharedTable tableClassname={styles.table}>
            <SharedTable.Head cols={headers} columnClassname={styles.tableHead} />
            <SharedTable.Body
              cols={tableConstants}
              columnClassname={styles.tableColumn}
              data={experienceOpportunity.lessons}
              rowClassname={rowClassName}
              onRowClick={(id, lessonItem, event) => toggleExperienceSelect(lessonItem.id, event)}
            />
          </SharedTable>
        </div>
      </SharedModal.Body>
      <SharedModal.Footer className={styles.modalFooter}>
        <SharedModal.Button className='min-w-[100px]' variant='primary-outlined' onClick={onClose}>
          {t('common.actions.close')}
        </SharedModal.Button>
        <SharedModal.Button className='min-w-[100px]' variant='primary' onClick={handleSave}>
          {t('common.actions.save')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
