import { useTranslation } from 'react-i18next';
import { useToggle } from 'react-use';
import { useMemo } from 'react';
import { isEmpty } from 'lodash-es';

import { TAssignment } from '@dc/components/Student/Lesson/types';

import { RubricsModal } from '@shared/components/RubricsModal/RubricsModal';
import { ReactComponent as SendIcon } from '@shared/svg/send_outlined.svg';
import { ReactComponent as TableIcon } from '@shared/svg/table.svg';
import { Tooltip } from '@shared/components/Tooltip';
import SharedButton from '@shared/components/Button/Button';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { useMessaging } from '@shared/hooks/useMessaging';
import { CONVERSATION_CONTEXT_TYPES } from '@shared/resources/enums';
import { defaultRubricData } from '@shared/components/Rubrics/utils/defaultRubricData';
import { IconButton } from '@shared/components/IconButton/IconButton';

type Props = {
  isPreviewOnly?: boolean;
  assignment: TAssignment;
};

export const AssignmentCardActions = ({ isPreviewOnly, assignment }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const [isRubricsModalOpen, toggleRubricsModalOpen] = useToggle(false);
  const { messagingState, setMessagingState } = useMessaging();

  const buttonSize = isFullHD ? 'md' : 'sm';

  const rubrics = useMemo(() => {
    if (isEmpty(assignment.rubrics)) {
      return [
        {
          name: assignment.displayName,
          id: assignment.id,
          criteriaLabels: defaultRubricData.criteriaLabels,
          criterias: defaultRubricData.criterias.map((criterion) => ({
            ...criterion,
            text: t(criterion.text),
          })),
          headings: defaultRubricData.headings.map((heading) => ({
            ...heading,
            name: t(heading.name),
          })),
        },
      ];
    }

    return assignment.rubrics;
  }, [assignment]);

  const setupMessagingModal = () => {
    setMessagingState({
      ...messagingState,
      show: true,
      actionContext: {
        type: CONVERSATION_CONTEXT_TYPES.ASSIGNMENT,
        id: assignment.id,
        title: assignment.displayName,
      },
    });
  };

  return (
    <div className='flex gap-xs xxxl:gap-sm items-center'>
      <SharedButton
        Icon={TableIcon}
        size={buttonSize}
        variant='primary-outlined'
        onClick={toggleRubricsModalOpen}>
        {t('student.lesson.items.assignment.rubrics')}
      </SharedButton>
      {!isPreviewOnly && (
        <Tooltip message={t('messaging.askQuestion')}>
          <IconButton
            Icon={SendIcon}
            aria-label={t('messaging.askQuestion')}
            size={isFullHD ? 'lg' : 'md'}
            variant='primary-outlined'
            onClick={setupMessagingModal}
          />
        </Tooltip>
      )}
      <RubricsModal
        grade={assignment.submission?.rubricGrade || undefined}
        isOpen={isRubricsModalOpen}
        productName={assignment.displayName}
        rubrics={rubrics}
        onClose={toggleRubricsModalOpen}
      />
    </div>
  );
};
