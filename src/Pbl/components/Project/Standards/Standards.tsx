import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import useUserInfo from '@pbl/hooks/useUserInfo';
import UserStandards from '@pbl/components/User/Project/Standards/StandardsLoader';

import Card from '@shared/components/Card/Card';
import EmptyState from '@shared/components/EmptyState/EmptyState';
import SharedButton from '@shared/components/Button/Button';

type StandardSet = {
  name: string;
  setId: string;
};

type Props = {
  standardSets?: StandardSet[];
};

const sortByName = (standards: StandardSet[]) =>
  [...standards].sort((a, b) => a.name.localeCompare(b.name));

function ProjectStandards({ standardSets }: Props) {
  const [pickedStandard, setPickedStandard] = useState<StandardSet | null>(null);
  const { userInfo } = useUserInfo();
  const { t } = useTranslation();

  const sortedStandardSets = useMemo(() => {
    const availableStandardSets = standardSets ?? userInfo.standardSets;

    return availableStandardSets && sortByName(availableStandardSets);
  }, [userInfo, standardSets]);

  useEffect(() => {
    if (sortedStandardSets && sortedStandardSets.length > 0 && !pickedStandard) {
      setPickedStandard(sortedStandardSets[0]);
    }
  }, [sortedStandardSets]);

  const cardTitle =
    sortedStandardSets && sortedStandardSets.length > 0 ? t('project.standard.header') : '';

  const handleClick = (standard: StandardSet) => () => {
    setPickedStandard(standard);
  };

  const getButtonVariant = (standardSet: StandardSet) =>
    pickedStandard?.setId === standardSet.setId ? 'primary' : 'primary-outlined';

  const renderStandardSets = () =>
    sortedStandardSets &&
    sortedStandardSets.length > 1 && (
      <div className='user-project__standards-buttons'>
        {sortedStandardSets.map((standardSet) => (
          <SharedButton
            key={standardSet.setId}
            className='user-project__standards-button'
            data-testid='user-project-standard-set'
            size='sm'
            variant={getButtonVariant(standardSet)}
            onClick={handleClick(standardSet)}>
            {standardSet.name}
          </SharedButton>
        ))}
      </div>
    );

  if (!sortedStandardSets.length) {
    return <EmptyState heading={t('project.emptyState.noStandards')} />;
  }

  return (
    <section>
      <Card>
        <Card.Header>
          <Card.Title size='small'>{cardTitle}</Card.Title>
        </Card.Header>
        {renderStandardSets()}
        {pickedStandard && <UserStandards setId={pickedStandard?.setId} />}
      </Card>
    </section>
  );
}

export default ProjectStandards;
