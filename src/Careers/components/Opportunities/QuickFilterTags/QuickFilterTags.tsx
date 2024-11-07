import cx from 'classnames';
import { includes } from 'lodash-es';

import { useOpportunityFilters } from '@dc/components/Opportunities/OpportunityFilters/useOpportunityFilters';

import Tag from '@shared/components/Tag/Tag';

import styles from './QuickFilterTags.module.sass';

type Props = {
  opportunityTags?: string[];
  onClick: (tags: string[]) => void;
};

export const QuickFilterTags = ({ opportunityTags, onClick }: Props) => {
  const { filters } = useOpportunityFilters();

  if (!opportunityTags) return null;

  const filterOpportunityTags = filters.tagsContain || [];

  const handleOnClick = (tag: string) => {
    const newQuickFilters = includes(filterOpportunityTags, tag)
      ? filterOpportunityTags.filter((existingTag) => existingTag !== tag)
      : [...filterOpportunityTags, tag];

    onClick(newQuickFilters);
  };

  return (
    <div className={styles.quickFilterTags} data-testid='quick-filter-tags'>
      {opportunityTags.map((tag: string) => (
        <Tag
          key={tag}
          className={cx(styles.quickFilterTag, {
            [styles.selectedTag]: includes(filterOpportunityTags, tag),
          })}
          onClick={() => handleOnClick(tag)}>
          {tag}
        </Tag>
      ))}
    </div>
  );
};
