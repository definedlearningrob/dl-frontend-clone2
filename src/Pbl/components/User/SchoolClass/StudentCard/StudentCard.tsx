import { useTranslation } from 'react-i18next';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useToggle } from 'react-use';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { LOCAL_STORAGE_CLASS_ID } from '@pbl/resources/localStorageKeys';
import { type TStudent } from '@pbl/graphql/user/fragments/schoolClassStudents';
import useUserInfo from '@pbl/hooks/useUserInfo';

import SharedAvatar from '@shared/components/Avatar/Avatar';
import { ReactComponent as DotsIcon } from '@shared/svg/three_dots.svg';
import { ReactComponent as Messages } from '@shared/svg/send_outlined.svg';
import { ReactComponent as Duplicate } from '@shared/svg/duplicate.svg';
import { ReactComponent as Certificate } from '@shared/svg/certificate.svg';
import { ReactComponent as PieChart } from '@shared/svg/pie_chart_outline.svg';
import { ReactComponent as Visible } from '@shared/svg/visible_outlined.svg';
import { ReactComponent as GoalPerformanceIcon } from '@shared/assets/icons/bar_graph.svg';
import { useMessaging } from '@shared/hooks/useMessaging';
import { callToast } from '@shared/components/Toaster/Toaster';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

type Props = {
  student: TStudent;
};

export const StudentCard = ({ student }: Props) => {
  const { t } = useTranslation();
  const { classId } = useParams<{ classId: string }>();
  const { setMessagingState, messagingState } = useMessaging();
  const history = useHistory();
  const { impersonateStart } = useUserInfo();
  const [isOpen, toggleIsOpen] = useToggle(false);

  const user = {
    firstName: student.firstName,
    lastName: student.lastName,
  };
  const name = `${user.firstName} ${user.lastName}`;
  const [firstPlan] = student.plans;

  const handleNewMessage = (student: TStudent) => {
    setMessagingState({
      ...messagingState,
      show: true,
      receiver: { ...student, name: `${student.firstName} ${student.lastName}` },
    });
  };

  const startImpersonate = async () => {
    try {
      await impersonateStart(student.uuid);
      localStorage.setItem(LOCAL_STORAGE_CLASS_ID, classId);
      history.replace('/');
    } catch (error) {
      callToast('error', t('common.error', { error }));
    }
  };
  const triggerClassName = cx(
    'absolute top-sm right-sm bg-white rounded-xs invisible group-hover:visible text-primary-500',
    {
      '!visible': isOpen,
    }
  );

  const dropdownMenuContentClasses = cx(
    'py-xxs bg-white rounded-sm w-full shadow-200',
    'border border-solid border-neutral-300',
    'text-font-primary text-xs font-regular leading-lg'
  );

  const listItemClasses = cx(
    'font-regular hover:bg-primary-200 focus-visible:outline-none',
    'text-xs px-sm py-xs cursor-pointer',
    'transition-[background-color] duration-300',
    'flex items-center gap-xs'
  );

  const linkItemClasses =
    'flex-grow flex gap-xs items-center text-neutral-800 hover:text-neutral-800';

  const cardClasses =
    'flex flex-col items-center border-neutral-300 border bg-white rounded-sm p-sm xxxl:p-base relative hover:bg-primary-200 hover:border-primary-500 group';

  return (
    <div className={cardClasses}>
      <SharedAvatar className='mb-xs' size='32' user={user} />
      <DropdownMenu.Root modal={false} open={isOpen} onOpenChange={toggleIsOpen}>
        <DropdownMenu.Trigger className={triggerClassName}>
          <IconContainer Icon={DotsIcon} paddingSize='xxs' size='sm' />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align='end'
            asChild={true}
            className={dropdownMenuContentClasses}
            sideOffset={12}>
            <ul className='py-xs text-xs'>
              <li className={listItemClasses} onClick={() => handleNewMessage(student)}>
                <IconContainer Icon={Messages} paddingSize='none' size='sm' />
                {t('messaging.new.send')}
              </li>
              <li className={listItemClasses}>
                <Link className={linkItemClasses} to={`/students/${student.uuid}/portfolio`}>
                  <IconContainer Icon={Duplicate} paddingSize='none' size='sm' />
                  {t('student.navigation.portfolio')}
                </Link>
              </li>
              {student.hasPlans && (
                <li className={listItemClasses}>
                  <Link className={linkItemClasses} to={`/students/${student.uuid}/plans`}>
                    <IconContainer Icon={Certificate} paddingSize='none' size='sm' />
                    {t('portfolio.plans')}
                  </Link>
                </li>
              )}
              <li className={listItemClasses}>
                <Link
                  className={linkItemClasses}
                  to={`/students/${student.uuid}/portfolio/experiences`}>
                  <IconContainer Icon={PieChart} paddingSize='none' size='sm' />
                  {t('portfolio.experiencesPanel.chartTitle')}
                </Link>
              </li>
              {student.hasPlans && (
                <li className={listItemClasses}>
                  <Link
                    className={linkItemClasses}
                    to={`/reports/student-progress/${firstPlan?.id}/${student.uuid}`}>
                    <IconContainer Icon={GoalPerformanceIcon} paddingSize='none' size='sm' />
                    {t('user.goals.goalsProgressReport')}
                  </Link>
                </li>
              )}
              <li className={cx('text-secondary-500', listItemClasses)} onClick={startImpersonate}>
                <IconContainer Icon={Visible} paddingSize='none' size='sm' />
                {t('user.myClasses.students.loginAs')}
              </li>
            </ul>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      <h6 className='font-bold text-xs leading-base text-center'>{name}</h6>
      <p className='w-full text-center text-xxs bg-neutral-200 py-xs rounded-sm leading-sm mt-auto mb-0 font-medium group-hover:bg-white group-hover:text-primary-500'>
        {t('user.myClasses.students.projects', { count: student.currentTasksCount })}
      </p>
    </div>
  );
};
