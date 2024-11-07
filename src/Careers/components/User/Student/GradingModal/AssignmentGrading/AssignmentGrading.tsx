import { TRubric } from '@dc/graphql/user/queries/lesson';
import { FilesForGrading } from '@dc/components/User/Student/GradingModal/AssignmentGrading/FilesForGrading';

import { cleanInjection } from '@shared/utils/cleanInjection';
import { RubricsViewer } from '@shared/components/Rubrics/RubricsViewer';
import { CollapsibleWrapper } from '@shared/components/CollapsibleWrapper/CollapsibleWrapper';

type TStudentAssignment = {
  description: string;
  displayName: string;
  rubrics: TRubric[];
  id: string;
  submission: {
    files:
      | {
          filename: string;
          url: string;
          previewUrl: string;
          id: string;
          attachmentUrl: string;
        }[];
  } | null;
};

type Props = {
  assignment: TStudentAssignment;
};

export const AssignmentGrading = ({ assignment }: Props) => {
  const { description, displayName, submission } = assignment;

  return (
    <div className='h-full flex flex-col'>
      <CollapsibleWrapper title={displayName}>
        <div
          className='injected-content pt-sm'
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={cleanInjection(description)}
        />
      </CollapsibleWrapper>
      <FilesForGrading submission={submission} />
      {submission && <RubricsViewer />}
    </div>
  );
};
