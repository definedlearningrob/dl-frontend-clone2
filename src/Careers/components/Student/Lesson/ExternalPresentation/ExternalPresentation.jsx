import cx from 'classnames';
import PropTypes from 'prop-types';
import { useToggle } from 'react-use';
import { useTranslation } from 'react-i18next';

import Card from '@dc/components/Student/Lesson/shared/Card/Card';

import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { ReactComponent as ExpandIcon } from '@shared/svg/expand.svg';
import { ReactComponent as FoldIcon } from '@shared/svg/fold.svg';
import { ReactComponent as FullscreenIcon } from '@shared/svg/fullscreen.svg';
import { Tooltip } from '@shared/components/Tooltip';
import { useCustomizeIframe } from '@shared/hooks/useCustomizeIframe';

StudentLessonExternalPresentation.propTypes = {
  className: PropTypes.string,
  hideTitle: PropTypes.bool,
  presentation: PropTypes.shape({
    __typename: PropTypes.string,
    displayName: PropTypes.string,
    id: PropTypes.string,
    isExpandable: PropTypes.bool,
    source: PropTypes.string,
  }),
};

function StudentLessonExternalPresentation({
  presentation: { __typename, displayName, id, source, isExpandable },
  hideTitle,
  className,
}) {
  const { t } = useTranslation();
  const generatedUUID = __typename + id;
  const lessonPresentationClasses = cx('!p-0', { '!p-base': !hideTitle }, className);
  const [isExpanded, toggleExpanded] = useToggle(false);
  const [isFullscreen, toggleFullscreen] = useToggle(false);
  const [actionHovered, toggleActionHovered] = useToggle(false);

  const { iframeRef, iframeSrc } = useCustomizeIframe({
    iframeUrl: source,
  });

  return (
    <Card
      className={lessonPresentationClasses}
      data-testid='lesson-item-presentation'
      id={generatedUUID}
      title={hideTitle ? null : displayName}>
      <div
        className={cx('h-[420px] w-full transition-all relative', {
          'h-[70vh]': isExpanded,
          '!fixed inset-0 z-highest !h-screen': isFullscreen,
        })}>
        <div
          className={cx('absolute inset-0', {
            'visible bg-overlay-modal opacity-30': actionHovered,
            hidden: !actionHovered,
          })}
        />
        <iframe
          ref={iframeRef}
          allowFullScreen={true}
          className='rounded-sm w-full h-full border-0'
          sandbox='allow-same-origin allow-scripts allow-popups allow-forms'
          src={iframeSrc}
          title='video'
        />
        {isExpandable && (
          <div
            className={cx('absolute right-md bottom-md text-primary-500 z-high flex gap-xs', {
              '!bottom-[120px]': isFullscreen,
              '!bottom-[80px]': isExpanded && !isFullscreen,
            })}
            onMouseEnter={() => toggleActionHovered(true)}
            onMouseLeave={() => toggleActionHovered(false)}>
            {!isFullscreen && (
              <Tooltip message={isExpanded ? t('common.actions.fold') : t('common.actions.expand')}>
                <DeprecatedIconButton
                  icon={isExpanded ? <FoldIcon /> : <ExpandIcon />}
                  iconSize='sm'
                  size='md'
                  square={true}
                  variant='base'
                  onClick={toggleExpanded}
                />
              </Tooltip>
            )}
            <Tooltip message={t('common.actions.toggleFullscreen')}>
              <DeprecatedIconButton
                icon={<FullscreenIcon />}
                iconSize='sm'
                size='md'
                square={true}
                variant='base'
                onClick={toggleFullscreen}
              />
            </Tooltip>
          </div>
        )}
      </div>
    </Card>
  );
}

export default StudentLessonExternalPresentation;
