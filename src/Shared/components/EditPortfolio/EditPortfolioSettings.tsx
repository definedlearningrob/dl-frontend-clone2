import { useTranslation } from 'react-i18next';
import { useField, useFormikContext } from 'formik';
import { MouseEvent } from 'react';

import { cx } from '@shared/utils/cx';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as Duplicate } from '@shared/svg/duplicate.svg';
import SharedSwitch from '@shared/components/Switch/Switch';
import Button from '@shared/components/Button/Button';
import usePortfolioResumesQuery from '@shared/graphql/student/hooks/usePortfolioResumesQuery';
import Link from '@shared/components/Link';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import { EditPortfolioCard } from './EditPortfolioCard';
import { PortfolioFormValues } from './EditPortfolio';

export const EditPortfolioSettings = () => {
  const { t } = useTranslation();
  const { data: resumesData } = usePortfolioResumesQuery();

  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const buttonSize = isFullHD ? 'lg' : 'md';

  const [highlightedProjectsEnabledField, , highlightedProjectsEnabledHelpers] = useField(
    'highlightedProjectsEnabled'
  );

  const { isSubmitting } = useFormikContext<PortfolioFormValues>();
  const highlightedProjectsEnabled = highlightedProjectsEnabledField.value;

  const wrapperClassName = cx(
    'bg-neutral-100 border rounded-xs flex p-x xxxl:p-base gap-xs xxxl:gap-sm justify-between transition-colors',
    'border-neutral-300 hover:border-neutral-400 mb-base cursor-pointer',
    {
      'bg-primary-200 !border-primary-500': highlightedProjectsEnabled,
    }
  );

  const handleChange = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    highlightedProjectsEnabledHelpers.setValue(!highlightedProjectsEnabledField.value);
  };

  return (
    <EditPortfolioCard className='flex flex-col'>
      <h2 className='text-base mb-base'>{t('portfolio.creator.settings.label')}</h2>
      <div className={wrapperClassName} onClick={handleChange}>
        <div className='flex items-center gap-xs xxxl:gap-sm'>
          <div className='self-start'>
            <IconContainer
              Icon={Duplicate}
              className={cx('rounded-sm bg-white text-primary-500', {
                'bg-primary-200 text-primary-500': !highlightedProjectsEnabled,
              })}
            />
          </div>
          <div>
            <h6 className='text-xs xxxl:text-sm mb-xxs'>
              {t('portfolio.creator.settings.addHighlightedProjects')}
            </h6>
            <p className='text-xs xxxl:text-sm leading-base mb-0'>
              {t('portfolio.creator.settings.addHighlightedProjectsInfo')}
            </p>
          </div>
        </div>
        <SharedSwitch
          {...highlightedProjectsEnabledField}
          onChange={highlightedProjectsEnabledField.onChange}
        />
      </div>
      <Link
        className='mb-xs xxxl:mb-sm w-full'
        disabled={!resumesData}
        size={buttonSize}
        to='/portfolio/edit?preview=true'
        type='button'
        variant='primary-outlined'>
        {t('portfolio.creator.settings.preview')}
      </Link>
      <Button disabled={isSubmitting} size={buttonSize} type='submit' variant='primary'>
        {t('portfolio.creator.settings.save')}
      </Button>
    </EditPortfolioCard>
  );
};
