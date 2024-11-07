import cx from 'classnames';

import { ReactComponent as CheckedIcon } from '@dc/svg/accept.svg';
import { ReactComponent as UnCheckedIcon } from '@dc/svg/square_outlined.svg';
import { TClustersData } from '@dc/graphql/shared/queries/clusters';

import SharedIcon from '@shared/components/Icon/Icon';

type Pathway = TClustersData['clusters'][number]['pathways'][number];

type Props = {
  pathway: Pathway;
  checkPathwayChecked: (pathway: Pathway) => boolean;
  togglePathwayCheck: (pathway: Pathway) => () => void;
};

export const OpportunityClustersPathwayItem = ({
  pathway,
  checkPathwayChecked,
  togglePathwayCheck,
}: Props) => {
  const isPathwayChecked = checkPathwayChecked(pathway);

  return (
    <li
      className={cx('student-courses__panel-filter__pathway-item', {
        '-checked': isPathwayChecked,
      })}
      data-testid='pathway-item'>
      <div
        className='student-courses__panel-filter__pathway-item-label'
        data-testid='check-pathway'
        onClick={togglePathwayCheck(pathway)}>
        <SharedIcon icon={isPathwayChecked ? <CheckedIcon /> : <UnCheckedIcon />} size='sm' />
        {pathway.name}
      </div>
    </li>
  );
};
