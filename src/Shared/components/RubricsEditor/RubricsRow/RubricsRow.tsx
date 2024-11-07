import { useMemo, useState } from 'react';

import { RubricsHeading } from '../RubricsHeading/RubricsHeading';
import { RubricsEditableCriteria } from '../RubricsEditableCriteria';
import { byCriteriaLabelIds } from '../utils/sortByCriteriaId';
import { RubricCriteria, RubricCriteriaLabel, RubricHeading } from '../utils/types';

type Props = {
  heading: RubricHeading;
  criteria: RubricCriteria[];
  criteriaLabels: RubricCriteriaLabel[];
  isLastRow: boolean;
  onRowDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onAlignToPlan: (id: string) => void;
};

export const RubricsRow = ({
  criteriaLabels,
  criteria,
  heading,
  onEdit,
  onRowDelete,
  onAlignToPlan,
}: Props) => {
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);

  const childSortedCriteria = useMemo(
    () =>
      criteria
        .filter((criteria) => criteria.rubricHeadingId === heading.id)
        .sort(byCriteriaLabelIds(criteriaLabels)),
    [criteria]
  );

  const toggleDeleteHovered = () => setIsDeleteHovered(!isDeleteHovered);

  return (
    <tr>
      <RubricsHeading
        heading={heading}
        isRowDeleting={isDeleteHovered}
        toggleDeleteHovered={toggleDeleteHovered}
        onAlignToPlan={onAlignToPlan}
        onEdit={onEdit}
        onRowDelete={onRowDelete}
      />
      {childSortedCriteria.map((criterion, index) => (
        <RubricsEditableCriteria key={`${heading.id}-${index}`} criterion={criterion} />
      ))}
    </tr>
  );
};
