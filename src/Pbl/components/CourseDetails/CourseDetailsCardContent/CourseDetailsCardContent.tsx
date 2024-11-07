import ListContent, { Props as ListContentProps } from './ListContent';
import ListWithTitleContent, { Props as ListContenWithTitleProps } from './ListWithTitleContent';
import JobOutlookContent, { Props as JobOutlookContentProps } from './JobOutlookContent';

type TListProps = ListContentProps & {
  variant: 'list';
};

type TListWithTitleProps = ListContenWithTitleProps & {
  variant: 'listWithTitle';
};

type TJobOutlookProps = JobOutlookContentProps & {
  variant: 'jobOutlook';
};

export type Props = TListProps | TListWithTitleProps | TJobOutlookProps;

const CourseDetailsCardContent = (props: Props) => {
  const { variant } = props;

  if (variant === 'list') {
    return <ListContent {...props} />;
  }

  if (variant === 'jobOutlook') {
    return <JobOutlookContent {...props} />;
  }

  if (variant === 'listWithTitle') {
    return <ListWithTitleContent {...props} />;
  }

  return null;
};

export default CourseDetailsCardContent;
