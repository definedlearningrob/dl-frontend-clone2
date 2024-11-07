import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import useCustomizeProject from '@pbl/hooks/useCustomizeProject';
import SharedRoleGuard from '@pbl/shared/RoleGuard/RoleGuard';

import { ReactComponent as EditIcon } from '@shared/svg/edit.svg';
import Link from '@shared/components/Link';
import SharedIcon from '@shared/components/Icon/Icon';
import { TRubric } from '@shared/components/RubricsModal/types';

type Props = {
  currentRubric: TRubric;
};

export const ProductRubricsModalActions = ({ currentRubric }: Props) => {
  const { isOwner } = useCustomizeProject();
  const { t } = useTranslation();
  const history = useHistory();

  if (!isOwner) {
    return null;
  }

  const rubricEditPath = `${history.location.pathname}/customize/rubrics/${currentRubric.id}`;

  return (
    <SharedRoleGuard.Educator>
      <Link size='sm' to={rubricEditPath} variant='primary-outlined'>
        <SharedIcon icon={<EditIcon />} size='xs' />
        {t('common.actions.edit')}
      </Link>
    </SharedRoleGuard.Educator>
  );
};
