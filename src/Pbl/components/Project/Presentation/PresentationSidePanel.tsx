import { useTranslation } from 'react-i18next';
import { ForwardedRef, forwardRef, useRef } from 'react';
import { isEmpty } from 'lodash-es';

import { RevealRef } from '@dc/components/Admin/Tasks/PresentationBuilder/PresentationPreview/PresentationPreviewSlides';

import { NavigationTree } from '@pbl/components/Project/Presentation/NavigationTree';
import type { TProject } from '@pbl/graphql/user/queries/project';

import { ReactComponent as TeamIcon } from '@shared/assets/icons/projectTeam.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { useIsTruncated } from '@shared/hooks/useIsTruncated';
import { Tooltip } from '@shared/components/Tooltip';
import { ReactComponent as IndividualProjectIcon } from '@shared/assets/icons/individual_project_icon.svg';
import { cx } from '@shared/utils/cx';

export type Props = {
  presentation: TProject['presentation'];
  taskName?: string;
  teamName?: string;
};

export const PresentationSidePanel = forwardRef(
  ({ presentation, taskName, teamName }: Props, ref: ForwardedRef<RevealRef>) => {
    const { t } = useTranslation();

    const projectNameRef = useRef<HTMLHeadingElement>(null);
    const teamNameRef = useRef<HTMLParagraphElement>(null);

    const isTeamNameTruncated = useIsTruncated({ ref: teamNameRef, mode: 'single-line' });
    const isProjectNameTruncated = useIsTruncated({ ref: projectNameRef, mode: 'multi-line' });

    const HeadingIcon = !isEmpty(teamName) ? TeamIcon : IndividualProjectIcon;

    return (
      <div
        className={cx('bg-white !rounded-tl-sm w-[300px] xxxl:w-[400px] p-sm', {
          'flex flex-col gap-sm': taskName,
        })}>
        <div className={cx({ 'border-b border-neutral-300 pb-x': taskName })}>
          {taskName && (
            <Tooltip delayDuration={300} disabled={!isProjectNameTruncated} message={taskName}>
              <h1 ref={projectNameRef} className='line-clamp-3 mb-x text-base'>
                {taskName}
              </h1>
            </Tooltip>
          )}
          {teamName && (
            <Tooltip delayDuration={300} disabled={!isTeamNameTruncated} message={teamName}>
              <div className='flex items-center gap-xxs'>
                <Tooltip delayDuration={300} message={t('teams.teamProjectInfo')}>
                  <IconContainer
                    Icon={HeadingIcon}
                    className='bg-neutral-200 rounded-xs mr-xxs'
                    paddingSize='xs'
                    size='sm'
                  />
                </Tooltip>
                <p
                  ref={teamNameRef}
                  className='mb-0 text-sm line-clamp-1 break-all text-primary-500'>
                  {teamName}
                </p>
              </div>
            </Tooltip>
          )}
        </div>
        <div className='bg-neutral-200 rounded-sm p-xs xxxl:p-sm !pe-0 min-h-0 flex flex-col h-full'>
          <h5 className='text-sm xxxl:text-base !mb-x'>Slides</h5>
          <div className='scrollbar'>
            <NavigationTree ref={ref} presentation={presentation} />
          </div>
        </div>
      </div>
    );
  }
);
