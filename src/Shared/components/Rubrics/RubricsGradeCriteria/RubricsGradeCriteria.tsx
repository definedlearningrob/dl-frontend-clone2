import { RubricCriteria } from '@shared/components/Rubrics/utils/types';

import { useRubric } from '../RubricProvider/RubricProvider';
import { RubricsCriteria } from '../RubricsCriteria/RubricsCriteria';

type Props = { criteria: RubricCriteria };

export const RubricsGradeCriteria = ({ criteria }: Props) => {
  const {
    grading: { getGradingRow, setGradingRow },
    type: { isViewing },
  } = useRubric();

  const headingId = criteria.rubricHeadingId;
  const rowData = getGradingRow(headingId);

  const isPlaceholderCriteria = !criteria.id;
  const isSelected = !isPlaceholderCriteria && criteria.id === rowData?.criteriaId;
  const trait = rowData?.trait;

  const handleCriteriaClick = (criteriaId: string) => {
    if (isPlaceholderCriteria || isViewing || rowData?.criteriaId === criteriaId) return;
    setGradingRow(headingId, {
      criteriaId,
      trait: '',
    });
  };

  const handleTraitChange = (trait: string) => {
    if (!rowData) return;
    setGradingRow(headingId, {
      ...rowData,
      trait,
    });
  };

  return (
    <RubricsCriteria
      criteria={criteria}
      isSelected={isSelected}
      trait={trait}
      onClick={() => handleCriteriaClick(criteria.id!)}
      onTraitChange={handleTraitChange}
    />
  );
};
