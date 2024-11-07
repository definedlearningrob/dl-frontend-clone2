import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedFileExtensionIcon from '@dc/shared/FileExtensionIcon/FileExtensionIcon';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as Delete } from '@shared/svg/delete_outlined.svg';
import { ReactComponent as DownloadIcon } from '@shared/svg/download_to.svg';
import '@shared/components/PortfolioResume/Item/Item.sass';
import { TPortfolioResume } from '@shared/graphql/student/query/portfolioResumes';
import { Tooltip } from '@shared/components/Tooltip';
import { IconButton } from '@shared/components/IconButton/IconButton';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { formatExternalLink } from '@shared/utils/formatExternalLink';

type Props = {
  resume: TPortfolioResume;
  showDeleteButton: boolean;
  onDelete: () => void;
};

export const StudentPortfolioResumeItem = ({
  resume: { filename, url },
  showDeleteButton,
  onDelete,
}: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const iconSize = isFullHD ? 'md' : 'sm';

  return (
    <li
      className='flex w-full justify-center items-center text-primary-500 border border-neutral-300 rounded-sm p-sm last:!mb-0 gap-xs'
      data-testid='portfolio-resume-item'>
      <SharedIcon icon={<SharedFileExtensionIcon filename={filename} />} size={iconSize} />
      <Link
        className='text-xxs xxxl:text-xs mr-auto break-all no-underline font-regular leading-base'
        id='downloadLink'
        rel='noopener noreferrer'
        target='_blank'
        to={{ pathname: formatExternalLink(url) }}>
        {filename}
      </Link>
      <Tooltip message={t('common.actions.download')}>
        <Link
          download={filename}
          rel='noreferrer'
          target='_blank'
          to={{ pathname: formatExternalLink(url) }}>
          <IconButton
            Icon={DownloadIcon}
            className='hover:!bg-primary-200 focus:outline-2 focus:outline-primary-500 focus:outline-offset-1 focus:outline rounded-xs'
            size={iconSize}
            type='button'
            variant='primary-outlined'
          />
        </Link>
      </Tooltip>
      {showDeleteButton && (
        <Tooltip message={t('common.actions.delete')}>
          <IconButton
            Icon={Delete}
            className='!outline-danger-500 hover:!bg-danger-100 focus:outline-2 focus:outline-danger-500 focus:outline-offset-1 focus:outline rounded-xs'
            data-testid='portfolio-resume-delete-button'
            size={iconSize}
            type='button'
            variant='danger-outlined'
            onClick={onDelete}
          />
        </Tooltip>
      )}
    </li>
  );
};
