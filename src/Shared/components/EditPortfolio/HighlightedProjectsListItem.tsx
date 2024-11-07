import { FieldArrayRenderProps, useField } from 'formik';

import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import { cx } from '@shared/utils/cx';
import { PortfolioProjectsCard } from '@shared/components/Portfolio/Projects';
import { TPortfolioProject } from '@shared/components/Portfolio/types';
import { PortfolioFormValues } from '@shared/components/EditPortfolio/EditPortfolio';
import { usePortfolioContext } from '@shared/components/Portfolio/helpers/usePortfolioContext';
import { HighlightedProject } from '@shared/components/EditPortfolio/types';

type Props = {
  project: TPortfolioProject;
} & FieldArrayRenderProps;

export const HighlightedProjectsListItem = ({ project, push, remove }: Props) => {
  const [highlightedProjectsField] =
    useField<PortfolioFormValues['highlightedProjects']>(`highlightedProjects`);
  const { userInfo } = usePortfolioContext();

  const studentInfo = {
    uuid: userInfo.uuid,
    lastName: userInfo.lastName,
    firstName: userInfo.firstName,
    email: userInfo.email,
    username: userInfo.username,
  };

  const isHighlightedProject = (highlightedProject: HighlightedProject) =>
    highlightedProject.projectId === project.id &&
    highlightedProject.projectType === project.resourceClass;

  const isHighlighted = highlightedProjectsField.value.some(isHighlightedProject);

  const onChange = () => {
    if (isHighlighted) {
      const highlightedProjectIndex =
        highlightedProjectsField.value.findIndex(isHighlightedProject);

      remove(highlightedProjectIndex);
    } else {
      push({ projectId: project.id, projectType: project.resourceClass });
    }
  };

  const projectClassName = cx(
    'flex py-sm px-x xxxl:py-base xxxl:px-sm',
    'border border-solid border-neutral-300 rounded-xs hover:border-neutral-400 transition-[border-color] duration-200',
    {
      'bg-primary-200 border-primary-500  [&_.trigger-name]:from-primary-200 [&_.trigger-name]:via-40% [&_.trigger-name]:via-primary-200 [&_.trigger-name]:bg-primary-200':
        isHighlighted,
    }
  );

  const cardWrapperClassName = cx(
    'w-full',
    '[&_.wrapper-image]:basis-[137px] [&_.wrapper-image]:max-h-[80px] [&_.wrapper-header]:basis-[137px]',
    '[&_.wrapper-image]:xxxl:basis-[240px] [&_.wrapper-image]:xxxl:max-h-[140px] [&_.wrapper-header]:xxxl:basis-[240px]',
    { '[&>div]:bg-primary-200': isHighlighted }
  );

  return (
    <li key={project.id} className={projectClassName} role='button' onClick={onChange}>
      <div>
        <SharedCheckbox checked={isHighlighted} labelClassName='before:!mr-x' readOnly={true} />
      </div>
      <div className={cardWrapperClassName}>
        <PortfolioProjectsCard isEditing={true} project={project} studentInfo={studentInfo} />
      </div>
    </li>
  );
};
