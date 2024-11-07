import PropTypes from 'prop-types';
import { useState } from 'react';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import ArchiveModal from '@dc/components/Admin/PlanGroups/Form/Statements/List/ArchiveModal/ArchiveModal';
import { shapePlanGroup } from '@dc/resources/typeDefs';
import { assignSteps } from '@dc/utils/assignSteps';

import { ListItems } from '@shared/components/SelectableList/ListItems/ListItems';
import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';
import { ReactComponent as StatementIcon } from '@shared/svg/certificate.svg';

AdminPlanGroupsFormStatementsList.propTypes = {
  group: shapePlanGroup,
  openForm: PropTypes.func,
  statements: PropTypes.array,
};

function AdminPlanGroupsFormStatementsList({ group, openForm, statements }) {
  const [statementToArchive, setStatementToArchive] = useState(null);
  const [, , statementsHelpers] = useField('statements');
  const { t } = useTranslation();

  const reorder = ({ source, destination }) => {
    const result = Array.from(statements);
    const [removed] = result.splice(source.index, 1);
    result.splice(destination.index, 0, removed);

    return assignSteps(result);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const reordered = reorder(result);
    statementsHelpers.setValue(reordered);
  };

  const onModalClose = () => setStatementToArchive(null);
  const getBadge = (statement) => {
    const questionType = statement.question?.questionType;
    const hasQuestion = !isEmpty(statement.question?.text) && questionType;

    return {
      type: hasQuestion ? 'primary' : 'neutral',
      text: hasQuestion
        ? t(`admin.planGroups.statementQuestionTypes.${questionType}`)
        : t('admin.planGroups.withoutQuestion'),
    };
  };

  const getKicker = (statement) => {
    if (!statement.isRequired) {
      return null;
    }

    return {
      variant: 'secondary',
      text: t('sharedCommon.required'),
    };
  };

  return (
    <>
      <ListWrapper title={`${t('common.statuses.selected')} (${statements.length})`}>
        <ListItems
          ListItemIcon={StatementIcon}
          getBadge={getBadge}
          getKicker={getKicker}
          isDraggable={true}
          items={statements}
          mode='remove'
          onChange={setStatementToArchive}
          onDragEnd={onDragEnd}
          onEditClick={openForm}
        />
      </ListWrapper>

      {statementToArchive && (
        <ArchiveModal group={group} statement={statementToArchive} onClose={onModalClose} />
      )}
    </>
  );
}

export default AdminPlanGroupsFormStatementsList;
