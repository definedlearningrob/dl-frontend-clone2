import cx from 'classnames';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as DeleteIcon } from '@shared/svg/delete_outlined.svg';
import { ReactComponent as CertificateIcon } from '@shared/svg/certificate.svg';
import { ReactComponent as EditIcon } from '@shared/svg/edit.svg';
import { DropdownContextMenu } from '@shared/components/DropdownContextMenu';
import { Tooltip } from '@shared/components/Tooltip';
import { useUserRole } from '@shared/graphql/user/hooks/useUserRole';

import { RubricHeading } from '../utils/types';

import styles from './RubricsHeading.module.sass';

type Props = {
  heading: RubricHeading;
  isRowDeleting: boolean;
  toggleDeleteHovered: () => void;
  onRowDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onAlignToPlan: (id: string) => void;
};

export function RubricsHeading({
  heading,
  isRowDeleting,
  onRowDelete,
  onEdit,
  onAlignToPlan,
}: Props) {
  const { t } = useTranslation();
  const { isSystemAdmin } = useUserRole();

  const headingClasses = cx('p-x align-middle max-w-[145px] group relative', {
    '-deleting': isRowDeleting,
  });

  const dropdownItems = useMemo(
    () =>
      [
        {
          Icon: EditIcon,
          action: () => onEdit(heading.id),
          text: t('common.actions.edit'),
        },
        {
          Icon: CertificateIcon,
          action: () => onAlignToPlan(heading.id),
          text: t('components.rubric.alignToPlan'),
          hidden: !isSystemAdmin,
        },
        {
          Icon: DeleteIcon,
          action: () => onRowDelete(heading.id),
          text: t('components.rubric.deleteRow'),
          itemClassName: 'text-danger-500 focus-visible:!bg-danger-100',
        },
      ].filter((item) => !item.hidden),
    []
  );

  return (
    <td className={headingClasses} data-testid='rubric-heading'>
      <div>
        <Tooltip delayDuration={300} message={heading.name}>
          <div
            className={cx(styles.heading, 'text-xs xxxl:text-sm font-bold text-neutral-800 mb-xs')}
            data-testid='rubric-heading-text'>
            {heading.name}
          </div>
        </Tooltip>
        {isSystemAdmin && (
          <>
            <div className='leading-lg text-xxs xxxl:text-xs me-xxs'>
              {t('components.rubric.statementsCount', {
                statementsCount: heading.statements?.length || 0,
              })}
            </div>
            <div className='leading-lg text-xxs xxxl:text-xs me-xxs'>
              {t('components.rubric.performanceIndicatorsCount', {
                count: heading.tags?.length || 0,
              })}
            </div>
          </>
        )}
        <div>
          <span className='leading-lg text-xxs xxxl:text-xs me-xxs'>
            {t('components.rubric.multiplier')}
          </span>
          <span
            className='text-neutral-800 leading-lg text-xxs xxxl:text-xs px-xxs border border-neutral-300 min-w-fit rounded-xs'
            data-testid='rubric-heading-multiplier'>
            {t('components.rubric.multiplierValue', { multiplier: heading.multiplier })}
          </span>
        </div>
      </div>
      <DropdownContextMenu
        ariaLabel={t('components.rubric.headingActions', { heading: heading.name })}
        items={dropdownItems}
        triggerClassName='group-hover:!visible group-hover:bg-white absolute top-xs right-xs'
      />
    </td>
  );
}
