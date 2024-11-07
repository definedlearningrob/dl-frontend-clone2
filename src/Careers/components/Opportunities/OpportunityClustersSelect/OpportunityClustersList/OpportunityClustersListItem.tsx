import cx from 'classnames';

import { ReactComponent as CheckedIcon } from '@dc/svg/accept.svg';
import { ReactComponent as RemoveIcon } from '@dc/svg/remove.svg';
import { ReactComponent as UnCheckedIcon } from '@dc/svg/square_outlined.svg';
import { TClustersData } from '@dc/graphql/shared/queries/clusters';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as UpIcon } from '@shared/svg/chevron_up.svg';
import { ReactComponent as DownIcon } from '@shared/svg/chevron_down.svg';

import { OpportunityClustersPathwayItem } from './OpportunityClustersPathwayItem';

type Cluster = TClustersData['clusters'][number];
type Pathway = TClustersData['clusters'][number]['pathways'][number];

type Props = {
  cluster: Cluster;
  isClusterChecked: boolean;
  isClusterExpand: boolean;
  checkPathwayChecked: (pathway: Pathway) => boolean;
  clusterHasSelectedPathway: boolean;
  toggleClusterCheck: (cluster: Cluster) => () => void;
  toggleClusterExpand: (cluster: Cluster) => () => void;
  togglePathwayCheck: (pathway: Pathway) => () => void;
};

export const OpportunityClustersListItem = ({
  cluster,
  clusterHasSelectedPathway,
  checkPathwayChecked,
  isClusterChecked,
  isClusterExpand,
  toggleClusterCheck,
  toggleClusterExpand,
  togglePathwayCheck,
}: Props) => {
  const clusterItemClassNames = cx('student-courses__panel-filter__cluster-item', {
    '-checked-all': isClusterChecked,
    '-checked-some': clusterHasSelectedPathway,
  });

  const Icon = isClusterChecked
    ? CheckedIcon
    : clusterHasSelectedPathway
    ? RemoveIcon
    : UnCheckedIcon;

  return (
    <li className={clusterItemClassNames} data-testid='cluster-item'>
      <div className='student-courses__panel-filter__cluster-item-label'>
        <div
          className='student-courses__panel-filter__cluster-item-clickable'
          data-testid='check-cluster'
          onClick={toggleClusterCheck(cluster)}>
          <SharedIcon icon={<Icon />} size='sm' />
          <span>{cluster.name}</span>
        </div>
        <div className='student-courses__panel-filter__cluster-item-expander'>
          {cluster.pathways.length}
          <div data-testid='expand-cluster' onClick={toggleClusterExpand(cluster)}>
            <SharedIcon icon={isClusterExpand ? <UpIcon /> : <DownIcon />} size='sm' />
          </div>
        </div>
      </div>
      {isClusterExpand && (
        <ul className='student-courses__panel-filter__pathways'>
          {cluster.pathways.map((pathway) => (
            <OpportunityClustersPathwayItem
              key={pathway.id}
              checkPathwayChecked={checkPathwayChecked}
              pathway={pathway}
              togglePathwayCheck={togglePathwayCheck}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
