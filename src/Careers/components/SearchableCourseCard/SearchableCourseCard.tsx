import { useMemo } from 'react';
import { isEmpty } from 'lodash-es';

import { CustomTitleTooltip } from '@dc/components/User/Courses/CoursesList/TitleTooltip';

import { GenericCard, GenericCardProps } from '@shared/components/GenericCard/GenericCard';

type Props = GenericCardProps & {
  metadata?: {
    alternativeTitles: string;
    onetCode: string;
  };
  filterText: string;
};

export const SearchableCourseCard = (props: Props) => {
  const { metadata, filterText, ...rest } = props;

  const filteredAlternativeTitles = useMemo(() => {
    if (metadata?.alternativeTitles) {
      const titles = metadata.alternativeTitles.split(',').map((item) => item.trim());

      return titles.filter((title) => {
        const regEx = new RegExp(filterText, 'ig');

        return title.search(regEx) !== -1;
      });
    }

    return [];
  }, [metadata]);

  const filteredOnetCode = useMemo(() => {
    const regEx = new RegExp(filterText, 'ig');
    if (metadata?.onetCode) {
      return metadata.onetCode.search(regEx) !== -1 ? metadata.onetCode : false;
    }

    return false;
  }, [metadata]);

  const shouldShowCustomTooltip =
    !isEmpty(filterText) && (!isEmpty(filteredAlternativeTitles) || !isEmpty(filteredOnetCode));

  return (
    <GenericCard
      {...rest}
      titleToHighlight={filterText}
      {...(shouldShowCustomTooltip && {
        customTooltipMessage: (
          <CustomTitleTooltip
            alternativeTitles={filteredAlternativeTitles}
            filterText={filterText}
            onetCode={filteredOnetCode}
            title={rest.title}
          />
        ),
      })}
    />
  );
};
