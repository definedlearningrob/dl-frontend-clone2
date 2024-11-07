import React from 'react';
import cx from 'classnames';

import { EDUCATIONAL_RESOURCE_TYPES } from '@dc/resources/constants';

import TextHighlighter from '@shared/components/TextHighlighter';
import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';
import Icon from '@shared/components/Icon/Icon';
import { StageLabel } from '@shared/components/StageLabel';
import { Badge } from '@shared/components/Badge/Badge';
import { Tooltip } from '@shared/components/Tooltip';

import styles from './CourseCard.module.sass';

type SVGProps = React.SVGProps<SVGSVGElement>;

type Props = {
  className?: string;
  backgroundUrl: string;
  title: string;
  tooltip?: React.FC;
  shouldShowTooltip?: boolean;
  isTaken?: boolean;
  searchedText?: string;
  isMiddleSchool: string;
  category?: string;
  additionalInfo?: {
    icon?: React.FC<SVGProps>;
    text: string;
  };
  onClick?: (...args: unknown[]) => void;
  buttonLabel?: React.ReactNode;
  buttonIcon?: React.FC<SVGProps>;
  buttonProps?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'className'>;
  containerProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'>;
  isEducationalLabelVisible?: boolean;
  collection?: string;
};

const CourseCard = ({
  className,
  backgroundUrl,
  title,
  shouldShowTooltip,
  tooltip: TooltipComponent,
  isMiddleSchool,
  searchedText = '',
  category,
  additionalInfo,
  onClick,
  buttonLabel,
  buttonIcon: ButtonIcon,
  buttonProps,
  containerProps,
  isEducationalLabelVisible,
  isTaken,
  collection,
}: Props) => {
  const { icon: AdditionalInfoIcon, text: additionalText } = additionalInfo ?? {};

  return (
    <div
      className={cx(className, styles.courseCard)}
      style={{ backgroundImage: `url(${backgroundUrl})` }}
      {...containerProps}>
      <div
        className={cx(styles.container, {
          [styles.highlightedCard]: isTaken,
        })}>
        <div className='flex gap-xs justify-between w-full'>
          {category && (
            <Tooltip className='truncate' delayDuration={500} message={category}>
              <Badge className='!rounded-full !leading-base h-base truncate' type='neutral'>
                {category}
              </Badge>
            </Tooltip>
          )}
          <div className='flex gap-xs min-w-min'>
            {collection && (
              <Tooltip className='truncate' delayDuration={500} message={collection}>
                <Badge className='!rounded-full !leading-base h-base truncate' type='secondary'>
                  {collection}
                </Badge>
              </Tooltip>
            )}
            {isEducationalLabelVisible && (
              <StageLabel resourceType={EDUCATIONAL_RESOURCE_TYPES.COURSE} stage={isMiddleSchool} />
            )}
          </div>
        </div>
        <h2 className={styles.header}>
          <DeprecatedTooltip
            Component={TooltipComponent}
            className={styles.tooltip}
            disabled={!shouldShowTooltip}>
            <TextHighlighter text={searchedText}>
              <span className='highlightible'>{title}</span>
            </TextHighlighter>
          </DeprecatedTooltip>
        </h2>
        {additionalInfo && (
          <div className={styles.additionalInfo}>
            {AdditionalInfoIcon && (
              <Icon className={styles.additionalInfoIcon} icon={<AdditionalInfoIcon />} size='xs' />
            )}
            <span>{additionalText}</span>
          </div>
        )}
        {onClick && (
          <button className={styles.button} onClick={onClick} {...buttonProps}>
            {buttonLabel}
            {ButtonIcon && <Icon className={styles.buttonIcon} icon={<ButtonIcon />} size='xs' />}
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
