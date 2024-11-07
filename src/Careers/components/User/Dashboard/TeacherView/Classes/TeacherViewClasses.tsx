import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { TEACHER_DASHBOARD } from '@dc/graphql/user/queries/teacherDashboardClassesStats';
import Content from '@dc/components/User/Dashboard/TeacherView/Classes/Content/Content';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { ReactComponent as OpenInNewIcon } from '@shared/svg/open_in_new.svg';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import Link from '@shared/components/Link';
import { formatExternalLink } from '@shared/utils/formatExternalLink';

import TeacherViewClassesSkeleton from '../Skeleton/Classes/Classes';

type Props = {
  isManagementEnabled: boolean;
};
const URL = 'https://users.definedlearning.com/manage_classes';
export const TeacherViewClasses = ({ isManagementEnabled }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { uuid } = useParams<{ uuid: string }>();
  const iconSize = isFullHD ? 'md' : 'sm';

  return (
    <div className='teacher-dashboard__classes transparent-scrollbar'>
      <div className='flex px-base pt-sm justify-between items-center'>
        <h4 className='mb-0 text-sm xxxl:text-base'>{t('user.dashboard.classes.title')}</h4>
        {isManagementEnabled && (
          <Link
            Icon={OpenInNewIcon}
            className='flex gap-xxs xxxl:gap-xs items-center text-sm xxxl:text-base'
            iconPlacement='end'
            size={iconSize}
            target='_blank'
            to={{ pathname: formatExternalLink(URL) }}
            variant='link'>
            {t('entityInfo.manageClasses')}
          </Link>
        )}
      </div>
      <SharedDataLoader
        SpinnerComponent={<TeacherViewClassesSkeleton />}
        options={{ variables: { userUuid: uuid } }}
        query={TEACHER_DASHBOARD}>
        {({ teacherDashboard: { schoolClasses } }) => <Content classes={schoolClasses} />}
      </SharedDataLoader>
    </div>
  );
};
