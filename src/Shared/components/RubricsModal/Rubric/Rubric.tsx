/* eslint-disable react/no-danger */
import { ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { TProductSubmissionGrade } from '@pbl/components/Project/types';

import { ReactComponent as PrintIcon } from '@shared/svg/print.svg';
import { prepareTableData } from '@shared/components/Rubrics/utils/prepareTableData';
import { RubricProvider } from '@shared/components/Rubrics/RubricProvider/RubricProvider';
import { RubricsViewer } from '@shared/components/Rubrics/RubricsViewer';
import { RUBRIC_TYPE } from '@shared/components/Rubrics/utils/enums';
import { useTabsContext } from '@shared/components/DeprecatedTabs/DeprecatedTabs';
import { cleanInjection } from '@shared/utils/cleanInjection';
import SharedIcon from '@shared/components/Icon/Icon';
import SharedButton from '@shared/components/Button/Button';
import { useUserRole } from '@shared/graphql/user/hooks/useUserRole';

import { TRubric } from '../types';

import styles from './Rubric.module.sass';

type Props = {
  grade?: TProductSubmissionGrade;
  rubrics: TRubric[];
  onPrint?: () => void;
  renderActions?: (currentRubric: TRubric) => ReactNode;
};

const UserProjectProductsRubric = ({ grade, rubrics, onPrint, renderActions }: Props) => {
  const { tab } = useTabsContext();
  const { t } = useTranslation();
  const { isUser } = useUserRole();

  const currentRubric = useMemo(
    () => rubrics.find((rubric) => rubric.id === tab?.id) || rubrics[0],
    [tab]
  );

  const tableData = useMemo(
    () => currentRubric && prepareTableData(currentRubric),
    [currentRubric]
  );

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.actions}>
          {onPrint && (
            <SharedButton size='sm' variant='primary-outlined' onClick={onPrint}>
              <SharedIcon icon={<PrintIcon />} size='xs' />
              {t('sharedCommon.print')}
            </SharedButton>
          )}
          {renderActions && renderActions(currentRubric)}
        </div>
        {currentRubric.description && (
          <div
            className={styles.description}
            dangerouslySetInnerHTML={cleanInjection(currentRubric.description)}
          />
        )}
      </div>
      <div className='user-project__rubric'>
        <RubricProvider
          grader={grade?.lastGradedBy}
          initialResults={grade?.results || []}
          rubric={tableData}
          type={isUser ? RUBRIC_TYPE.PREVIEW : RUBRIC_TYPE.VIEWER}>
          <RubricsViewer />
        </RubricProvider>
      </div>
    </div>
  );
};

export default UserProjectProductsRubric;
