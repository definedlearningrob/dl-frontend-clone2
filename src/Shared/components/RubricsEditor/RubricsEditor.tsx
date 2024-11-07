import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';

import { RubricEdit } from '@shared/components/RubricsEditor/utils/types';
import { callToast } from '@shared/components/Toaster/Toaster';
import { cx } from '@shared/utils/cx';
import { DeleteRubricItemModal } from '@shared/components/RubricsEditor/DeleteRubricItemModal/DeleteRubricItemModal';
import { EditRubricsHeadingModal } from '@shared/components/RubricsEditor/EditRubricsHeadingModal/EditRubricsHeadingModal';
import { useToggle } from '@shared/hooks/useToggle';
import { AlignToPlanProvider } from '@shared/components/RubricsEditor/AlignToPlanModal/AlignToPlanProvider';
import { AlignToPlanModal } from '@shared/components/RubricsEditor/AlignToPlanModal/AlignToPlanModal';

import { RubricsCriteriaLabel } from './RubricsCriteriaLabel/RubricsCriteriaLabel';
import { useRubricEditor } from './RubricsEditorProvider';
import { RubricsRow } from './RubricsRow/RubricsRow';
import './styles/RubricsEditor.sass';
import styles from './RubricEditor.module.sass';

export const RubricsEditor = () => {
  const { t } = useTranslation();
  const {
    rubric,
    editing: { addColumn, addRow },
  } = useRubricEditor<RubricEdit>();
  const [toDelete, setToDelete] = useState<{
    type: 'row' | 'column';
    id: string;
  } | null>(null);

  const handleEditClick = (editDimension: () => Promise<void>) => {
    rubric.canEdit ? editDimension() : callToast('warning', t('components.rubric.cannotEdit'));
  };

  const [editedRowId, setEditedRowId] = useState<null | string>(null);
  const [isAlignToPlan, toggleAlignToPlan] = useToggle(false);
  const [alignToPlanId, setAlignToPlanId] = useState<string>('');
  const handleAlignToPlan = (id: string) => {
    setAlignToPlanId(id);
    toggleAlignToPlan();
  };

  const handleClose = () => {
    setAlignToPlanId('');
    toggleAlignToPlan();
  };

  const handleDelete = (elementToDelete: { id: string; type: 'row' | 'column' }) => {
    rubric.canEdit
      ? setToDelete(elementToDelete)
      : callToast('warning', t('components.rubric.cannotEdit'));
  };

  return (
    <>
      <div className={cx('overflow-x-auto', styles.rubricEditor)}>
        <table
          className='w-full border-collapse table-auto border border-neutral-300'
          data-testid='rubric-table-builder'>
          <caption className='sr-only'>
            {t('components.rubric.rubricEditorTableName', { name: rubric.name })}
          </caption>
          <thead>
            <tr>
              <th data-testid='rubrics-reserved-cell'>
                <span className='font-bold'>{t('components.rubric.levels')}</span>
              </th>
              {rubric.criteriaLabels.map((label) => (
                <RubricsCriteriaLabel
                  key={label.id}
                  criteriaLabel={label}
                  onColumnDelete={(id) => handleDelete({ id, type: 'column' })}
                />
              ))}
              <th
                className='w-[80px]'
                data-testid='rubric-new-column'
                role='button'
                onClick={() => handleEditClick(addColumn)}>
                <span className='rubrics-builder__new-cell'>+ {t('common.actions.new')}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rubric.headings.map((heading, index, headings) => (
              <RubricsRow
                key={heading.id}
                criteria={rubric.criterias}
                criteriaLabels={rubric.criteriaLabels}
                heading={heading}
                isLastRow={index === headings.length - 1}
                onAlignToPlan={handleAlignToPlan}
                onEdit={setEditedRowId}
                onRowDelete={(id) => handleDelete({ id, type: 'row' })}
              />
            ))}
            <tr>
              <td
                className='rubrics-builder__heading -center'
                data-testid='rubric-new-row'
                role='button'
                onClick={() => handleEditClick(addRow)}>
                <span className='rubrics-builder__new-cell'>+ {t('common.actions.new')}</span>
              </td>
              <td className='rubrics-builder__fake-cell' colSpan={rubric.criteriaLabels.length} />
            </tr>
          </tbody>
        </table>
      </div>
      {toDelete && <DeleteRubricItemModal toDelete={toDelete} onClose={() => setToDelete(null)} />}
      {editedRowId && (
        <EditRubricsHeadingModal rubricId={editedRowId} onClose={() => setEditedRowId(null)} />
      )}
      {isAlignToPlan && (
        <AlignToPlanProvider headingId={alignToPlanId}>
          <AlignToPlanModal onClose={handleClose} />
        </AlignToPlanProvider>
      )}
    </>
  );
};
