import React from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import ActionButtons from '@pbl/components/User/StandardSearch/ActionButtons/ActionButtons';
import StepWrapper from '@pbl/components/User/StandardSearch/StepWrapper/StepWrapper';
import { EmptyStandard } from '@pbl/components/User/StandardSearch/EmptyStandard/EmptyStandard';
import useUserInfo from '@pbl/hooks/useUserInfo';
import { TUserInfo } from '@pbl/graphql/user/queries/userInfo';

import { RadioButton } from '@shared/components/RadioButton/RadioButton';
import useStandardSearch from '@shared/hooks/useStandardSearchContext';
import EmptyDataIcon from '@shared/svg/empty_data.svg';

import styles from './FirstStep.module.sass';

const FirstStep = () => {
  const { userInfo } = useUserInfo<TUserInfo>();
  const { standardsSearchState, setStandardsSearchState } = useStandardSearch();
  const { t } = useTranslation();
  const { standardSets } = userInfo;
  const noStandard = isEmpty(standardSets);

  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    setStandardsSearchState((prevState) => ({
      ...prevState,
      selectedSetId: targetValue,
    }));
  };

  if (noStandard) {
    return (
      <StepWrapper isError={noStandard} title={t('user.standardSearch.title')}>
        <EmptyStandard
          errorSubtitle={t('user.standardSearch.firstCardSet.errorSubtitle')}
          errorText={t('user.standardSearch.firstCardSet.errorText')}
          image={EmptyDataIcon}
        />
        <ActionButtons canGoForward={false} isDataEmpty={true} />
      </StepWrapper>
    );
  }

  return (
    <StepWrapper isError={noStandard} title={t('user.standardSearch.title')}>
      <h4 className={styles.mainTitle}>{t('user.standardSearch.firstCardSet.mainTitle')}</h4>
      <div className={styles.mainContainer}>
        {standardSets.map((standard) => (
          <div key={standard.setId} className={styles.standardSet}>
            <RadioButton
              checked={standard.setId === standardsSearchState?.selectedSetId}
              name='standardSet'
              value={standard.setId}
              onChange={onRadioChange}>
              {standard.name}
            </RadioButton>
          </div>
        ))}
      </div>
      <div className={styles.footerContainer}>
        <ActionButtons
          canGoForward={!isEmpty(standardsSearchState.selectedSetId)}
          isDataEmpty={noStandard}
        />
      </div>
    </StepWrapper>
  );
};

export default FirstStep;
