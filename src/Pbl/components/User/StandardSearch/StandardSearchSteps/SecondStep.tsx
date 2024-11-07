import React from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';
import { SingleValue } from 'react-select';

import ActionButtons from '@pbl/components/User/StandardSearch/ActionButtons/ActionButtons';
import StepWrapper from '@pbl/components/User/StandardSearch/StepWrapper/StepWrapper';
import useStandardSetSubjects from '@pbl/graphql/user/hooks/useStandardSetSubjects';
import { TStandardSetSubject } from '@pbl/graphql/user/queries/standardSetSubjects';
import { EmptyStandard } from '@pbl/components/User/StandardSearch/EmptyStandard/EmptyStandard';

import useStandardSearch from '@shared/hooks/useStandardSearchContext';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import EmptyDataIcon from '@shared/svg/empty_data.svg';
import { Select } from '@shared/components/Select';

import styles from './SecondStep.module.sass';

const toOptions = (item: string) => ({
  label: item,
  value: item,
});

type Option = {
  label: string;
  value: string;
};

type NormalizedSubjects = {
  [name: string]: Option[];
};

const SecondStep = () => {
  const { standardsSearchState, setStandardsSearchState } = useStandardSearch();
  const { loading, data } = useStandardSetSubjects(standardsSearchState.selectedSetId);
  const { t } = useTranslation();

  if (loading || !data) {
    return (
      <div className={styles.loader}>
        <SharedLoadingSpinner size='medium' />
      </div>
    );
  }

  const normalizeSubjects = (standardSetSubjects: TStandardSetSubject[]) =>
    standardSetSubjects.reduce((acc, current) => {
      let key = current.name;

      acc[key] = current.grades.map(toOptions);

      return acc;
    }, {} as NormalizedSubjects);

  const gradesOptionsMap = normalizeSubjects(data?.standardSetSubjects);

  const subjectOptions = Object.keys(gradesOptionsMap).map(toOptions);
  const gradesOptions = gradesOptionsMap[standardsSearchState.selectedSubject];

  const handleSubjectChange = (selectedOption: SingleValue<Option>) => {
    setStandardsSearchState((prevState) => ({
      ...prevState,
      selectedSubject: selectedOption?.value || '',
    }));
  };

  const handleGradeChange = (selectedOption: SingleValue<Option>) => {
    setStandardsSearchState((prevState) => ({
      ...prevState,
      selectedGrade: selectedOption?.value || '',
    }));
  };

  const clearSelectedSubjectAndGrade = () => {
    setStandardsSearchState((prevState) => ({
      ...prevState,
      selectedSubject: '',
      selectedGrade: '',
    }));
  };

  return (
    <StepWrapper isError={isEmpty(data)} title={t('user.standardSearch.title')}>
      <h4 className={styles.mainTitle}>{t('user.standardSearch.secondCardSet.mainTitle')}</h4>
      {isEmpty(data) ? (
        <EmptyStandard
          errorSubtitle={t('user.standardSearch.secondCardSet.errorSubtitle')}
          errorText={t('user.standardSearch.secondCardSet.errorText')}
          image={EmptyDataIcon}
        />
      ) : (
        <div className={styles.mainContainer}>
          <Select
            label='Subject'
            menuPortalTarget={document.body}
            name='subjects'
            options={subjectOptions}
            value={subjectOptions?.find(
              (subject) => subject.label === standardsSearchState.selectedSubject
            )}
            onChange={handleSubjectChange}
          />
          <Select
            label='Grades'
            menuPortalTarget={document.body}
            name='subjects'
            options={gradesOptions}
            value={gradesOptions?.find(
              (grade) => grade.label === standardsSearchState.selectedGrade
            )}
            onChange={handleGradeChange}
          />
        </div>
      )}
      <div className={styles.footerContainer}>
        <ActionButtons
          canGoForward={!isEmpty(standardsSearchState.selectedGrade)}
          isDataEmpty={isEmpty(data)}
          onGoBack={clearSelectedSubjectAndGrade}
        />
      </div>
    </StepWrapper>
  );
};

export default SecondStep;
