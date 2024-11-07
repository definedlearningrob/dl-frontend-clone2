import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import SharedTextHighlighter from '@shared/components/TextHighlighter/TextHighlighter';

type Props = {
  title: string;
  filterText: string;
  alternativeTitles: string[];
  onetCode: string | false;
};

export const CustomTitleTooltip = ({ filterText, title, alternativeTitles, onetCode }: Props) => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className='text-xs mb-sm'>{title}</h3>
      {!isEmpty(alternativeTitles) && (
        <>
          <h4 className='!text-xxs mb-xs'>{t('dashboard.recommendedCard.alternativeNames')}</h4>
          {alternativeTitles.map((alternativeTitle, index, array) => (
            <SharedTextHighlighter key={index} text={filterText} theme='light'>
              <span className='highlightible'>
                {alternativeTitle}
                {index !== array.length - 1 ? '/' : ''}
              </span>
            </SharedTextHighlighter>
          ))}
        </>
      )}
      {onetCode && (
        <>
          <h4 className='text-xxs mb-xs'>{t('dashboard.recommendedCard.onetCode')}</h4>
          <SharedTextHighlighter text={filterText} theme='light'>
            <span className='highlightible'>{onetCode}</span>
          </SharedTextHighlighter>
        </>
      )}
    </div>
  );
};
