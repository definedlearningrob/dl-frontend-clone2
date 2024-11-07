import { useTranslation } from 'react-i18next';

type Props = {
  title: string;
  description: string;
};

export const EmptyOpportunityTypesChart = ({ title, description }: Props) => {
  const { t } = useTranslation();

  return (
    <div className='border border-neutral-300 rounded-sm p-base xxxl:p-md flex flex-col justify-center items-center'>
      <h6 className='text-xs xxxl:text-sm mb-xs'>{title}</h6>
      <p className='text-xxs xxxl:text-xs italic leading-lg xxxl:mb-base'>{description}</p>
      <div className='h-[350px] flex flex-col justify-center items-center'>
        {t('opportunitiesReport.emptyResults')}
      </div>
    </div>
  );
};
