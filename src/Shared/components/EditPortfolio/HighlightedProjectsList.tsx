import { FieldArray } from 'formik';
import { isEmpty } from 'lodash-es';
import { forwardRef } from 'react';

import { TPortfolioProject } from '@shared/components/Portfolio/types';
import { EmptyProjects } from '@shared/components/EditPortfolio/EmptyProjects';
import { PORTFOLIO_PROJECT_TYPES } from '@shared/resources/enums';

import { HighlightedProjectsListItem } from './HighlightedProjectsListItem';

export type tabType = PORTFOLIO_PROJECT_TYPES;

type Props = {
  projects: TPortfolioProject[];
  tab: tabType;
};

export const HighlightedProjectsList = forwardRef<HTMLUListElement, Props>(
  ({ projects, tab }: Props, ref) => {
    if (isEmpty(projects)) {
      return <EmptyProjects tab={tab} />;
    }

    return (
      <ul
        ref={ref}
        className='flex flex-col gap-sm xxxl:gap-base h-full overflow-auto scrollbar pe-base xxxl:pe-md'
        id='highlightedProjects'>
        <FieldArray
          name='highlightedProjects'
          render={(arrayHelpers) =>
            projects.map((project) => (
              <HighlightedProjectsListItem
                key={`${project.id}-${project.resourceClass}`}
                project={project}
                {...arrayHelpers}
              />
            ))
          }
        />
      </ul>
    );
  }
);
