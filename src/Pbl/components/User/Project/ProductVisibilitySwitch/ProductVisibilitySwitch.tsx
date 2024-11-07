import { isUndefined } from 'lodash-es';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useCustomizeProject from '@pbl/hooks/useCustomizeProject';
import { useToggleProductHidden } from '@pbl/graphql/user/hooks/useToggleProductHidden';

import SharedSwitch from '@shared/components/Switch/Switch';

type Props = {
  isHidden?: boolean;
  productId: string;
};

export const ProductVisibilitySwitch = ({ isHidden, productId }: Props) => {
  const { t } = useTranslation();
  const { projectId } = useParams<{ projectId: string }>();
  const { editMode } = useCustomizeProject();
  const [toggleProductHidden] = useToggleProductHidden();

  if (!editMode || isUndefined(isHidden)) {
    return null;
  }

  const toggleProductVisibility = () => {
    toggleProductHidden({ productId, taskId: projectId, hidden: isHidden });
  };

  return (
    <SharedSwitch
      additionalLabel={t('common.actions.hide')}
      label={t('common.actions.show')}
      value={!isHidden}
      onChange={toggleProductVisibility}
    />
  );
};
