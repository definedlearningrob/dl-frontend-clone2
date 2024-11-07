import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ReactComponent as ChevronRightIcon } from '@shared/svg/arrow_forward.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import { Tooltip } from '@shared/components/Tooltip';

type Props = {
  uuid: string;
};

const UserMyClassesActions = ({ uuid }: Props) => {
  const { t } = useTranslation();
  const history = useHistory();

  const navigateToClassPage = () => {
    history.push(`/my-classes/${uuid}`);
  };

  return (
    <div className='flex float-right items-end'>
      <Tooltip message={t('user.myClasses.goToClass')}>
        <SharedIcon
          className='text-primary-500'
          icon={<ChevronRightIcon />}
          onClick={navigateToClassPage}
        />
      </Tooltip>
    </div>
  );
};

export default UserMyClassesActions;
