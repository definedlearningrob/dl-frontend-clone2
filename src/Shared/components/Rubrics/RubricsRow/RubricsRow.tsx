import { useMemo } from 'react';

import { RubricsHeading } from '../RubricsHeading/RubricsHeading';
import { RubricsGradeCriteria } from '../RubricsGradeCriteria';
import { byCriteriaLabelIds } from '../utils/sortByCriteriaId';
import { RubricCriteria, RubricCriteriaLabel, RubricHeading } from '../utils/types';

type Props = {
  heading: RubricHeading;
  criteria: RubricCriteria[];
  criteriaLabels: RubricCriteriaLabel[];
};

export const RubricsRow = ({ criteriaLabels, criteria, heading }: Props) => {
  const childSortedCriteria = useMemo(
    () =>
      criteria
        .filter((criterion) => criterion.rubricHeadingId === heading.id)
        .sort(byCriteriaLabelIds(criteriaLabels)),
    [criteria]
  );

  return (
    <tr>
      <RubricsHeading heading={heading} />
      {childSortedCriteria.map((criteria, index) => (
        <RubricsGradeCriteria key={`${heading.id}-${index}`} criteria={criteria} />
      ))}
    </tr>
  );
};
