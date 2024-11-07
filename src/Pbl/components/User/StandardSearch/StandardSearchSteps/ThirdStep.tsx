import { flatMapDeep, isEmpty } from 'lodash-es';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ActionButtons from '@pbl/components/User/StandardSearch/ActionButtons/ActionButtons';
import StepWrapper from '@pbl/components/User/StandardSearch/StepWrapper/StepWrapper';
import useStandardHierarchy from '@pbl/graphql/user/hooks/useStandardHierarchy';
import { EmptyStandard } from '@pbl/components/User/StandardSearch/EmptyStandard/EmptyStandard';
import { TagList } from '@pbl/components/User/StandardSearch/TagList/TagList';
import { StandardSearchInfo } from '@pbl/components/User/StandardSearch/StandardSearchInfo/StandardSearchInfo';

import useStandardSearch from '@shared/hooks/useStandardSearchContext';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import EmptyDataIcon from '@shared/svg/empty_data.svg';

import { StandardsList } from './StandardsList';
import styles from './ThirdStep.module.sass';

type Standard = {
  guid: string;
  standardText: string;
  children: Standard[];
};

const getGuids = (standard: Standard): Standard[] => {
  if (isEmpty(standard.children)) {
    return [standard];
  }

  return [standard, ...flatMapDeep(standard.children, getGuids)];
};

const ThirdStep = () => {
  const { standardsSearchState, setStandardsSearchState } = useStandardSearch();
  const { t } = useTranslation();

  const { loading, data } = useStandardHierarchy(
    standardsSearchState.selectedSetId,
    standardsSearchState.selectedSubject,
    standardsSearchState.selectedGrade
  );

  if (loading || !data) {
    return (
      <div className={styles.loader}>
        <SharedLoadingSpinner size='medium' />
      </div>
    );
  }

  const flattenedStandards = flatMapDeep(data.standardsHierarchy, getGuids);

  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedStandardUuid = e.target.value;
    const selectedStandard = flattenedStandards.find(
      (standard) => standard.guid === selectedStandardUuid
    );

    if (selectedStandard) {
      setStandardsSearchState((prevState) => ({
        ...prevState,
        selectedStandard: { uuid: selectedStandardUuid, label: selectedStandard.standardText },
      }));
    }
  };

  const isDataEmpty = isEmpty(data.standardsHierarchy);

  const tags = [
    [t('user.standardSearch.subject'), standardsSearchState.selectedSubject],
    [t('user.standardSearch.grade'), standardsSearchState.selectedGrade],
  ];

  return (
    <StepWrapper isError={isDataEmpty} title={t('user.standardSearch.title')}>
      <div className={styles.headWrapper}>
        <div>
          <h4 className={styles.mainTitle}>{t('user.standardSearch.thirdCardSet.mainTitle')}</h4>
        </div>
        <TagList tags={tags} variant='neutral' />
      </div>
      <StandardSearchInfo />
      {isDataEmpty && (
        <EmptyStandard
          errorSubtitle={t('user.standardSearch.thirdCardSet.errorSubtitle')}
          errorText={t('user.standardSearch.thirdCardSet.errorText')}
          image={EmptyDataIcon}
        />
      )}
      <div className={styles.container}>
        <StandardsList
          nestingLevel={1}
          standards={data.standardsHierarchy}
          onRadioChange={onRadioChange}
        />
      </div>
      <div className={styles.footerContainer}>
        <ActionButtons
          canGoForward={!isEmpty(standardsSearchState?.selectedStandard.uuid)}
          isDataEmpty={isEmpty(data.standardsHierarchy)}
        />
      </div>
    </StepWrapper>
  );
};

export default ThirdStep;
